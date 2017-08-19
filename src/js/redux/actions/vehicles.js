import CONTANTS from '../constants/vehicles';

export function request() {
	return { type: CONTANTS.VEHICLES_REQUEST };
}

export function get() {
	return { type: CONTANTS.VEHICLES_PAYLOAD };
}

export function requestSuccess(payload) {
	return {
		type: CONTANTS.VEHICLES_SUCCESS,
		payload,
	};
}

export function requestFailure(error) {
	return {
		type: CONTANTS.VEHICLES_FAILURE,
		error,
	};
}

