//share.js
var app = getApp();
Page({
  data: {
    openid: ''
  },
  onLoad: function (res) {
    this.setData({
      openid: res.openid
    })
  }
})

