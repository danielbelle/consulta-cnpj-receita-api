import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { yupCnpjSchema } from "./yupCnpjSchema";

export function useConsultaForm() {
  return useForm({
    resolver: yupResolver(yupCnpjSchema),
    defaultValues: { cnpj: "" },
    mode: "onChange",
  });
}
