// pages/Register/Register.js
var app = getApp()

Page({
  data: {
    pre:app.globalData.pre,
    isSee: true,
    password: "",
    password2: "",
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
  PassInput2(e) {
    this.setData({
      password2: e.detail.value
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
  Register() {
    const data = {
        account: this.data.account,
        password: this.data.password
    };

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
  } else if (this.data.password != this.data.password2) {
    wx.showToast({
      title: '两次密码不一致',
      image: "../../static/images/!.png",
      duration: 2000
    });
  } else if (this.data.account && this.data.password) {
    wx.request({
        url: this.data.pre + '/register',
        method: 'POST',
        data: data, // 发送账号和密码信息
        success: (res) => {
            if (res.data.code === 0) {
          wx.setStorage({
                  key: 'account',
                  data: this.account,
                  success: function () {
                setTimeout(function () {
                            wx.navigateTo({
                                    url: "/pages/Login/Login"
                                });
                            }, 500);
                      wx.showToast({
                          title: '注册成功！',
                          duration: 500
                      });
                      
                  }
              });
            } else {
          wx.showToast({
            title: '该账号已存在',
            image: "../../static/images/!.png",
            duration: 2000
          });
        }
        },
        fail: (res) => {
            // 处理请求失败的情况
            console.error('请求失败', res)
        }
    })
  }
},

})