import * as types from '../../constants/actions/test';
const initialState = {
	isFetching: 0,      //是否已经获取 
	didInvalidate: 1    //是否失效
	testData: ''
};
export const testMain = (state = initialState, action) => {
	switch (action.type) {
		case types.TEST_MAIN_GET:
			return state;
		default:
			return state;
	}
};