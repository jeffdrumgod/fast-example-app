import configureStore from 'Redux/configureStore';
import rootSaga from 'Redux/sagas/config';
import AppConfigModule from 'Redux/modules/config';
import Container from './Container';

const { combineReducers } = Redux;
const { routerReducer } = ReactRouterRedux;

// creating reducer
const reducer = combineReducers({
	routing: routerReducer,
	app_config: AppConfigModule,
});

const { createBrowserHistory } = History;
const { Provider } = ReactRedux;
const { syncHistoryWithStore } = ReactRouterRedux;

// creating default State of application store
const initialState = {};
// creating default Browser History application
const customHistory = createBrowserHistory();
// creating store
const store = configureStore(reducer, rootSaga, customHistory, initialState);
// sync History with previous created Store
const history = syncHistoryWithStore(customHistory, store);

const Root = () => (
	<Provider store={store}>
		<Container history={history} />
	</Provider>
);

export default Root;

