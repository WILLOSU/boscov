import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';

// Adicionando tipagem ao componente Home
const Home: React.FC = () => {
    return (
        <> {/* Fragment */}
            <Navbar />
            <h1>Olá Home</h1>
        </>
    );
};

export default Home;

