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

const ConsultaForm = () => {
  const recaptchaRef = useRef();
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    setErro(null);
    setResultado(null);
    try {
      // Remove tudo que não for número do CNPJ antes de enviar
      const cnpjNumerico = values.cnpj.replace(/[^\d]+/g, "");

      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

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
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        size="invisible"
        ref={recaptchaRef}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-12 flex items-center justify-center gap-4">
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem className="w-full max-w-lg flex items-center gap-2">
                  <FormControl>
                    <MaskCnpj value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-full cursor-pointer text-base bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    Pesquisar CNPJ
                  </Button>
                  <FormMessage />
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
