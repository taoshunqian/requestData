import md5 from '@/assets/js/md5.js'
import axios from 'axios'
// let URL = ''
import { Message } from 'element-ui';


let num = 0

export  const fath = (url,data,method,id,num) => {
	let aa
	if(num == 1) {
		aa = convertObjectToFormData(data, id ? id : '', 'A30D-634C-0A4F')	
	}else {
		aa = data
	}
	if(method == 'get') {
		return get(url,aa)
	}else if(method == 'post') {
		return post(url,aa)
	} else if (method == 'put') {
		return put(url,data)
	}
}
const post = (url,aa) => {
	return new Promise((resolve,reject) => {
		axios.interceptors.request.use(function(config) {
			let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
			if (userinfo.usercode) {
				config.headers.token = userinfo.usercode;
				return config;
			}
		}, function(error) {
			return Promise.reject(error);
		});
		axios.post(url,aa).then(res => {
			if(res.data.code == 0) {
				resolve(res.data)
					Message ({
					    message: '成功',
						duration:1000,
					    type: 'success'
					})
				// if(num == 0) {
				// 	Message ({
				// 	    message: '成功',
				// 		duration:1000,
				// 	    type: 'success'
				// 	})
				// 	num = 2
				// 	let time = setInterval(() => {
				// 		num--;
				// 		if(num == 0) {
				// 			clearTimeout(time);
				// 		}
				// 	},1000)
				// }else {
					
				// }
			}else {
				Message.error(res.data.message)
				return
			}
		}).catch(res => {
			reject(res)
			Message.error('网络链接有误，请检查网络')
			return
		})
	})
}
const put = (url,data) => {
	return new Promise((resolve,reject) => {
		axios.interceptors.request.use(function(config) {
			let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
			if (userinfo.usercode) {
				config.headers.token = userinfo.usercode;
				return config;
			}
		}, function(error) {
			return Promise.reject(error);
		});
		axios.put(url,data).then(res => {
			if(res.data.code == 0) {
				resolve(res.data)
				// Message.error('成功')
				Message ({
				    message: '成功',
					duration:1000,
				    type: 'success'
				})
				// return Promise.
			}else {
				Message.error(res.data.message)
				return
			}
		}).catch(res => {
			reject(res)
			Message.error('网络链接有误，请检查网络')
			return
		})
	})
}
const get = (url,aa) => {
	return new Promise((resolve,reject) => {
		axios.interceptors.request.use(function(config) {
			let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
			if (userinfo.usercode) {
				config.headers.token = userinfo.usercode;
				return config;
			}
		}, function(error) {
			return Promise.reject(error);
		});
		axios.get(url,{ params: aa }).then(res => {
			if(res.data.code == 0) {
				resolve(res.data)
				Message ({
				    message: '成功',
					duration:1000,
				    type: 'success'
				})
			}else {
				Message.error(res.data.message)
				return
			}
		}).catch(res => {
			reject(res)
			Message.error('网络链接有误，请检查网络')
			return
		})
	})
}


function convertObjectToFormData(obj, id, key) {
	let arr = new Array();
	let i = 0;
	if (obj.hasOwnProperty('keyword')) {
		for (var attr in obj) {
			if (attr === 'keyword') {
				// let str = encodeURIComponent(obj[attr]).replace(/%20/g,'+').replace('(','%28').replace(')','%29').replace('*','%2A').replace('!','%21').replace('~','%7E')
				let str = encodeURIComponent(obj[attr]).replace(/%20/g, '+').replace('*', '%2A').replace('!', '%21').replace('~',
					'%7E')
				arr[i] = attr + "=" + str;
			} else {
				let str = encodeURIComponent(obj[attr]).replace(/%20/g, '+').replace('(', '%28').replace(')', '%29').replace('*',
					'%2A').replace('!', '%21').replace('~', '%7E')
				arr[i] = attr + "=" + str;
			}
			i++;
		}
	} else {
		for (var attr in obj) {
			let str = encodeURIComponent(obj[attr]).replace(/%20/g, '+').replace('(', '%28').replace(')', '%29').replace('*',
				'%2A').replace('!', '%21').replace('~', '%7E')
			arr[i] = attr + "=" + str;
			i++;
		}
	}


	arr = arr.sort();
	let str = arr.join("&");
	let sign = md5(str + ((id) ? id : "") + key)
	// console.log(str + `&sign=${sign}`)
	return str + `&sign=${sign}`;
}
