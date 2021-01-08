import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import { listProductDetail } from '../actions/productActions';

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();
	const { loading, error, product } = useSelector(
		(state) => state.productDetail
	);
	const id = match.params.id;

	useEffect(() => {
		dispatch(listProductDetail(id));
	}, [dispatch, id]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<>
			<Link
				to='/'
				className='btn btn-light my-3'
				style={{ borderRadius: '0' }}
			>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} fluid />
					</Col>

					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>{product.name}</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating && product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								Price: ${product.price}
							</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>

					<Col md={3}>
						<Card>
							<ListGroup>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock
												? 'In Stock'
												: 'Out of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col
												style={{
													display: 'flex',
													alignItems: 'center',
												}}
											>
												Qty
											</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) =>
														setQty(e.target.value)
													}
												>
													{[
														...Array(
															product.countInStock
														).keys(),
													].map((e) => (
														<option
															key={e + 1}
															value={e + 1}
														>
															{e + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										className='btn-block'
										type='button'
										style={{ borderRadius: '0' }}
										disabled={product.countInStock === 0}
										onClick={addToCartHandler}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
