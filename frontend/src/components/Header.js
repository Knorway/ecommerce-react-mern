import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
	return (
		<header>
			<Navbar bg='light' expand='lg' collapseOnSelect style={{ paddingTop: '0.4rem' }}>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link className='pt-2'>
									<i
										className='fas fa-shopping-cart'
										style={{ paddingRight: '0.4rem' }}
									></i>{' '}
									Cart
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/login'>
								<Nav.Link className='pt-2'>
									<i
										className='fas fa-user'
										style={{ paddingRight: '0.5rem' }}
									></i>
									Sign In
								</Nav.Link>
							</LinkContainer>
							{/* <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
							<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
						</NavDropdown> */}
						</Nav>
						{/* <Form inline>
						<FormControl type='text' placeholder='Search' className='mr-sm-2' />
						<Button variant='outline-success'>Search</Button>
					</Form> */}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;