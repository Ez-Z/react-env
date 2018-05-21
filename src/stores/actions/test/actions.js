import * as types from './types';

export const testAction = (testData) => {
	return {
		type: types.TEST_MAIN_GET,
		testData
	};
};