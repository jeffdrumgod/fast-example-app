const { createStore, applyMiddleware, compose } = Redux;
const { routerMiddleware } = ReactRouterRedux;
const createSagaMiddleware = ReduxSaga.default;

export default function createStoreWithMiddleware(reducer, instanceName = 'Reducer Base', rootSaga, history, data = {}) {
	const reduxRouterMiddleware = routerMiddleware(history);
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [
		reduxRouterMiddleware,
		sagaMiddleware,
	];
	/* eslint-disable no-underscore-dangle */
	let composeEnhancers = compose;
	if (!!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && !!instanceName) {
		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			name: instanceName
		});
	}

	const store = createStore(
		reducer,
		data,
		composeEnhancers(
			applyMiddleware(
				...middleware
			)
		)
	);
	/* eslint-enable */

	sagaMiddleware.run(rootSaga);

	return store;
}
