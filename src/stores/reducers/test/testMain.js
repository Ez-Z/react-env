import types from '@/constants';
const initialState = {
	isFetching: 0,      // 是否已经获取 
	didInvalidate: 1,  // 是否失效
	testData: ''
};
export const testMain = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case types.TEST_MAIN_GET:
			newState = {
				...state,
				testData: action.payload
			};
			return newState;
		default:
			return state;
	}
};