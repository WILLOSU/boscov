import { Filme } from "../../Datas"; // Importe a mesma interface que o Card usa
import { Navbar } from "../../components/Navbar/Navbar";
import { Card } from "../../components/Card/Card";
import { HomeBody, HomeHeader } from "./HomeStyled";
import { getAllFilmes, getTopFilme } from "../../services/filmesServices";
import { useEffect, useState } from "react";

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]); // aprendendo o tal dos hooks
  //const [topFilme, setTopFilme] = useState<Filme | null>(null);

  useEffect(() => {
    // efeito callback e um array de dependência
    async function fetchFilmes() {
      try {
        const response = await getAllFilmes();
        setFilmes(response.data.results);

        //const topResponse = await getTopFilme();
        //setTopFilme(topResponse.data.filme);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }

    fetchFilmes(); // faça um vez só evita loop infinito, deixando array vazio
  }, []);

  return (
    <>
      <Navbar />
      <HomeHeader>
        {filmes.length > 0 ? (
          filmes.map((item: Filme, index: number) => (
            <Card key={index} filme={item

              
            } />
          ))
        ) : (
          <p>Carregando filmes...</p>
        )}
      </HomeHeader>

      <HomeBody>
        {filmes.length > 0 ? (
          filmes.map((item: Filme, index: number) => (
            <Card key={index} filme={item} />
          ))
        ) : (
          <p>Carregando filmes...</p>
        )}
      </HomeBody>
    </>
  );
}
