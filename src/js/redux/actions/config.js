import CONTANTS from '../constants/config';

export function requestConfig() {
	return { type: CONTANTS.CONFIG_REQUEST };
}

export function getConfig() {
	return { type: CONTANTS.CONFIG_PAYLOAD };
}

export function configSuccess(payload) {
	return {
		type: CONTANTS.CONFIG_SUCCESS,
		payload,
	};
}

export function configFailure(error) {
	return {
		type: CONTANTS.CONFIG_FAILURE,
		error,
	};
}
