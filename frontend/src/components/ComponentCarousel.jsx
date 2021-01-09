import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listTopProduct } from '../actions/productActions';
import Loader from './Loader';
import Message from './Message';

const ComponentCarousel = () => {
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector((state) => state.productTopRated);

	useEffect(() => {
		dispatch(listTopProduct());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-dark mb-3'>
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h3 className=''>
								{product.name} (${product.price})
							</h3>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ComponentCarousel;
