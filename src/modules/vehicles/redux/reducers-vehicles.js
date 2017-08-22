import CONTANTS from './constants-vehicles';

export default function reducer(
	state = {
		pending: true,
		error: null,
		status: 'loading',
		items: [],
		pagination: {
			page: 0,
			limit: 5,
			length: 0
		},
	},
	action = {}
) {
	switch (action.type) {
	case CONTANTS.REQUEST_LIST:
		return Object.assign(
			{},
			state,
			action.payload,
			{
				pendingLoad: true,
				error: null,
			}
		);

	case CONTANTS.REQUEST_LIST_SUCCESS:
		return Object.assign(
			{},
			state,
			action.payload,
			{
				pendingLoad: false,
				error: null,
			}
		);

	case CONTANTS.REQUEST_LIST_FAILURE:
		return Object.assign(
			{},
			state,
			{
				pendingLoad: false,
				error: action.error,
			}
		);
	default:
		return state;
	}
}
