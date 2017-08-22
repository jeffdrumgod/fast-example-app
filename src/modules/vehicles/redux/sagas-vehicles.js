// import CONTANTS from './constants-vehicles';
import actions from './actions-vehicles';
import FakeApi from '../fakeApi';

const { call, put, takeLatest } = ReduxSaga.effects;
const Api = new FakeApi();

export function* getList(action) {
	const fields = (action.fields || {});
	try {
		const responseAppConfig = yield call(
			Api.get.bind(
				Api,
				(fields.filters || {}),
				(fields.page || 0)
			)
		);

		if (!responseAppConfig) {
			const msg = 'Não foi possível recuperar os dados para as informações requisitadas';
			yield put(actions.requestFailure(msg));
		} else {
			yield put(actions.requestSuccess(responseAppConfig));
		}
	} catch (e) {
		yield put(actions.requestFailure(e.message));
	}
}

export function* watchGetList() {
	const opts = actions.request();
	yield takeLatest(opts.type, getList);
}

export default function* rootSaga() {
	yield [
		watchGetList()
	];
}
