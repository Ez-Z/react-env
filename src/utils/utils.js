/**
 * 工具方法
 */


/**
 *做一个约定，设置缓存的时候类型为：Object
 *否则要改写JSON.stringify和JSON.parse做判断
 */
/* Cookie*/
/**
 * 设置cookie
 * @param  key
 * @param  val
 * @param  days   时间：默认12小时、，单位：天
 * @param  path   域名下的路径：默认：/
 * @param  domain 域名
 */
export const setCookie = (key, val, days, path, domain) => {
	let expire = new Date();
	expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 0.5 * 24 * 3600000)); // 默认12小时
	document.cookie = key + '=' + encodeURIComponent(JSON.stringify(val)) + ';expires=' + expire.toGMTString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
};
/**
 * 删除cookie
 */
export const delCookie = (key, path, domain) => {
	let expires = new Date(0);
	document.cookie = key + '=;expires=' + expires.toUTCString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
};
/**
 * 获取cookie
 */
export const getCookie = (key) => {
	let r = new RegExp("(?:^|;+|\\s+)" + key + "=([^;]*)");
	let m = window.document.cookie.match(r);
	return (!m ? null : JSON.parse(decodeURIComponent(m[1])));
};

/**
 * 判断是否可以进行localStorage
 */
const isAvailable = (() => {
	const test = 'test';
	try {
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
		return true;
	} catch (e) {
		return false;
	}
})();
/**
 * 设置缓存
 * @param key 保存的键值
 * @param val 保存的内容
 */
export const setItem = (key, val) => {
	val = JSON.stringify(val);
	if (isAvailable) {
		localStorage.setItem(key, val);
	}
};
/**
 * 获取缓存
 * @param  {[String]} key 获取的键值
 * @return {Object}
 */
export const getItem = (key) => {
	if (isAvailable) {
		return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
	}
};
/**
 * 删除缓存
 * @param  {[String]} key 删除的键值
 */
export const delItem = (key) => {
	if (isAvailable) {
		localStorage.removeItem(key);
	}
};
/**
 * 获取设备
 * @return {[object]} device [设备对象]
 */
export const getDevice = () => {
	const device = {};
	const ua = navigator.userAgent;

	const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

	device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

	// Android
	if (android) {
		device.os = 'android';
		device.osVersion = android[2];
		device.android = true;
		device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
	}
	if (ipad || iphone || ipod) {
		device.os = 'ios';
		device.ios = true;
	}
	// iOS
	if (iphone && !ipod) {
		device.osVersion = iphone[2].replace(/_/g, '.');
		device.iphone = true;
	}
	if (ipad) {
		device.osVersion = ipad[2].replace(/_/g, '.');
		device.ipad = true;
	}
	if (ipod) {
		device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
		device.iphone = true;
	}
	// iOS 8+ changed UA
	if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
		if (device.osVersion.split('.')[0] === '10') {
			device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
		}
	}
	// Webview
	device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
	// keng..
	device.weixin = /MicroMessenger/i.test(ua);
	// pc or touch
	device.touch = (device.android || device.ios) ? true : false;
	return device;
};
/**
 * 重构url
 * @param  {Object}
 * @return {String}
 */
export const constructUrl = (route) => { // 创建新的url
	const {
		path,
		query
	} = route;
	let result = path.join('/');
	let queryArr = [];
	if (query && typeof query === 'object') {
		queryArr = Object.keys(query).sort()
			.filter(key => query[key] !== null)
			.map(key => `${key}=${query[key]}`);
	}

	if (queryArr.length > 0) {
		result += `?${queryArr.join('&')}`;
	}

	return result;
};
/**
 * 解析url
 * @param  {String} windowHash = location.pathname
 * @return {Object}
 */
export const parseUrl = (windowHash = location.pathname) => { // 解析url
	let path = [];
	const query = {};
	// windowHash = location.hash;
	// const hashArr = windowHash.replace('#/', '').split('?');
	const hashArr = windowHash.replace('/', '').split('?');
	path = hashArr[0].split('/');

	if (hashArr.length > 1) {
		hashArr[1].split('&').forEach(str => {
			const arr = str.split('=');
			const key = arr[0];
			const value = arr[1];
			if (isNaN(value)) {
				query[key] = value;
			} else {
				query[key] = Number(value);
			}
		});
	}

	return {
		path,
		query
	};
};
/**
 * 重构Url
 * @param  {[type]} paramObj url的参数对象
 * @param  {[type]} url      url
 * @return {[type]}          新的url
 */
