"use client";

import type { Filme } from "../../Datas";
import { Card } from "../../components/Card/Card";
import { HomeBody, HomeHeader } from "./HomeStyled";
import { getAllFilmes, getTopFilme } from "../../services/filmesServices";
import { useEffect, useState } from "react";


// Defina tipos para seus estados
type LoadingState = { all: boolean; top: boolean };
type ErrorState = { all: string | null; top: string | null };

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [topFilme, setTopFilme] = useState<Filme | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    all: true,
    top: true,
  });
  const [error, setError] = useState<ErrorState>({ all: null, top: null });

  useEffect(() => {
    async function fetchFilmes() {
      try {
        // Buscar todos os filmes
        const response = await getAllFilmes();

        // Ajuste conforme a estrutura real retornada pela sua API
        if (response.data && response.data.results) {
          setFilmes(response.data.results);
        } else if (Array.isArray(response.data)) {
          setFilmes(response.data);
        } else {
          console.error("Formato inesperado de dados:", response.data);
          setError((prev) => ({ ...prev, all: "Formato de dados inesperado" }));
        }

        setLoading((prev) => ({ ...prev, all: false }));
      } catch (error) {
        console.error("Erro ao buscar todos os filmes:", error);
        setError((prev) => ({ ...prev, all: "Erro ao buscar filmes" }));
        setLoading((prev) => ({ ...prev, all: false }));
      }
    }

    async function fetchTopFilme() {
      try {
        // Buscar o filme em destaque
        const topResponse = await getTopFilme();

        if (topResponse.data && topResponse.data.movie) {
          setTopFilme(topResponse.data.movie);
        } else if (topResponse.data && topResponse.data.filme) {
          setTopFilme(topResponse.data.filme);
        } else if (topResponse.data && !Array.isArray(topResponse.data)) {
          setTopFilme(topResponse.data);
        } else {
          console.error("Formato inesperado de dados:", topResponse.data);
          setError((prev) => ({ ...prev, top: "Formato de dados inesperado" }));
        }

        setLoading((prev) => ({ ...prev, top: false }));
      } catch (error) {
        console.error("Erro ao buscar filme em destaque:", error);
        setError((prev) => ({
          ...prev,
          top: "Erro ao buscar filme em destaque",
        }));
        setLoading((prev) => ({ ...prev, top: false }));
      }
    }

    fetchFilmes();
    fetchTopFilme();
  }, []);

  return (
    <>
      <HomeHeader>
        {loading.top ? (
          <p>Carregando filme em destaque...</p>
        ) : error.top ? (
          <p>Erro ao carregar filme em destaque: {error.top}</p>
        ) : topFilme ? (
          <Card filme={topFilme} top />
        ) : (
          <p>Nenhum filme em destaque disponível</p>
        )}
      </HomeHeader>

      <HomeBody>
        {loading.all ? (
          <p>Carregando filmes...</p>
        ) : error.all ? (
          <p>Erro ao carregar filmes: {error.all}</p>
        ) : filmes.length > 0 ? (
          filmes.map((item: Filme, index: number) => (
            <Card key={index} filme={item} />
          ))
        ) : (
          <p>Nenhum filme encontrado</p>
        )}
      </HomeBody>
    </>
  );
}
