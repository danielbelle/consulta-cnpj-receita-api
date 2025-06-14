import * as yup from "yup";
import { isValidCNPJ } from "../types/cnpj";

export const yupCnpjSchema = yup.object().shape({
  cnpj: yup
    .string()
    .required("CNPJ é obrigatório")
    .test("valida-cnpj", "CNPJ inválido", (value) => {
      const cnpjNumerico = (value || "").replace(/[^\d]+/g, "");
      return cnpjNumerico.length === 14 && isValidCNPJ(cnpjNumerico);
    }),
});
