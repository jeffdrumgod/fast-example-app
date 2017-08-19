import CONTANTS from '../constants/config';
import {
	configSuccess,
	configFailure,
} from '../actions/config';

const { call, put, takeLatest } = ReduxSaga.effects;

export function* getConfigAsync() {
	try {
		const responseAppConfig = yield call(window.axios.get, 'json/app_config.json');

		if (!responseAppConfig) {
			const msg = 'Arquivo de configuração da aplicação não é valido!';
			yield put(configFailure(msg));
		} else {
			yield put(configSuccess(responseAppConfig.data));
		}
	} catch (e) {
		yield put(configFailure(e.message));
	}
}

export function* watchGetConfig() {
	yield takeLatest(CONTANTS.CONFIG_REQUEST, getConfigAsync);
}

export default function* rootSaga() {
	yield [
		watchGetConfig()
	];
}
