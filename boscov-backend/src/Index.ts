import express from 'express';
import cors from 'cors';

import userRoutes from './routes/UserRoutes';
import filmeRoutes from './routes/FilmeRoutes';
import generoRoutes from './routes/GeneroRoutes';
import avaliacaoRoutes from './routes/AvaliacaoRoutes';



const app = express();

app.use(cors());
app.use(express.json());


// Rotas da aplicação
app.use('/users', userRoutes);
app.use('/api', filmeRoutes);
app.use('/generos', generoRoutes);
app.use('/avaliacao',avaliacaoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});




