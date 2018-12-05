import types from '@/constants';

export const user = (payload) => {
	return {
		type: types.LOGIN_INFO_GET,
		payload
	};
};