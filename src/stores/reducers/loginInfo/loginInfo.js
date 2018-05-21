import * as types from '../../actions/loginInfo/types';
const initialState = {
	isLogin: false,
	userName: null
};
export const loginInfo = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case types.LOGIN_INFO_GET:
			newState = {
				...state,
				...action.loginInfo
			};			
			return newState;
		default:
			return state;
	}
};