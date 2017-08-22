import configureStore from 'Redux/configureStore';
import Base from 'Templates/Base.rt';
import './css/Vehicles.scss';
import './vendor.js';
import HeaderVehicles from './templates/parts/Header.rt';

import VehiclesReducer from './redux/reducers-vehicles';
import sagaVehicles from './redux/sagas-vehicles';
import VehiclesList from './list';
import VehiclesAdd from './add';

// import { request as requestVehicles } from './redux/actions-vehicles';

const { BrowserRouter, Route, Switch } = ReactRouterDOM;
const { Component } = React;
// const { connect } = ReactRedux;
const { combineReducers } = Redux;


// creating reducer
const reducer = combineReducers({
	vehicles: VehiclesReducer,
});

// const mapDispatchToProps = (dispatch) => {
// 	const map = {
// 		actions: bindActionCreators(
// 			{ requestVehicles },
// 			dispatch
// 		),
// 	};
// 	return map;
// };
// const mapStateToProps = (state) => {
// 	const map = {
// 		vehicles: state.vehicles,
// 	};

// 	return map;
// };

const propTypes = {
	history: PropTypes.object,
	appConfig: PropTypes.object,
};
const defaultProps = {
	history: {},
	appConfig: {},
};

class Module extends Component {
	static loadExternalContent() {

	}

	constructor(props) {
		super(props);
		this.basePath = `${props.appConfig.baseURL}/vehicles/`.replace(/\/\//g, '/');
		// this.requestVehicles = props.actions.requestVehicles.bind(this);

		this.state = {
			store: configureStore(reducer, 'Vehicles', sagaVehicles, props.history, {})
		};
	}

	componentDidMount() {
		Module.loadExternalContent();
	}

	getRoutes() {
		return [
			{
				path: `${this.basePath}`,
				key: 'home',
				exact: true,
				render: props => (
					<VehiclesList {...{
						...props,
						store: this.state.store
					}} />
				),
			},
			{
				path: `${this.basePath}add`,
				key: 'home',
				exact: true,
				render: props => (
					<VehiclesAdd {...{
						...props,
						store: this.state.store
					}} />
				),
			},
			{
				key: '404',
				render: () => (
					<div>404</div>
				),
			},
		];
	}

	render() {
		return (
			<Base {...{
				header: {
					children: <HeaderVehicles />
				}
			}}>
				<BrowserRouter history={this.props.history}>
					<Switch>
						{this.getRoutes(this.props.appConfig).map(route => (
							<Route {...route} />
						))}
					</Switch>
				</BrowserRouter>
			</Base>
		);
	}
}

Module.propTypes = propTypes;
Module.defaultProps = defaultProps;

// const ModuleConnected = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Module);

export default Module;
