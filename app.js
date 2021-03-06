//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('aNums', 0)
    this.getOpenID();
    var allCard = ['card1',
      'card2',
      'card3',
      'card4',
      'card5',
      'card6',
      'card7',
      'card8'];
    wx.setStorageSync("allCard", allCard);
    // this.bindback();
  },
  //获取openId
  getOpenID:function(){
    console.log("getOpenId");
    wx.login({
      success: res => {
        //console.log(res.code);
        var that = this;
        wx.request({
          url: 'https://www.yuebaoyuan.com.cn/wx/public/index.php/apii/getOpenId',
          method: 'POST',
          data: {
            'code': res.code
          },
          success: function (data) {
            if(data.data.state == 200){
              wx.setStorageSync('openId', data.data.openId);
              wx.setStorageSync('id', data.data.id);
              wx.login({
                success: function (res) {
                  var openId = wx.getStorageSync('openId');
                  console.log(openId);
                  wx.request({
                    url: 'https://www.yuebaoyuan.com.cn/wx/public/index.php/apii/initNum',
                    method: 'POST',
                    data: {
                      'openId': openId
                    },
                    success: function (data) {
                      if (data.data.state != 200) {
                        wx.showToast({
                          title: '系统异常，请退出重新进入',
                          icon: 'none',
                          duration: 3000
                        });
                      }
                    }
                  })
                }
              });
            }else{
              that.aaa();
            }
          },
          fail: function(){
            wx.showToast({
              title: '网络错误，请退出重新登录',
              icon: 'none',
              duration: 3000
            });
          }
        })
      }
    });
    
  },
  aaa:function(){
    this.getOpenID();
  },
  //初始化次数
  initNum: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      
    });
    
  },
  // bindback: function () {
  //   const back = wx.getBackgroundAudioManager();
  //   back.src = "https://*****/My/Uploads/bgm.mp3";
  //   // back.title = "天天音乐";
  //   //back.coverImgUrl = "https://******/My/Uploads/2018-03-29/5abc4ca7903ca.jpg";
  //   back.play();
  //   back.onPlay(() => {
  //     console.log("音乐播放开始");
  //   })
  //   back.onEnded(() => {
  //     console.log("音乐播放结束");
  //   })
  // },
  globalData:{
    userInfo:null
  },
  //非群发回调函数
  notMass:function(){
    // console.log(222);
    //弹框
    wx.showToast({
      title: '不是群发没有次数',
      icon: 'none',
      duration: 3000
    });
  },
  //转发成功回调方法
  success:function(app){
    console.log("转发成功");
    //发送红包
    console.log(app.globalData.userInfo);
    wx.getSetting({
      success: (response) => {
        wx.login({
          success: function (res) {
            console.log("code");
            console.log(res.code);
            wx.request({
              url: 'https://www.yuebaoyuan.com.cn/wx/public/index.php/apii/getPartakeNum',
              method: 'POST',
              data: {
                'code': res.code
              },
              success: function (data) {
                //弹窗，根据data提示游戏红包获得次数+1
                if (data.data.state == 200) {
                  //resolve(data.data);
                  wx.showToast({
                    title: data.data.mes,
                    icon: 'none',
                    duration: 3000
                  });
                } 
              }
            })
          }
        });
      }
    })
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });
  },
  //转发失败回调方法
  fail:function(){
    console.log("分享失败");
    //弹框
    wx.showToast({
      title: '分享失败',
      icon: 'none',
      duration: 3000
    });
  }
})