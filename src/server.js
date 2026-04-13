import express from 'express';
import 'dotenv/config';
import exemplosRoutes from './routes/exemploRoute.js';
import { apiKey } from './lib/middlewares/apiKey.js';
import arquivoRoutes from './routes/arquivoRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/exemplos', apiKey, arquivoRoutes);

app.use('/api/exemplos', apiKey, exemplosRoutes);

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/exemplos', exemplosRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
