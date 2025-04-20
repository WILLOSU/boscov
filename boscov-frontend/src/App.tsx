import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';


// utilizando o global styled
const App: React.FC = () => { // Outlet do React Router Dom
  return <Outlet />

 
};

export default App; // Api roda as minhas rotas !! (Outlet)

// na minha aplicação roda as minhas rotas que só tenho a minha navbar