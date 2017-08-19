import View404 from 'Templates/views/view404.rt';

const propTypes = {
	location: PropTypes.object
};

const defaultProps = {
	location: {}
};

const NoMatch = props => <View404 {...props} />;

NoMatch.propTypes = propTypes;
NoMatch.defaultProps = defaultProps;

export default NoMatch;
