import redis from "@/lib/redis";
import { cnpjSchema } from "@/app/types/cnpj";
const { CnpjaOpen } = require("@cnpja/sdk");
import runMiddleware from "./_middleware";

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

  if (!captchaData.success) {
    return res.status(400).json({ error: "Falha na validação do captcha" });
  }

  const cacheKey = `cnpj:${cnpj}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const cnpja = new CnpjaOpen();
    const office = await cnpja.office.read({ taxId: cnpj });
    if (!office) return res.status(404).json({ error: "CNPJ não encontrado" });

    await redis.set(cacheKey, JSON.stringify(office), "EX", 3600);
    return res.status(200).json(office);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erro interno:", error);
    }
    return res.status(500).json({ error: "Erro interno ao consultar CNPJ" });
  }
}
