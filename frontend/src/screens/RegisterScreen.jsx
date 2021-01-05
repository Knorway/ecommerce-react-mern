import React, { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Password to not match');
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1 style={{ marginBottom: '1.5rem' }}>Sign Up</h1>

			{error && <Message variant='danger'>{error}</Message>}
			{message && <Message variant='danger'>{message}</Message>}
			{loading && <Loader />}

			<Form onSubmit={submitHandler}>
				<Form.Group controlId={name}>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId={email}>
					<Form.Label>Email Adress</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId={confirmPassword}>
					<Form.Label>confirmPassword</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter confirmPassword'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId={password}>
					<Form.Label>password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary' style={{ borderRadius: 0 }}>
					Register
				</Button>

				<Row className='p-3'>
					Have an Account? <hr />
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
				</Row>
			</Form>
		</FormContainer>
	);
};

export default LoginScreen;
