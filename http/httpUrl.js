//协议
// const requestHead = "http://"
// const baseUrl = requestHead + "localhost/"
// const uploadUrl = requestHead + "localhost/"

const requestHead = "https://"
const baseUrl = requestHead + "www.spacetime.ltd/spacetime"
const uploadUrl = requestHead + ""

// const requestHead = "https://"
// const baseUrl = requestHead + "yqw.gomaster.cn/"
// const uploadUrl = requestHead + "yqw.gomaster.cn/"

// const wsUrl = "ws://localhost:2346"
const wsUrl = "wss://yqwdev.gomaster.cn/websocket"

//请求地址类
const url = {
  index: baseUrl + '?c=icourse&a=category_list' //首页]
}

//小程序页面路径
const routeList = {
  index: '/pages/home/index/index',
  parse: '/pages/home/parse/parse',
  goodsDetail: '/pages/home/goodsDetail/goodsDetail',
  comment: '/pages/home/comment/comment',
  store: '/pages/home/masterstore/masterstore',
  cart: '/pages/shoppingCart/index/index',
  mineIndex: '/pages/mine/index/index',
  login: '/pages/mine/login/login',
  wxLogin: '/pages/mine/wxLogin/wxLogin',
  chooseAddress: '/pages/home/chooseAddress/chooseAddress',
  verification: '/pages/mine/verification/verification',
  search: '/pages/home/search/search',
  addAddress: '/pages/mine/addAddress/addAddress',
  coupon: '/pages/mine/coupon/coupon',
  collection: '/pages/mine/collection/collection',
  goods: '/pages/mine/goods/goods',
  searchMine: '/pages/mine/search/search',
  service: '/pages/mine/refund/service',
  evaluate: '/pages/mine/evaluate/evaluate',
  orderList: '/pages/mine/orderList/orderList',
  confirmOrder: '/pages/mine/confirmOrder/confirmOrder',
  logisticsinfo: '/pages/mine/logistics/logisticsinfo',
  logistics: '/pages/mine/logistics/logistics',
  pintuan: '/pages/home/pintuan/pintuan',
  sharePintuan: '/pages/home/pintuan/sharePintuan',
  orderDetail: '/pages/mine/orderDetail/orderDetail',
  kaAlbumDetail: '/pages/mine/kaAlbum/kaAlbumDetail',
  toolActList: '/pages/mine/toolActList/toolActList',
  toolIntoList: '/pages/mine/toolIntoList/toolIntoList',
  toolInto: '/pages/mine/toolInto/toolInto',
  bargain: '/pages/home/bargain/bargain',
  cutPrice: '/pages/home/cutPrice/cutPrice',
  masterHome: '/pages/master/masterHome/masterHome',
  springFestival: '/pages/home/springFestival/springFestival',
  bossPage: '/pages/home/boss-page/boss-page',
  giftConfirm: '/pages/gift/giftConfirm/giftConfirm',
  giftReceive: '/pages/gift/giftReceive/giftReceive',
  giftSuccess: '/pages/gift/giftSuccess/giftSuccess',
  giftList: '/pages/gift/giftList/giftList',
  valentineIndex: '/pages/act/pages/valentine/index/index',
  valentineLanding: '/pages/act/pages/valentine/landing/landing',
  procedure: '/pages/act/pages/hrSalon/procedure/procedure',
  offlineCode: '/pages/mine/offlineCode/offlineCode',
  toolIntoInfo: '/pages/mine/toolIntoInfo/toolIntoInfo',
  survey: '/pages/act/pages/offline/survey/survey',
  nationalDayAnswer: '/pages/act2/pages/nationalDay/answer/answer',
  developer: '/pages/mine/developer/developer',
  offlineOrderTodayData: '/pages/mine/offlineOrderTodayData/offlineOrderTodayData',
  channel: '/pages/channel/index/index',
  provide: '/pages/channel/provide/provide',
  candidate: '/pages/channel/candidate/candidate',
  nationalDayIndex: '/pages/act2/pages/nationalDay/index/index',
  lowerLevelCouponList: '/pages/channel/lowerLevelCouponList/lowerLevelCouponList',
  web: '/pages/home/web/web',
  gradeItemList: '/pages/collecting/gradeItemList/gradeItemList',                           gradeItemConfirmOrder:'/pages/collecting/gradeItemConfirmOrder/gradeItemConfirmOrder',
  cardList: '/pages/collecting/cardList/cardList',
  hrCardsItems: '/pages/collecting/hrCardsItems/hrCardsItems',
  offlinInventory:'/pages/mine/offlinInventory/offlinInventory',
  inventorysList:'/pages/mine/inventorysList/inventorysList',
  inventory:'/pages/mine/inventory/inventory',
  inventoryInfo:'/pages/mine/inventoryInfo/inventoryInfo',
  livePlay: '/pages/live/pages/live/play/play',
  livePush: '/pages/live/pages/live/push/push',
  playCountdown: '/pages/live/pages/live/playCountdown/playCountdown',
  playSetting: '/pages/live/pages/live/playSetting/playSetting',
}

//小程序路由生成函数
function route(route_key, params) {
  var url = routeList[route_key]
  if (params !== null && typeof(params) !== 'undefined') {
    var i = 0
    for (var k in params) {
      if (i > 0) {
        url += "&"
      } else {
        url += "?"
      }
      url += k + '=' + params[k]
      i++
    }
  }
  return url
}

module.exports = {
  url,
  baseUrl,
  uploadUrl,
  wsUrl,
  route
}