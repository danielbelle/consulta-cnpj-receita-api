import { Input } from "@/components/ui/input";

export default function MaskCnpj({ id, name, value, onChange }) {
  // Função para aplicar a máscara de CNPJ
  function formatCNPJ(val) {
    return val
      .replace(/\D/g, "") // Remove tudo que não for dígito
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  }

  return (
    <Input
      id={id}
      name={name}
      type="text"
      placeholder="CNPJ"
      maxLength={18}
      value={value}
      onChange={(e) => {
        const masked = formatCNPJ(e.target.value);
        // Repasse o valor mascarado para o RHF
        onChange({
          ...e,
          target: { ...e.target, value: masked },
        });
      }}
    />
  );
}
