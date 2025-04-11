import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { GlobalStyled } from './GlobalStyled';


// utilizando o global styled
const App: React.FC = () => {
  return (
   <>
    <GlobalStyled />
    <Home />
    </>
  );
};

export default App;