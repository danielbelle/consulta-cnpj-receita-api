import { z } from "zod";

/**
 * Valida o CNPJ conforme o algoritmo oficial da Receita Federal.
 * Observação: Não garante que o CNPJ está ativo, apenas que é válido matematicamente.
 * Para CNPJ alfanumérico (a partir de 2026), será necessário adaptar o algoritmo.
 */
function isValidCNPJ(cnpj) {
  // Remove tudo que não for número
  cnpj = cnpj.replace(/[^\d]+/g, "");

  // CNPJ deve ter 14 dígitos
  if (cnpj.length !== 14) return false;

  // Elimina CNPJs com todos os dígitos iguais (ex: 00000000000000)
  if (/^(\d)\1+$/.test(cnpj)) return false;

  // Calcula os dígitos verificadores
  const calcDV = (base, pesos) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i], 10) * pesos[i];
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  // Pesos para o primeiro e segundo dígito verificador
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const base = cnpj.slice(0, 12);
  const dv1 = calcDV(base, pesos1);
  const dv2 = calcDV(base + dv1, pesos2);

  // Verifica se os dígitos verificadores conferem
  return dv1 === parseInt(cnpj[12], 10) && dv2 === parseInt(cnpj[13], 10);
}

// Esquema Zod para validação de CNPJ
export const cnpjSchema = z
  .string()
  .min(14, "CNPJ deve ter pelo menos 14 dígitos")
  .max(18, "CNPJ deve ter no máximo 18 caracteres")
  .refine(isValidCNPJ, {
    message: "CNPJ inválido",
  });

/**
 * Observação:
 * - Esta validação é matemática e não consulta a Receita Federal.
 * - Para CNPJ alfanumérico (2026+), será necessário adaptar o algoritmo para aceitar letras e números.
 */
