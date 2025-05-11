"use client";
import React from "react";
import { EstrelasContainer, Estrela, NotaValor } from "./EstrellasAvaliacaoStyle";

interface EstrelasAvaliacaoProps {
  nota: number;
  tamanho?: "pequeno" | "medio" | "grande";
  exibirValor?: boolean;
  somenteLeitura?: boolean;
  aoMudar?: (novaNota: number) => void;
}

export const EstrelasAvaliacao: React.FC<EstrelasAvaliacaoProps> = ({
  nota,
  tamanho = "medio",
  exibirValor = true,
  somenteLeitura = true,
  aoMudar,
}) => {
  // Arredonda a nota para evitar valores fracionários inválidos
  const notaArredondada = Math.round(nota);

  // Função para lidar com o clique em uma estrela
  const handleEstrelaClick = (valorClicado: number) => {
    if (!somenteLeitura && aoMudar) {
      aoMudar(valorClicado);
    }
  };

  return (
    <EstrelasContainer tamanho={tamanho}>
      {[1, 2, 3, 4, 5].map((estrela) => (
        <Estrela
          key={estrela}
          preenchida={estrela <= notaArredondada}
          tamanho={tamanho}
          interativa={!somenteLeitura}
          onClick={() => handleEstrelaClick(estrela)}
          aria-label={`${estrela} estrela${estrela > 1 ? "s" : ""}`}
        >
          ★
        </Estrela>
      ))}
      {exibirValor && <NotaValor tamanho={tamanho}>{nota.toFixed(1)}</NotaValor>}
    </EstrelasContainer>
  );
};