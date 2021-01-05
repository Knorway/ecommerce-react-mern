import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

	useEffect(() => {
		if (!userInfo) {
			history.push('/');
		} else {
			if (!user.name) {
				dispatch(getUserDetail('profile'));
				dispatch(listMyOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, user, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Password does not match');
		} else {
			dispatch(updateUserProfile({ _id: user._id, name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h1 style={{ marginBottom: '1.5rem' }}>User Profile</h1>

				{error && <Message variant='danger'>{error}</Message>}
				{message && <Message variant='danger'>{message}</Message>}
				{success && <Message variant='success'>Profile Updated</Message>}
				{loading && <Loader />}

				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email Adress</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Label>password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmPassword'>
						<Form.Label>confirmPassword</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary' style={{ borderRadius: 0 }}>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERY</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i
												className='fas fa-times'
												style={{ color: 'red' }}
											></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i
												className='fas fa-times'
												style={{ color: 'red' }}
											></i>
										)}
									</td>
									<td>
										<LinkContainer
											to={`/orders/${order._id}`}
											style={{ borderRadius: 0, width: '100%' }}
										>
											<Button variant='light' className='btn-sm'>
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;