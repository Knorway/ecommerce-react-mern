import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import Checkoutsteps from '../components/checkoutSteps';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const dispatch = useDispatch();

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<Checkoutsteps step1 step2 step3 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
				</Form.Group>
				<Col>
					<Form.Check
						type='radio'
						label='PayPal or Credit Card'
						id='PayPal'
						name='paymentMethod'
						value='PayPal'
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
					></Form.Check>

					{/* <Form.Check
						type='radio'
						label='PayPal or Credit Card'
						id='PayPal'
						name='paymentMethod'
						value='PayPal'
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
					></Form.Check> */}
				</Col>

				<Button type='submit' variant='primary' style={{ borderRadius: 0 }}>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
