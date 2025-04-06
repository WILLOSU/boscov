import express from 'express';
import cors from 'cors';
import userRoutes from './routes/UserRoutes';
import filmeRoutes from './routes/FilmeRoutes'; 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/api', filmeRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
