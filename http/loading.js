//显示加载框
function show(message){
  wx.showLoading({
    title: message,
  })
}
//隐藏加载框
function dismiss(){
  wx.hideLoading();
}
module.exports={
  show,
  dismiss
}