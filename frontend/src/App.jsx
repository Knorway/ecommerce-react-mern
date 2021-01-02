import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './components/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<Container>
				<main className='py-3'>
					<Route path='/login' component={LoginScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/payment' component={PaymentScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/' component={HomeScreen} exact />
				</main>
			</Container>
			<Footer />
		</Router>
	);
};

export default App;