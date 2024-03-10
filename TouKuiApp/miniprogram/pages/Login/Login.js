// pages/Login/Login.js
var app = getApp()
Page({
  data: {
    pre: app.globalData.pre,
    isSee: true,
    password: "",
    account: ""
  },
  AccInput(e) {
		this.setData({
      account: e.detail.value
    });
  },
  PassInput(e) {
    this.setData({
      password: e.detail.value
    });
  },
  back() {
    wx.navigateBack({
      delta: 1,
      animationType: 'pop-out',
      animationDuration: 200
    });
  },
  changeSee() {
    this.setData({
      isSee: false
    });
  },
  changeSee2() {
    this.setData({
      isSee: true
    });
  },
  register() {
    wx.navigateTo({
      url: '/pages/Register/Register'
    })
  },
  login() {
    const data = {
      account: this.data.account,
      password: this.data.password
    };
		console.log(this.data.account);
		console.log(this.data.password);
    if (!this.data.account) {
      wx.showToast({
        title: '账号未填写',
        image: "../../static/images/!.png",
        duration: 2000
      });
    } else if (!this.data.password) {
      wx.showToast({
        title: '密码未填写',
        image: "../../static/images/!.png",
        duration: 2000
      });
    } else {
      
      wx.request({
        url: this.data.pre + '/login',
        method: 'POST',
        data: data,
        success: (res) => {
          if (res.data.code === 0) {
            console.log(res);
            wx.setStorage({
              key: 'id',
              data: res.data.data,
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: "/pages/user/user"
                  });
                }, 500);
                wx.showToast({
                  title: '登录成功！',
                  duration: 500
                });
              }
            });
          } else {
            console.log(res);
            wx.showToast({
              title: res.data.msg,
              image: "../../static/images/!.png",
              duration: 2000
            });
          }
        },
        fail: (res) => {
          console.error('请求失败', res);
        }
      });
    }
  }
});
