import React from "react";
import ConsultaForm from "@/app/forms/ConsultaForm";
import ResultadoView from "@/app/results/ResultadoView";
import TextoLandingPage from "./landing/TextoLandingPage";

export default function Home() {
  // Condição que nunca será verdadeira
  const showResultado = false;

  return (
    <TextoLandingPage>
      <ConsultaForm />
      {showResultado && <ResultadoView />}
    </TextoLandingPage>
  );
}
