import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config(); // sempre no topo

import authRoutes from './routes/AuthRoutes'; 
import userRoutes from './routes/UserRoutes';
import filmeRoutes from './routes/FilmeRoutes';
import generoRoutes from './routes/GeneroRoutes';
import avaliacaoRoutes from './routes/AvaliacaoRoutes';
import swaggerRoute from "./routes/SwaggerRoutes";

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./docs/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(express.json()); 

// Rotas da aplicação
app.use('/auth', authRoutes); 
app.use('/users', userRoutes);
app.use('/api', filmeRoutes);
app.use('/generos', generoRoutes);
app.use('/avaliacao', avaliacaoRoutes);
app.use('/doc', swaggerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
