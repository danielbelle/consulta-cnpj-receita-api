"use client";

import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useConsultaForm } from "./useConsultaForm";
import ResultadoView from "../results/ResultadoView";

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
      // Obtenha o token do reCAPTCHA
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const res = await fetch(
        `/api/consultarCNPJ?cnpj=${encodeURIComponent(values.cnpj)}`,
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
                    <Input
                      {...field}
                      className="rounded-full w-full border-2 border-gray-800 dark:border-gray-200 focus:border-gray-600 dark:focus:border-gray-400 focus:ring-0 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                      type="text"
                      placeholder="CNPJ"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-full cursor-pointer text-base bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    Pesquisar CNPJ
                    <ArrowUpRight className="!h-5 !w-5" />
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
