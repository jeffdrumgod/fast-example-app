import CONTANTS from '../constants/config';

export default function reducer(
	state = {
		pendingLoad: true,
		error: null,
	},
	action = {}
) {
	switch (action.type) {
	case CONTANTS.CONFIG_REQUEST:
		return Object.assign(
			{},
			state,
			action.payload,
			{
				pendingLoad: true,
				error: null,
			}
		);

	case CONTANTS.CONFIG_SUCCESS:
		return Object.assign(
			{},
			state,
			action.payload,
			{
				pendingLoad: false,
				error: null,
			}
		);

	case CONTANTS.CONFIG_FAILURE:
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
