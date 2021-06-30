var httpRequest = require('./httpRequest.js')
var httpUrl = require('./httpUrl.js')

var Api = {
  index: function(data, message, callback) {
    httpRequest.requestPost(httpUrl.baseUrl + 'v1/index', data, message, callback);
  },
  login: function(data, message, callback) {
    httpRequest.requestPost(httpUrl.baseUrl + '/wxPay/getOpenIdByCode', data, message, callback);
  },

  wxPay: function(data, message, callback) {
    httpRequest.requestPost(httpUrl.baseUrl + '/wxPay/recharge', data, message, callback)
  },

  credit: function (data, message, callback) {
    httpRequest.requestPost(httpUrl.baseUrl + '/credit/queryJson', data, message, callback);
  },
  
}

module.exports = Api; 