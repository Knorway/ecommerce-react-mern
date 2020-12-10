import express from 'express';
import connectDB from './config/db.js';
import dotevn from 'dotenv';
import 'colors';
import productsRoutes from './routes/productsRoutes.js';
import usersRoute from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotevn.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
