import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDetail, UpdateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.userDetails);

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetail(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, history, successUpdate, user, userId]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(UpdateUser({ _id: userId, name, email, isAdmin }));
	};

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-'>
				Go Back
			</Link>
			<FormContainer>
				<h1 style={{ marginBottom: '1.5rem' }}>Edit User</h1>
				{loadingUpdate ? (
					<Loader />
				) : errorUpdate ? (
					<Message value='danger'>{errorUpdate}</Message>
				) : (
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

						<Form.Group controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button type='submit' variant='primary' style={{ borderRadius: 0 }}>
							UPDATE
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
