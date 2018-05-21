import * as types from './types';

export const getLoginInfo = (loginInfo) => {
	return {
		type: types.LOGIN_INFO_GET,
		loginInfo
	};
};