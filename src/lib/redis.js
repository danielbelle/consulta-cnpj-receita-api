import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  connectTimeout: 5000, // 5 segundos para conectar
  commandTimeout: 5000, // 5 segundos para comandos
});

export default redis;
