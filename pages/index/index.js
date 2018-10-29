//index.js
//获取应用实例
var app = getApp();
var sto;
Page({
  data: {
    motto: '开始活动',
    userInfo: {},
    welcome: '你好',
    ts: '',
    adverShow: true
  },

  cs: function () {
    wx.redirectTo({
      url: '../table/table'
    })
  },
  //事件处理函数
  onLoad: function () {
    app.getOpenID();
    wx.showShareMenu({
      withShareTicket: true
    });
    console.log('index页面onLoad()')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log("开始授权");
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })    
  },
  onShow: function () {
    console.log("刷新页面");
    this.onLoad();//刷新页面
  },
  startGame: function(e){
    var that = this;
    if (e.detail.userInfo){
    //存放用户信息
    wx.setStorageSync('userInfo', e.detail.rawData);
    this.setUserImage();
        that.getGameNum().then(function (ress) {
          if (ress.success === 3) {//一切正常时
            //判断广告出现过多少次
            var aNums = wx.getStorageSync('aNums')
            if(aNums>=2){//大于2次直接进入
              wx.navigateTo({
                url: '../game/game'
              });
            }else{//小于两次显示广告才进入
              ++aNums
              wx.setStorageSync('aNums', aNums)
              //新增出现广告后再开始游戏
              that.setData({
                adverShow: false
              })
              sto = setTimeout(function () {
                that.setData({
                  adverShow: true
                }),
                  //直接进入游戏
                  wx.navigateTo({
                    url: '../game/game'
                  });
              }, 2000)
            }
          } else if (ress.success === 2) { 
            //分享进游戏
            wx.showToast({
              title: '次数不足，请分享给好友让对方为你助力！',
              icon: 'none',
              duration: 3000
            })
          } else if (ress.success === 1){
            //填表进游戏
            wx.navigateTo({
              url: '../table/table'
            });
          }else{
            //不能进游戏
            wx.showToast({
              title: '今天已超出活动机会，请明天再接再厉！',
              icon: 'none',
              duration: 3000
            });
          }
        });
    }
  },
  viewScore: function (e) {
    var that = this;
    console.log("排名页面跳转判断用户是否登录");
    wx.navigateTo({
      url: '../logs/logs'
    });
    that.setData({
      ts: ''
    });
  },
  adminCenter: function (e) {
    var that = this;
    console.log("中心页面跳转判断用户是否登录");
    if (e.detail.rawData) {
      //存放用户信息
      wx.setStorageSync('userInfo', e.detail.rawData);
      this.setUserImage();
      wx.navigateTo({
        url: '../admin/admin'
      });
      that.setData({
        ts: ''
      })
    }
  },

  //获取游戏次数
  getGameNum: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      var openId = wx.getStorageSync('openId');
      wx.request({
        url: 'https://www.yuebaoyuan.com.cn/wx/public/index.php/apii/getGameNnum',
        method: 'POST',
        data: {
          'openId': openId
        },
        success: function (data) {
          if (data.data.state == 200) {
            resolve(data.data);
          } else {
            reject(data.data);
          }
        }
      })
    });
  },
  setUserImage:function(){
    var userName = wx.getStorageSync('userInfo');
    var openId = wx.getStorageSync('openId');
    wx.request({
      url: 'https://www.yuebaoyuan.com.cn/wx/public/index.php/apii/getUserImage',
      method: 'POST',
      data: {
        'openId': openId,
        'userName': userName
      },
      success: function (data) {
        console.log(data.data);
      }
    })
  },
  onShareAppMessage: function (e) {
    return {
      title: '你萌翻，赢大奖！维尚校招预热，快来领走你的锦鲤！！',
      desc: '你萌翻，赢大奖！维尚校招预热，快来领走你的锦鲤！！',
      imageUrl: '/pages/images/zf.jpg',
      path: 'pages/share/share?id=' + wx.getStorageSync('id')
    }
    app.success(app);
  },
  //打开规则提示
  showRule: function () {
    this.setData({
      isRuleTrue: true
    })
  },
  //关闭规则提示
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },
  //跳转到玩游戏
  toPlayGame: function(){
    clearTimeout(sto),
    this.setData({
      adverShow: true
    }),
    //直接进入游戏
    wx.navigateTo({
      url: '../game/game'
    });
  }
})