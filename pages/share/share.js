//share.js
var app = getApp();
Page({
  data: {
    id: '',
    code: 0
  },
  onLoad: function (res) {
    if (Object.keys(res).length!=0){
      this.setData({
        id: res.id
      })
    }
  },
  zhuli: function(){
    var openid = wx.getStorageSync('openId') 
    wx.request({
      url: 'https://www.yuebaoyuan.com.cn/wx/public/index.php/apii/getPartakeNum',
      method: 'POST',
      data: {
        'id': this.data.id,
        'openid': openid
      },
      success: function (data) {

      }
    })
  }
})

