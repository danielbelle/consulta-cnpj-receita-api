import redis from "@/lib/redis";
const { CnpjaOpen } = require("@cnpja/sdk");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { cnpj } = req.query;
  if (!cnpj) {
    return res.status(400).json({ error: "CNPJ não informado" });
  }

  const cacheKey = `cnpj:${cnpj}`;
  try {
    // 1. Tenta buscar do cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    // 2. Se não houver cache, consulta a API externa
    const cnpja = new CnpjaOpen();
    const office = await cnpja.office.read({ taxId: cnpj });
    if (!office) {
      return res.status(404).json({ error: "CNPJ não encontrado" });
    }

    // 3. Salva no cache por 1 hora (3600 segundos)
    await redis.set(cacheKey, JSON.stringify(office), "EX", 3600);

    return res.status(200).json(office);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao consultar CNPJ",
      details: error.message,
    });
  }
}
