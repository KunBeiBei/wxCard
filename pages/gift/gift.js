var app = getApp();
Page({
  data: {
    code : ''
  },
  onLoad: function (res) {
    app.getOpenID();
    var that = this
    that.setData({
      code: res.code
    })
  },
  re:function(){
    wx.navigateBack({
      delta: 2
    })
  }
})
