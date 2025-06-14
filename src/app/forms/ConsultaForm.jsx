"use client";

import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useConsultaForm } from "./useConsultaForm";
import ResultadoView from "../results/ResultadoView";
import MaskCnpj from "@/components/mask-cnpj"; // Importa o componente de máscara
import { Controller } from "react-hook-form";
import { useTheme } from "next-themes"; // Adicione esta linha

const ConsultaForm = () => {
  const recaptchaRef = useRef();
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const { resolvedTheme } = useTheme(); // Use resolvedTheme ao invés de theme

  const onSubmit = async (values) => {
    setLoading(true);
    setErro(null);
    setResultado(null);

    // Não precisa mais validar manualmente o CNPJ aqui

    try {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const cnpjNumerico = values.cnpj.replace(/[^\d]+/g, "");

      const res = await fetch(
        `/api/consultarCNPJ?cnpj=${encodeURIComponent(cnpjNumerico)}`,
        {
          method: "GET",
          headers: {
            "x-recaptcha-token": token,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro desconhecido");
      setResultado(data);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  const form = useConsultaForm();

  return (
    <>
      <ReCAPTCHA
        key={resolvedTheme} // força remontagem ao trocar o tema ou system
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        size="invisible"
        ref={recaptchaRef}
        badge="bottomleft"
        theme={resolvedTheme === "dark" ? "dark" : "light"} // Usa o tema resolvido
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-12 flex items-center justify-center gap-4">
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem className="w-full max-w-lg flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2 w-full">
                    <FormControl>
                      <Controller
                        name="cnpj"
                        control={form.control}
                        render={({ field }) => (
                          <MaskCnpj
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => {
                              field.onChange(e.target ? e.target.value : e);
                            }}
                          />
                        )}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      size="lg"
                      className="rounded-full cursor-pointer text-base bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                      Pesquisar CNPJ
                    </Button>
                  </div>
                  <div className="w-full">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          {loading && <p>Consultando...</p>}
          {erro && <p className="text-red-500">{erro}</p>}
          {resultado && <ResultadoView resultado={resultado} />}
        </form>
      </Form>
    </>
  );
};

export default ConsultaForm;
