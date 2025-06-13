import redis from "@/lib/redis";
import { cnpjSchema } from "@/app/types/cnpj";
const { CnpjaOpen } = require("@cnpja/sdk");
import runMiddleware, { cors } from "../../_middleware";

function withTimeout(promise, ms = 5000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Timeout na consulta ao serviço externo")),
        ms
      )
    ),
  ]);
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  // Rate limit por IP
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const rateKey = `rate:${ip}`;
  const requests = await redis.incr(rateKey);
  if (requests === 1) await redis.expire(rateKey, 60);
  if (requests > 5) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Rate limit excedido para IP: ${ip}`);
    }
    return res
      .status(429)
      .json({ error: "Muitas requisições, tente novamente em 1 minuto." });
  }

  const { cnpj } = req.query;
  try {
    cnpjSchema.parse(cnpj);
  } catch {
    return res.status(400).json({ error: "CNPJ inválido" });
  }

  // Validação do reCAPTCHA
  const recaptchaToken = req.headers["x-recaptcha-token"];
  if (!recaptchaToken) {
    return res.status(400).json({ error: "Captcha não enviado" });
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`;
  const captchaRes = await fetch(verifyUrl, { method: "POST" });
  const captchaData = await captchaRes.json();

  const invalidCaptchaKey = `captcha:invalid:${ip}`;
  const invalidAttempts = parseInt(await redis.get(invalidCaptchaKey) || "0", 10);
  if (invalidAttempts >= 5) {
    return res.status(429).json({ error: "Muitas tentativas de captcha inválido. Tente novamente mais tarde." });
  }

  if (!captchaData.success) {
    await redis.incr(invalidCaptchaKey);
    await redis.expire(invalidCaptchaKey, 600);
    return res.status(400).json({ error: "Falha na validação do captcha" });
  } else {
    await redis.del(invalidCaptchaKey);
  }

  const cacheKey = `cnpj:${cnpj}`;
  let cached = null;
  try {
    cached = await redis.get(cacheKey);
  } catch (err) {
    console.error("Erro ao acessar Redis:", err);
    // Continue sem cache, se necessário
  }
  if (cached) return res.status(200).json(JSON.parse(cached));

  try {
    const cnpja = new CnpjaOpen();
    const office = await withTimeout(cnpja.office.read({ taxId: cnpj }), 5000);
    if (!office) return res.status(404).json({ error: "CNPJ não encontrado" });

    await redis.set(cacheKey, JSON.stringify(office), "EX", 3600);
    return res.status(200).json(office);
  } catch (error) {
    return res.status(504).json({
      error: "Timeout ou erro ao consultar serviço externo",
      ...(process.env.NODE_ENV === "development" && { details: error.message }),
    });
  }
}
