//const regeneratorRuntime = require('../../utils/runtime.js');
require('./runtime.js');
const {
  clearStorageSync
} = require('./util.js');
const {
  showsLoading,
  hideLoading
} = require('./util.js');
const http = ({
  url = '',
  param = {},
  header = {},
  method = 'GET'
} = {}) => {
  showsLoading();
  let timeStart = Date.now();
  return new Promise((resolve, reject) => {
    console.log('header:', header);
    console.log('param:', param)
    wx.request({
      url: url,
      data: param,
      method: method,
      header: header,
      complete: (res) => {
        hideLoading();
        console.log(`time:${Date.now() - timeStart}`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (res.data.code === 90002) {
            wx.showModal({
              showCancel: false,
              title: '90002重新登录URL提示',
              content: url,
              success(res) {
                if (res.confirm) {
                  console.log('确定')
                }
              }
            });
            wx.showModal({
              showCancel: false,
              title: '90002重新登录参数提示',
              content: JSON.stringify(param),
              success(res) {
                if (res.confirm) {
                  console.log('确定')
                }
              }
            });
            clearStorageSync();
            wx.reLaunch({
              url: '../authorize/authorize',
            })
          } else {
            resolve(res.data)
          }

        } else {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: JSON.stringify(res),
            success(res) {
              if (res.confirm) {
                console.log('确定')
              }
            }
          });
          reject(res)
        }
      }
    });
  })
}

// get方法
const _get = (url, param = {}) => {
  return http({
    url,
    param
  })
}

const _post = (url, param = {}, header = {}) => {
  return http({
    url,
    param,
    header,
    method: 'POST'
  })
}

const _put = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'PUT'
  })
}

const _delete = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'DELETE'
  })
}
//下载
const _downLoadFile = (url) => {
  wx.downloadFile({
    url: url,
    success(res) {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      if (res.statusCode === 200) {
        wx.playVoice({
          filePath: res.tempFilePath
        })
      }
    }
  })
};




module.exports = {
  _get,
  _post,
  _put,
  _delete,
  _downLoadFile
}