const commonUrl = ""; //测试
// post请求封装
function postRequest(url, data) {
    var promise = new Promise((resolve, reject) => {
        var that = this;
        var postData = data;
        uni.request({
            url: commonUrl + url,
            data: postData,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                // token: uni.getStorageSync("token")
            },
            success: function(res) {
                // console.log(res)
                if (res.statusCode == 200) {
                    resolve(res.data);	
				}else {
                    resolve(res.data);
                }
            },
            error: function(e) {
                reject("网络出错");
            }
        });
    });
    return promise;
}

// get请求封装
function getRequest(url, data) {
    var promise = new Promise((resolve, reject) => {
        var that = this;
        var postData = data;
        uni.request({
            url: commonUrl + url,
            data: postData,
            method: "GET",
            dataType: "json",
            header: {
                "content-type": "application/json"
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                }
            },
            error: function(e) {
                reject("网络出错");
            }
        });
    });
    return promise;
}

// detele请求封装
function deteleRequest(url, data) {
    var promise = new Promise((resolve, reject) => {
        var that = this;
        var postData = data;
        uni.request({
            url: commonUrl + url,
            data: postData,
            method: "DELETE",
            dataType: "json",
            header: {
                "content-type": "application/json"
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                }
            },
            error: function(e) {
                reject("网络出错");
            }
        });
    });
    return promise;
}

module.exports = {
    post: postRequest,
    get: getRequest,
	deletes:deteleRequest
};
