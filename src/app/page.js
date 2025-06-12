import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-zinc-900 transition-colors">
      <div className="text-center max-w-2xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold text-gray-900 dark:text-gray-100">
          CNPJ - Receita Federal
        </h1>
        <p className="mt-6 text-[17px] md:text-lg text-gray-700 dark:text-gray-300">
          Faça a pesquisa do CNPJ de forma rápida e fácil com o nosso
          <span className="font-semibold"> Pesquisador de CNPJ</span>! Utilize o
          campo abaixo para inserir o CNPJ desejado e clique no botão para
          pesquisar na Receita Federal.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="w-full max-w-lg flex items-center gap-2">
            <Input
              className="rounded-full w-full border-2 border-gray-800 dark:border-gray-200 focus:border-gray-600 dark:focus:border-gray-400 focus:ring-0 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
              type="text"
              placeholder="CNPJ"
            />
            <Button
              size="lg"
              className="rounded-full text-base bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Pesquisar CNPJ
              <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
