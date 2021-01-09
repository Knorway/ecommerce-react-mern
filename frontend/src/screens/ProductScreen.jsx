import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { listProductDetail, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const productDetail = useSelector((state) => state.productDetail);
	const { loading, error, product } = productDetail;

	const productCreateReview = useSelector((state) => state.productReviewCreate);
	const {
		loading: successProductReview,
		error: errorProductReview,
	} = productCreateReview;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const id = match.params.id;

	useEffect(() => {
		if (successProductReview) {
			alert('Review Submitted');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}

		dispatch(listProductDetail(id));
	}, [dispatch, id, successProductReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment,
			})
		);
	};

	return (
		<>
			<Link to='/' className='btn btn-light my-3' style={{ borderRadius: '0' }}>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col md={6} className='mb-5'>
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
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
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

					<Row>
						<Col md={6}>
							<h2 className='mb-3'>Reviews</h2>
							{product.reviews.length === 0 && (
								<Message>No reviews</Message>
							)}
							{product.reviews.map((review) => (
								<ListGroup.Item key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} />
									<p>{review.createdAt.substring(0, 10)}</p>
									<p>{review.comment}</p>
								</ListGroup.Item>
							))}
							<ListGroup.Item>
								<h3 className='mb-3'>Write a Customer Review</h3>
								{errorProductReview && (
									<Message variant='danger'>
										{errorProductReview}
									</Message>
								)}
								{userInfo ? (
									<Form onSubmit={submitHandler}>
										<Form.Group controlId='rating'>
											<Form.Label>Rating</Form.Label>
											<Form.Control
												as='select'
												value={rating}
												onChange={(e) =>
													setRating(e.target.value)
												}
											>
												<option value=''>Select...</option>
												<option value='1'>1 - Poor</option>
												<option value='2'>2 - Fair</option>
												<option value='3'>3 - Good</option>
												<option value='4'>4 - Very Good</option>
												<option value='5'>5 - Exellent</option>
											</Form.Control>
										</Form.Group>
										<Form.Group controlId='comment'>
											<Form.Label>Comment</Form.Label>
											<Form.Control
												as='textarea'
												row='3'
												value={comment}
												onChange={(e) =>
													setComment(e.target.value)
												}
											></Form.Control>
										</Form.Group>
										<Button type='submit' variant='primary'>
											Submit
										</Button>
									</Form>
								) : (
									<Message>
										Please <Link to='/login'> to write a review</Link>
									</Message>
								)}
							</ListGroup.Item>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
