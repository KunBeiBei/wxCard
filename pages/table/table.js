var app = getApp();
Page({
  data: {
    // text:"这是一个页面"
    array: ["请选择","安徽农业大学", "安徽大学", "安徽工业大学", "安徽工程大学","江南大学","南京林业大学","南京邮电大学","南京理工大学"],
    index:0,
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    e: ''
    //index: 0
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  //提交确认回调函数
  confirm_one: function (e) {
    var that = this;
    var formData = this.data.e.detail.value;
    console.log(formData);
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (formData.name == "" || formData.school == "请选择" || formData.phone == "" || formData.profession == "" || formData.phone.length != 11 || !myreg.test(formData.phone)){
      //
      wx.showToast({
        title: '信息有误',
        icon: 'none',
        duration: 3000
      });
      
    }else{
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://www.yuebaoyuan.com.cn/wx/public/index.php/apii/getInfo',
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              'code':res.code,
              'formData': formData
            },
            success: function (res) {
              console.log(res.data);
              if(res.data.success == 1){
                that.setData({
                  modalHidden: true,
                  toast1Hidden: false,
                  notice_str: '提交成功'
                });
                wx.showToast({
                  title: '游戏次数+1',
                  icon: 'none',
                  duration: 3000
                });
                wx.reLaunch({
                  url: '../index/index'
                })
              }else{
                that.setData({
                  modalHidden: true,
                  toast1Hidden: false,
                  notice_str: '信息有误'
                });
              }
            }
          })
        }
      })
    }
  },
  
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });

  },
  //弹出提示框
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    app.getOpenID();
    wx.showToast({
      title: '请填表进行操作',
      icon: 'none',
      duration: 1000
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  formSubmit: function (e) {
    this.setData({
      modalHidden: false,
      e:e
    })
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
})

