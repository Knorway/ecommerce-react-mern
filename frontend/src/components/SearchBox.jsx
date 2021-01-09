import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
	// useHistory() could be implemented or even withRouter(SearchBox)
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type='text'
				name='q'
				className='mr-sm-2 ml-sm-5'
				placeholder='Search Products..'
				onChange={(e) => setKeyword(e.target.value)}
			></Form.Control>
			<Button type='submit' variant='outline-success' className='p-2'>
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
