import React from "react";

export default function TextoLandingPage({ children }) {
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
        {children}
      </div>
    </div>
  );
}
