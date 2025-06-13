import Cors from "cors";

const allowedOrigins = ["https://consulta-cnpj-receita-api.vercel.app/"];

if (process.env.NODE_ENV === "development") {
  allowedOrigins.push("http://localhost:3000", "http://127.0.0.1:3000");
}

const cors = Cors({
  origin: allowedOrigins,
  methods: ["GET"],
});

export { cors };

export default function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
