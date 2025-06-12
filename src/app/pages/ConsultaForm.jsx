import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from "lucide-react";

const ConsultaForm = () => {
  return (
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
  );
};

export default ConsultaForm;
