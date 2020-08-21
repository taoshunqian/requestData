// import md5 from '@/components/js-md5/src/md5.js'

// const serverUrl = 'https://www.b5yc.com/Car_2_0'
const serverUrl = 'https://www.baoyanghui.com/Car_2_0'
const timeout = 15000
export class Api {
	static async _request(url, method, params) {
		const [error, res] = await uni.request({
			url: serverUrl + '/api/test',
			method: 'GET',
			data: params,
			timeout: timeout
		});
		console.log('sign', res)
		params['sign'] = res['data']['resultData'][0]
		return uni.request({
			url: serverUrl + url,
			method: method,
			data: params,
			timeout: 200000,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'token': 1
			}
		});
	}

	// 更新用户唯一码有效期
	static updateUserCodeTime(params) {
		return Api._request('/api/usercodes', 'PUT', params)
	}
	
	// 获取商家信息
	static getShopInfo(params) {
		return Api._request('/api/merchants/800', 'GET', params)
	}
	
	// 获取我的全部车辆信息
	static getMyCarsInfo(params) {
		return Api._request('/api/carinfos', 'GET', params)
	}
	
	// 新增车辆信息
	static addCarInfo(params) {
		return Api._request('/api/carinfos', 'POST', params)
	}
	
	// 删除车辆信息
	static deleteCarInfo(params) {
		return Api._request('/api/carinfos/'+params['{car_id}'], 'POST', params)
	}
	
	// 设置默认车辆
	static setDefaultCarInfo(params) {
		return Api._request('/api/carinfos/'+params['{car_id}'], 'POST', params)
	}
	
	// 获取车辆服务记录
	static getServiceRecord(params) {
		return Api._request('/api/carinfos/'+params['{car_id}'], 'GET', params)
	}
	
	// 获取车辆服务建议
	static getServiceAdvice(params) {
		return Api._request('/api/item_types', 'POST', params)
	}
	
	// 微信支付
	static tenPay(params) {
		return Api._request('/api/tenpay_app', 'POST', params)
	}
	
	// 验证车牌
	static verifyLicence(params) {
		return Api._request('/api/carinfos', 'GET', params)
	}
	
	// 修改车辆信息
	static updateCarInfo(params) {
		return Api._request('/api/carinfos/'+params['{car_id}'], 'PUT', params)
	}
	
	// 获取车辆详细信息
	static getCarDetailInfo(params) {
		return Api._request('/api/carinfos/'+params['{car_id}'], 'GET', params)
	}
	
	// 登录验证
	static login(params) {
		let dataType = ''
		let url = ''
		let data = {}
		// #ifdef MP-WEIXIN
		url = '/backend/miniProgram/carTesting/login.do'
		data['encryptedData'] = params['encryptedData']
		data['iv'] = params['iv']
		data['jscode'] = params['jscode']
		dataType = 'application/json'
		// #endif
		// #ifdef MP-ALIPAY
		uni.showToast({
			title:'支付宝授权登录中...'
		})
		url = '/car/applet/alipay/login.do'
		data['aliPayResponse'] = params['aliPayResponse']
		data['authcode'] = params['jscode']
		dataType = 'application/x-www-form-urlencoded'
		// #endif
		return uni.request({
			url: serverUrl + url,
			method: 'POST',
			data: data,
			timeout: timeout,
			header: {
				'Content-Type': dataType,
				'token': 1
			}
		})
		
	}
	
	// 获取测试报告记录
	static getTestReportList(params) {
		return uni.request({
			url: serverUrl + '/car/check/reportList.do',
			method: 'POST',
			data: params,
			timeout: timeout,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'token': 1
			}
		})
	}
	
	// 获取测试报告详细信息
	static getTestReport(params) {
		return uni.request({
			url: serverUrl + '/car/check/reportInfo.do',
			method: 'POST',
			data: params,
			timeout: timeout,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'token': 1
			}
		})
	}
	
	// 获取商家信息
	static getMerchantInfo(params) {
		return uni.request({
			url: serverUrl + '/car/check/getMerchantPlaceInfo.do',
			method: 'GET',
			data: params,
			timeout: timeout,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'token': 1
			}
		})
	}
	
	// 支付宝支付
	static aliPay(params) {
		return uni.request({
			url: serverUrl + '/car/applet/alipay/cusPay.do',
			method: 'POST',
			data: params,
			timeout: timeout,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'token': 1
			}
		})
	}
	
	// 订单状态
	static getOrderDetail(params) {
		return uni.request({
			url: serverUrl + '/car/applet/alipay/getPayStatus.do',
			method: 'POST',
			data: params,
			timeout: timeout,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'token': 1
			}
		})
	}
	
	// 预约到店服务
	static appointmentService(params) {
		return uni.request({
			url: serverUrl + '/car/check/reserve.do',
			method: 'POST',
			data: params,
			timeout: timeout,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'token': 1
			}
		})
	}
	
	// 获取附近门店(历史门店)
	static getNearbyMerchant(params) {
		return uni.request({
			url: serverUrl + '/car/check/getPlaces.do',
			method: 'GET',
			data: params,
			timeout: timeout,
			// header: {
			// 	'Content-Type': 'application/x-www-form-urlencoded',
			// 	'token': 1
			// }
		})
	}
}