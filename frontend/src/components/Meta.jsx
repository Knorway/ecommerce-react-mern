import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keyword' content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome To ProShop',
	description: 'We sell the best products for cheap',
	keywords: 'electronis, buy electronics, cheap electronis',
};

export default Meta;
