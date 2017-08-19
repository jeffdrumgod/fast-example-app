import LoadingView from 'Templates/PageLoading.rt';
import { requestConfig } from 'Redux/actions/config';
import Routes from './Routes';

const { Component } = React;
const { connect } = ReactRedux;
const { bindActionCreators } = Redux;
const { BrowserRouter, Route, Switch } = ReactRouterDOM;


const mapDispatchToProps = (dispatch) => {
	const map = {
		actions: bindActionCreators(
			{ requestConfig },
			dispatch
		),
	};
	return map;
};
const mapStateToProps = (state) => {
	const map = {
		app_config: state.app_config,
	};

	return map;
};

/* props config */
const propTypes = {
	actions: PropTypes.object,
	history: PropTypes.object,
	app_config: PropTypes.object,
	children: PropTypes.node,
};
const defaultProps = {
	actions: {},
	history: {},
	app_config: {},
	children: false,
};
/* END props config */

class Container extends Component {
	constructor(props) {
		super(props);
		this.requestConfig = props.actions.requestConfig.bind(this);
	}

	componentDidMount() {
		this.requestConfig();
	}

	getRoutes() {
		return (
			<BrowserRouter history={this.props.history}>
				<Switch>
					{Routes(this.props.app_config).map(route => (
						<Route {...route} />
					))}
				</Switch>
			</BrowserRouter>
		);
	}

	fullyLoaded() {
		const appConfig = this.props.app_config;
		return !appConfig.pendingLoad;
	}

	render() {
		return (
			<div>
				{this.fullyLoaded() ? this.getRoutes() : LoadingView.call(this)}
			</div>
		);
	}
}
Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

const ComponentBase = connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);

export default ComponentBase;
