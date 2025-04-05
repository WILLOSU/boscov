import express from 'express';
import cors from 'cors';
import userRoutes from './routes/UserRoutes'; // respeitando o CamelCase

const app = express();

app.use(cors());
app.use(express.json());

// Prefixo para todas as rotas de usuário
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
