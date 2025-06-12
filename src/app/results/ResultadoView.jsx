import React from "react";

export default function ResultadoView({ resultado }) {
  if (!resultado) return null;

  // Exemplo de exibição dos principais campos do novo retorno da API
  return (
    <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-lg mt-6 text-left shadow">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        Resultado da Consulta
      </h2>
      {resultado.error ? (
        <p className="text-red-500">{resultado.error}</p>
      ) : (
        <div>
          <p>
            <span className="font-semibold">CNPJ:</span> {resultado.taxId}
          </p>
          <p>
            <span className="font-semibold">Nome Fantasia:</span>{" "}
            {resultado.alias || "-"}
          </p>
          <p>
            <span className="font-semibold">Razão Social:</span>{" "}
            {resultado.company?.name || "-"}
          </p>
          <p>
            <span className="font-semibold">Situação:</span>{" "}
            {resultado.status?.text || "-"}
          </p>
          <p>
            <span className="font-semibold">Abertura:</span>{" "}
            {resultado.founded || "-"}
          </p>
          <p>
            <span className="font-semibold">Atividade Principal:</span>{" "}
            {resultado.mainActivity?.text || "-"}
          </p>
          <p>
            <span className="font-semibold">Endereço:</span>{" "}
            {resultado.address
              ? `${resultado.address.street}, ${resultado.address.number} - ${resultado.address.district}, ${resultado.address.city} - ${resultado.address.state}`
              : "-"}
          </p>
          <p>
            <span className="font-semibold">Telefone:</span>{" "}
            {resultado.phones && resultado.phones.length > 0
              ? `(${resultado.phones[0].area}) ${resultado.phones[0].number}`
              : "-"}
          </p>
          {/* Adicione outros campos relevantes conforme necessário */}
        </div>
      )}
    </div>
  );
}
