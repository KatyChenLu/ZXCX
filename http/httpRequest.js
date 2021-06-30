var loading = require('./loading.js')
var Url = require('./httpUrl.js')
var Util = require('../utils/util.js')


function requestPost(url, params, message, callback) {
  request(url, params, "post", message, callback)
}
function requestGet(url, params, message, callback) {
  request(url, params, "get", message, callback)
}


function request(url, params, method, message, callback) {
  var success = callback.success//服务器返回200 
  var noLogin = callback.noLogin//服务器返回1004
  var error = callback.error//服务器返回其他错误
  var localFail = callback.localFail//请求本身发生错误
  var complete = callback.complete//请求完成之后走的接口
  wx.showNavigationBarLoading()
  if (message !== "") {
    loading.show(message);
  }
  //从缓存中获取授权token
  var device = wx.getStorageSync('device')
  if(!device) {
    var uuid = wx.getStorageSync('uuid');
    if(!uuid) {
      wx.setStorageSync('uuid', uuid)
    }
    wx.getSystemInfo({
      success: function (res) {
        device = {
          uuid: uuid,
          dbrand: res.brand,
          dlanguage: res.language,
          dmodel: res.model,
          dplatform: res.platform,
          dwxplatform: res.platform,
          dscreenWidth: res.screenWidth,
          dsystem: res.system,
          dversion: res.version,
          dSDKVersion: res.SDKVersion,
        }
        wx.setStorageSync('device', device)
      }
    })
  }
  device['apiChannel'] = 'MS'
  var header = device
  header['content-type'] = 'application/x-www-form-urlencoded'
  var access_token= wx.getStorageSync('access_token')
  if (access_token) {
    header['Authorization'] = access_token
  }
  var platform = wx.getStorageSync('platform')
  if (platform) {
    header['dplatform'] = platform
  } else {
    header['dplatform'] = 'wxapp'
  }

  var source = wx.getStorageSync('source')
  if(source) {
    params['source'] = source
  }
  var extra = wx.getStorageSync('extra')
  if (extra) {
    params['extra'] = extra
  }
  var index = wx.getStorageSync('index')
  if (index) {
    params['index'] = index
  }

  wx.request({
    url: url,
    data: params,
    method: method,
    header: header,
    success: function (res) {
      if ("Authorization" in res.header) {
        console.log("old", "Bearer " + access_token)
        console.log("new", res.header.Authorization)
        wx.setStorage({
          key: "access_token",
          data: res.header.Authorization,
          success: function (data) {
            console.log('更新登录写入缓存成功')
          },
          fail: function (data) {
            console.log('更新登录写入缓存失败')
          }
        })
      }
      wx.hideNavigationBarLoading()
      if (message !== "") {
        loading.dismiss()
      }
      var data=res.data.data
      var code = res.data.code
      var msg = res.data.msg
      if (code == 1001) {
          if (judgeIsValid(success)) {
            success(data, msg)
          }
      } else if (code === 1004) {
        if (judgeIsValid(noLogin)) {
          noLogin()
        } else {
          wx.navigateTo({
            url: Url.route('wxLogin')
          })
          console.log('wxLogin')
        }
      } else {
        if (judgeIsValid(error)) {
          error(data, msg, code)
        } else {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          });
        }
      }
    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        loading.dismiss()
      }
      if (judgeIsValid(complete)) {
      localFail()
      }
    },
    complete: function (res) {
      if (judgeIsValid(complete)) {
        complete()
      }
    },
  })

}

//判断参数是否有效
function judgeIsValid(params) {
  var isValid = params !== null && typeof (params) !== 'undefined'
  return isValid
}

module.exports = {
  requestPost,
  requestGet
}