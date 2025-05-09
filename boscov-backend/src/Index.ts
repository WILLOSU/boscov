import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// Configuração do ambiente
dotenv.config(); // sempre no topo

// Inicialização da aplicação
const app = express();

// Configuração de middlewares
app.use(cors());
app.use(express.json());

// Importação das rotas
import authRoutes from './routes/AuthRoutes'; 
import userRoutes from './routes/UserRoutes';
import filmeRoutes from './routes/FilmeRoutes';
import generoRoutes from './routes/GeneroRoutes';
import swaggerRoute from "./routes/SwaggerRoutes";

// Configuração das rotas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api', filmeRoutes);
app.use('/generos', generoRoutes);
app.use('/doc', swaggerRoute);

// Define porta de forma segura para dev e produção
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});