import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ page, pages, isAdmin, keyword }) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()]
					.map((x) => x + 1)
					.map((x) => (
						<LinkContainer
							key={x}
							to={
								!isAdmin
									? keyword
										? `/search/${keyword}/page/${x}`
										: `/page/${x}`
									: `/admin/productlist/${x}`
							}
						>
							<Pagination.Item active={x === page}>{x}</Pagination.Item>
						</LinkContainer>
					))}
			</Pagination>
		)
	);
};

Paginate.defaultProps = {
	isAdmin: false,
	keyword: '',
};

export default Paginate;
