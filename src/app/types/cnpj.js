/**
 * Valida o CNPJ conforme o algoritmo oficial da Receita Federal.
 */
export function isValidCNPJ(cnpj) {
  // CNPJ deve ter 14 dígitos
  if (cnpj.length !== 14) return false;

  // Elimina CNPJs com todos os dígitos iguais
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

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const base = cnpj.slice(0, 12);
  const dv1 = calcDV(base, pesos1);
  const dv2 = calcDV(base + dv1, pesos2);

  return dv1 === parseInt(cnpj[12], 10) && dv2 === parseInt(cnpj[13], 10);
}

/**
 * Observação:
 * - Esta validação é matemática e não consulta a Receita Federal.
 * - Para CNPJ alfanumérico (2026+), será necessário adaptar o algoritmo para aceitar letras e números.
 */
