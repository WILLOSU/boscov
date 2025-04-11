import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Card } from '../../components/Card/Card';
import { filmes } from '../../Datas';
import { HomeBody } from "./HomeStyled"


// utilizei o map para iterar, para colocar cada objeto ser um card diferente!

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <HomeBody>
        {filmes.map((item, index) => (
          <Card key={index} filme={item} />
        ))}
      </HomeBody>
   
    </>
  );
};

// utilizei o conceito de componetização para facilitar, pois
// caso não utilizasse ia precisar rodar card por card.

export default Home;


