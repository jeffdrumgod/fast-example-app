import CONTANTS from './constants-vehicles';

const request = () => (
	{ type: CONTANTS.REQUEST_LIST }
);
const get = () => (
	{ type: CONTANTS.PAYLOAD }
);
const requestSuccess = payload => (
	{
		type: CONTANTS.REQUEST_LIST_SUCCESS,
		payload,
	}
);
const requestFailure = error => (
	{
		type: CONTANTS.REQUEST_LIST_FAILURE,
		error,
	}
);

export default {
	request,
	get,
	requestSuccess,
	requestFailure
};
