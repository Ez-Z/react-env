const axios = require('axios');
// import $url from './url';
import { delCookie } from './util';
/**
 * 
 * 
	this.$http({
		method: 'post',
		url: '/products',
		data: {},
	}).then((response) => {
		console.log(response);
		this.$Message.success({
			content: 'sss',
		});
	}).catch((err) => {
	});
 */

let cancel;

const httpServer = axios.create({
	// baseURL: $url.webUrl,
	timeout: 10000,
	responseType: 'json',
	headers: {
		// 'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	withCredentials: true,  // 设置 withCredentials 使请求带上 `cookies` 
	cancelToken: new axios.CancelToken(function (c) {
		cancel = c;  // 记录当前请求的取消方法
	})
});

httpServer.interceptors.request.use(config => {
	return config;
}, err => {
	return Promise.reject(err);
});

httpServer.interceptors.response.use(response => {
	if (response.data.code == -9999) {
		delCookie('userId');
		setTimeout(() => {
			location.reload();
		}, 1000);
	}
	return response.data;
}, err => {
	console.log(err);
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				err.message = '错误请求';
				break;
			case 401:
				err.message = '未授权，请重新登录';
				break;
			case 403:
				err.message = '拒绝访问';
				break;
			case 404:
				err.message = '请求错误,未找到该资源';
				break;
			case 405:
				err.message = '请求方法未允许';
				break;
			case 408:
				err.message = '请求超时';
				break;
			case 500:
				err.message = '服务器端出错';
				break;
			case 501:
				err.message = '网络未实现';
				break;
			case 502:
				err.message = '网络错误';
				break;
			case 503:
				err.message = '服务不可用';
				break;
			case 504:
				err.message = '网络超时';
				break;
			case 505:
				err.message = 'http版本不支持该请求';
				break;
			default:
				err.message = `连接错误${err.response.status}`;
		}
	} else {
		err.message = "连接到服务器失败";
	}
	return Promise.resolve(err.response);
});

export default httpServer;