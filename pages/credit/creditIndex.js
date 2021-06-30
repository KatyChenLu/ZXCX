// pages/credit/creditIndex.js
var Api = require('../../http/api.js');
var Url = require('../../http/httpUrl.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadUrl: Url.uploadUrl,
    payMap:{
      "timeStamp": '1624938556',
      "package": "prepay_id=wx291147493689681bc5c604ca5ae5160000",
      "paySign": "OyRWNaOe7oeNNccSwhjdIVAvNVdOo6sZLEAukGvsC23sFisg8aGveK7O0tpFfj+rwoGMA1QjxAhXWbfW/OD8ASC7t6yqNOljacOesm6q1RluhmwXWNx6NupxvZGo4x+egRKKitm0qF/SsNTfIHM72OjtCx4AxWfmleJ0MMiZ8HnE10wweFd6XMhSb6kHlfG32tNYmnuoeVmwEWMyPryyVsA3e2YUJxUDoZenT8fio9U7T4nWvAx7VqI34OoFnu160h4Yp/7/3+chm6sRF4IOJnEY1UgXAxF3ZQbMhqC9X5cNKGVcNttmePTQmpSbCDMsPO/wJcHLHiaXbJTTfQDbRA==",
      "appId": "wxb770be4752790ff1",
      "signType": "RSA",
      "nonceStr": "ZDQAAR3X3BO3G17I285G0M0275339H62"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bind_input: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var val = e.detail.value;
     if (index == 11) {  //name
      that.setData({ name: val });
    } else if (index == 12) {  //idnumb
      that.setData({ idNumb: val })
    }else if (index == 13) {  //phonenumb
      that.setData({ phoneNumb: val })
    }
  },
  submit: function (e) {
    var that = this;
    //0个人   1单位
      if (!that.data.name || !that.data.idNumb || !that.data.phoneNumb) {
        var msg = !that.data.name ? "请输入姓名" : !that.data.idNumb ? "请输入身份证" :!that.data.phoneNumb ? "请输入手机号": "";
        toast(msg, 'none');
        return;
      }
      wx.setStorageSync('name', that.data.name)
      wx.setStorageSync('idNumb', that.data.idNumb)
      wx.setStorageSync('phoneNumb', that.data.phoneNumb)
    var invoice_info = {
      productId: 'credit_query',
      price: '998',
      tradeType: 'JSAPI',
      openId: that.data.openId
    }
    if (!that.data.flag){
      toast('提交中','loading');
      that.setData({ flag:true })
      Api.wxPay(invoice_info,'',{
        success:function(res,msg){
          toast(res, 'success');
          that.setData({
             flag: false,
             payMap:res.payData
             })
             wx.setStorageSync('orderNo',res.orderNo)
          that.wxPay();
        },
        error:(err,msg)=>{
          toast(msg, 'none');
          that.setData({ flag: false })
        }
      })
    }
  },
  wxPay() {
    var that = this;
    var timeStamp = that.data.payMap
    wx.requestPayment({
      timeStamp: that.data.payMap.timeStamp,
      nonceStr: that.data.payMap.nonceStr,
      package: that.data.payMap.package,
      signType: that.data.payMap.signType,
      paySign: that.data.payMap.paySign,
      // paySign: that.data.paySign,
      success(res) {
        wx.navigateTo({
          url: '/pages/creditInfo/creditInfo',
        })
      },
      fail(err) {
        console.log('微信调取失败---', err)
        wx.navigateTo({
          url: '/pages/creditInfo/creditInfo',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var loginInfo = wx.getStorageSync('loginInfo')
    var openId = wx.getStorageSync('openId')
    if (loginInfo) {
      //登录注册过的
      that.setData({
        openId:openId
      })
      // that.wxPay();
    } else {
      //未登录的先登录
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
function toast(msg, icon) {
  wx.showToast({
    title: msg,
    icon: icon
  })
}