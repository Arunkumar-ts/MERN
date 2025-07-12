import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/user.routes';
import todoRoutes from './routes/todo.routes';
import auth from './routes/login.routes'
import cors from 'cors';
import { authMiddleware } from './middleware/auth.middleware'; 

dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors()); 
app.use(express.json());
app.use('/api/users',authMiddleware, userRoutes);
app.use('/api/todos',authMiddleware, todoRoutes);
app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});