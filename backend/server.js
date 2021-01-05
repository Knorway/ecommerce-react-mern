import express from 'express';
import connectDB from './config/db.js';
import dotevn from 'dotenv';
import 'colors';
import productsRoutes from './routes/productsRoutes.js';
import usersRoute from './routes/userRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotevn.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoute);
app.use('/api/orders', orderRoute);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// --------Error handler--------#
app.use(notFound); //--------404#
app.use(errorHandler);
// -----------------------------#

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
