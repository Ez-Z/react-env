import types from '@/constants';
const initialState = {
	isLogin: false,
	userName: null
};
export const userInfo = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case types.LOGIN_INFO_GET:
			newState = {
				...state,
				...action.payload
			};			
			return newState;
		default:
			return state;
	}
};