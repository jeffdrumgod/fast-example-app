import ActionsVehicles from './redux/actions-vehicles';
import List from './templates/list.rt';

const { Component } = React;
const { connect } = ReactRedux;
const { bindActionCreators } = Redux;

const propTypes = {
	location: PropTypes.object,
	actions: PropTypes.object,
};

const defaultProps = {
	location: {},
	actions: {},
};

const mapDispatchToProps = (dispatch) => {
	const map = {
		actions: bindActionCreators(
			{ requestVehicles: ActionsVehicles.request },
			dispatch
		),
	};
	return map;
};
const mapStateToProps = state => ({ vehicles: state.vehicles });

class VehiclesList extends Component {
	constructor(props) {
		super(props);
		this.requestVehicles = props.actions.requestVehicles.bind(this);
		this.onSelectOption = this.onSelectOption.bind(this);
		this.colsToShow = {
			option: { },
			placa: { label: 'Placa' },
			modelo: { label: 'Modelo' },
			marca: { label: 'Marca' },
			imagem: {
				label: 'Foto',
				modifier: (value) => {
					if (!value) {
						return (
							<span className="no-image">Sem foto</span>
						);
					}
					return (
						<a {...{
							href: value,
							className: 'image',
							target: '_blank',
						}}>
							imagem
						</a>
					);
				}
			},
			combustivel: { label: 'Combustível' },
			valor: {
				label: 'Valor',
				modifier: (value) => {
					if (!isNaN(value)) {
						return (+value).toMoney(2, ',', '.');
					}

					return value;
				}
			},
			optionLast: { },
		};
	}

	componentDidMount() {
		this.requestVehicles();
	}

	onSelectOption(item, event) {
		console.log(this, item, event);
	}

	onChangePage(item, event) {
		event.preventDefault();
		console.log(this, item, event);
	}

	render() {
		return List.call(this);
	}
}

VehiclesList.propTypes = propTypes;
VehiclesList.defaultProps = defaultProps;

const ModuleConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(VehiclesList);

export default ModuleConnected;