export const hashUrl = (paramObj, url = '') => {
	let paramArray = [];
	for (let key in paramObj) {
		if (paramObj[key] && paramObj[key].length != 0) { // 过滤掉值为null,undefined,''情况
			paramArray = [...paramArray, `${key}=${paramObj[key]}`];
		}
	}
	return `${url}?${paramArray.join('&')}`;
};
/**
 * 查找url中key的值
 * @param  {String} key
 * @param  {String} urlInfo
 * @return {String}
 */
export const getUrlParam = (key, urlInfo) => {
	let regExp = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	let url = urlInfo ? urlInfo.substring(urlInfo.indexOf('?')) : window.location.search;
	let value = decodeURI(url).substr(1).match(regExp);

	return value != null ? unescape(value[2]) : null;
};

/* 验证数据*/
let obj = {
	validNum: {
		regex: /^\d+(\.\d+)?$/,
		error: "请输入正确数字"
	},
	validEmail: {
		regex: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
		error: "邮箱格式不正确"
	},
	validDate: {
		regex: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
		error: "日期格式不正确"
	},
	validTime: {
		regex: /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/,
		error: "时间格式不正确"
	},
	validId: {
		// regex: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
		regex: /(^[0-9a-zA-Z]{6,}$)/, // 港澳台比较特殊
		error: "身份证格式不正确"
	},
	validPrice: {
		regex: /^([+-]?[1-9][\d]{0,3}|0)([.]?[\d]{1,2})?$/,
		error: "请输入正确金额"
	},
	validMobile: {
		regex: /^(13[0-9]|14[5|7]|15[^4|^\D]|17[0-9]|18[0-9])\d{8}$/,
		// regex: /^\d+(\.\d+)?$/,
		error: "请填写正确的手机号码"
	},
	validPhone: {
		regex: /^(\(\d{3,4}\)|\d{3,4}(-|\s)?)?\d{7,8}(-\d{1,4})?$/,
		error: "请填写正确的手机号码"
	},
	validPostalCode: {
		regex: /^\d{4}$/,
		error: "请输入4位短信验证码"
	},
	validZipCode: {
		regex: /^\d{6}$/,
		error: "请输入6位邮政编码"
	},
	validWeChat: {
		regex: /^[a-zA-Z\d_-]{5,}$/,
		error: "请输入正确的微信号"
	},
	validName: {
		regex: /^[a-z0-9\u4e00-\u9fa5_-]{1,}$/,
		error: "请不要输入特殊字符"
	}
};
/**
 * 验证数据
 * @param  {String} rule 规则
 * @param  {String} value 校正的value
 * @param  {String} callback 回调报错
 * @return {String}
 */
export const dataValidity = (rule, value, callback) => {
	let error;
	if (rule.required && !value) {
		error = rule.name + "必填";
		callback(error);
		return false;
	}
	if (rule.type == 'validMobile') {
		value = value.replace(/\s/g, '');
	}
	if (obj[rule.type] && value && !obj[rule.type].regex.test(value)) {
		error = obj[rule.type].error;
		callback(error);
	} else {
		callback();
	}
};

/**
 * 处理base64 前缀
 */
export const filterBase64 = (data) => {
	let changeStr = (imgUrl) => {
		imgUrl = imgUrl.replace(/data:image\/[^;]+;base64,/g, '');
		return imgUrl;
	};
	if (!(data instanceof Array)) {
		data = changeStr(data);
	} else {
		for (let i = 0; i < data.length; i++) {
			data[i] = changeStr(data[i]);
		}
	}
	return data;
};

/**
 * 处理项目中rtf（富文本中的图片）
 */
export const rtfImages = (data) => {
	if (!data) {
		return data;
	}
	data = data.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"");
	data = data
		.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, '<img src="$1" />')
		.replace(/<img [^>]*src=['"][^'"]+img\.baidu\.com([^'"]+)[^>]*>/gi, '<img style="width:auto;" src="https://img.baidu.com$1" />')
		.replace(/<img [^>]*src=['"][^'"]+osscdn\.weiyian\.com([^'"]+)[^>]*>/gi, '<img src="http://osscdn.weiyian.com$1!1-0" />');
	return data;
};


/**
 * 创建对象属性
 */

export const defineProperty = (obj, key, value, opts = {}) => {
	const {
		writable = true, 
		enumerable = true, 
		configurable = true, 
		...rest
	} = opts;
	const descriptor = {
		...rest,
		writable,
		enumerable,
		configurable,
		value
	};

	return Object.defineProperty(obj, key, descriptor);
};
