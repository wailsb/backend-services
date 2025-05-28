import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Auth Service is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Auth service listening on port http://localhost:${PORT}`);
});
