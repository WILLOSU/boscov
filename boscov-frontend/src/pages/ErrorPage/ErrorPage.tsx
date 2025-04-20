import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Ops! Algo deu errado...</h1>
      <p>A página que você tentou acessar não existe ou foi movida.</p>
      <button onClick={() => navigate('/')}>
        Voltar para a página inicial
      </button>
    </div>
  );
};

export default ErrorPage;
