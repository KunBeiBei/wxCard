//share.js
var app = getApp();
Page({
  data: {
    id: ''
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
        'openId': openid
      },
      success: function (data) {
        wx.showToast({
          title: data.data.mes,
          icon: 'none',
          duration: 1000
        }),
        setTimeout(function(){
          wx.redirectTo({
            url: '../index/index'
          })
        },1500)
      }
    })
  }
})

