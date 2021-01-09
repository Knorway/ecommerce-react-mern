import path from 'path';
import express from 'express';
import connectDB from './config/db.js';
import morgan from 'morgan';
import dotevn from 'dotenv';
import 'colors';
import productsRoutes from './routes/productsRoutes.js';
import usersRoute from './routes/userRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotevn.config();
connectDB();

const app = express();
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoute);
app.use('/api/orders', orderRoute);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// ------Ready for deploy------ #
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.use('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
} else {
	app.get('/api', (req, res) => res.send('API is running...'));
}
// ---------------------------- #

// --------Error handler--------#
app.use(notFound); //--------404#
app.use(errorHandler);
// -----------------------------#

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
