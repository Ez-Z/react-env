import types from '@/constants';

export const testAction = (payload) => {
	return {
		type: types.TEST_MAIN_GET,
		payload
	};
};