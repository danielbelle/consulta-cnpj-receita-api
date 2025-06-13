import { useForm } from "react-hook-form";

export function useConsultaForm() {
  return useForm({
    defaultValues: { cnpj: "" },
    mode: "onChange",
  });
}
