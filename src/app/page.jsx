import React from "react";
import ConsultaForm from "@/app/pages/ConsultaForm";
import ResultadoView from "@/app/pages/ResultadoView";
import TextoLandingPage from "./pages/components/TextoLandingPage";

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
