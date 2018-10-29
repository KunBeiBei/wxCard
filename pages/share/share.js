//share.js
var app = getApp();
Page({
  data: {
    id: '',
    h1: 0,
    h2: 0
  },
  onLoad: function (res) {
    app.getOpenID();
    if (Object.keys(res).length!=0){
      this.setData({
        id: res.id
      })
    }
    //适配高度
    var h = wx.getSystemInfoSync().screenHeight
    if(h>=812){
      this.setData({
        h1: 500,
        h2: 620
      })
    }else{
      this.setData({
        h1: 410,
        h2: 520
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

