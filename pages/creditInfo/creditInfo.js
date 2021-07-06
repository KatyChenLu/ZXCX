// pages/creditInfo/creditInfo.js
var Api = require('../../http/api.js');
var Url = require('../../http/httpUrl.js');
import localdata from "./creditInfoJson";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadUrl: Url.uploadUrl,
    choosejigouchaxun: 'wx_datad7',
    chooselishijiedai: 'apply_time1',
    choosejigouchaxun_Arr: [],
    chooselishijiedai_Arr: [],

    info: {
      name: 'll',
      phone: '123123123',
      identNumber: 'identNumber',
      orderNo: 'WX20210625152948634'
    },
    risk_list_check_Arr: [ //风险名单
      {
        risk_index: 'virtual_number_base',
        risk_info: '虚拟号码库'
      },
      {
        risk_index: 'riding_break_contract_list',
        risk_info: '故意违章乘车名单'
      },
      {
        risk_index: 'personal_fraud_blacklist',
        risk_info: '特殊关注名单'
      },
      {
        risk_index: 'small_number_base',
        risk_info: '通信小号库'
      },
      {
        risk_index: 'student_loan_arrearage_list',
        risk_info: '助学贷款欠费历史'
      },
      {
        risk_index: 'census_register_hign_risk_area',
        risk_info: '户籍位于高风险集中地区'
      },
      {
        risk_index: 'crime_manhunt_list',
        risk_info: '犯罪通缉名单'
      },
      {
        risk_index: 'court_execute_list',
        risk_info: '法院执行名单'
      },
      {
        risk_index: 'credit_overdue_list',
        risk_info: '信贷逾期名单'
      },
      {
        risk_index: 'owing_taxes_list',
        risk_info: '欠税名单'
      },
      {
        risk_index: 'court_break_faith_list',
        risk_info: '法院失信名单'
      },
      {
        risk_index: 'court_case_list',
        risk_info: '法院结案名单'
      },
      {
        risk_index: 'car_rental_break_contract_list',
        risk_info: '车辆租赁违约名单'
      },
      {
        risk_index: 'owing_taxes_legal_person_list',
        risk_info: '欠税公司法人代表名单'
      },
      {
        risk_index: 'hign_risk_focus_list',
        risk_info: '高风险关注名单'
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var name = wx.getStorageSync('name');
    var phone = wx.getStorageSync('phoneNumb');
    var identNumber = wx.getStorageSync('idNumb');
    var orderNo = wx.getStorageSync('orderNo');
    var info = {
      name: name,
      phone: phone,
      identNumber: identNumber,
      orderNo: orderNo
    }
    // that.setData({
    //   infoData:localdata.infoData.infoData.resp_data,
    //   resp_order:localdata.infoData.infoData.resp_order,
    //   choosejigouchaxun_Arr:localdata.infoData.infoData.resp_data.personal_loan_demand[that.data.choosejigouchaxun],
    //   chooselishijiedai_Arr:localdata.infoData.infoData.resp_data.personal_loan_s[that.data.chooselishijiedai]
    // })
    Api.credit(info, '', {
      success: function (res, msg) {
        that.setData({
          infoData: res.resp_data,
          resp_order: res.resp_order,
          choosejigouchaxun_Arr: res.resp_data.personal_loan_demand[that.data.choosejigouchaxun],
          chooselishijiedai_Arr: res.resp_data.personal_loan_s[that.data.chooselishijiedai],
          timestamp: timestampToTime(res.timestamp)
        })
      },
      error: (err, msg) => {
        
      }
    })
  },
  jigouchaxunTap(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      choosejigouchaxun: index,
      choosejigouchaxun_Arr: that.data.infoData.personal_loan_demand[index]
    })
  },
  lishijiedaiTap(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      chooselishijiedai: index,
      chooselishijiedai_Arr: that.data.infoData.personal_loan_s[index]
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
function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '年';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
  var D = date.getDate() + '日 ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y+M+D+h+m+s;
}