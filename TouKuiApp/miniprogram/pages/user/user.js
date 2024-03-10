// pages/user/user.js
var app=getApp()
Page({
  data: {
    pre:app.globalData.pre,
    qianm: "个性签名~",
    userinfo: [],
    id: ""
  },
  
  onShow() {
    let self = this;
    wx.getStorage({
      key: 'id',
      success: function (res) {
        if (res.data) {
          self.setData({
            id: res.data
          })
          self.getUserInfo();
        } else {
          // 缓存中没有数据的情况下的处理逻辑
          console.log('缓存中没有数据');
          self.setData({
            userinfo: []
          })
        }
      },
      fail: function (err) {
        console.log('获取缓存失败', err);
        self.setData({
          userinfo: []
        })
      }
    });
  },
  getUserInfo() {
    console.log(1);
    console.log(this.data.id);
    if (this.data.id) {
      wx.request({
        url: this.data.pre + '/getuserinfo?id=' + this.data.id,
        method: 'GET',
        success: (res) => {
          console.log(res);
          this.setData({
            userinfo: res.data.data
          })
        }
      })
    } else {
      self.setData({
        userinfo: []
      })
    }
  },
  godenglu() {
    wx.navigateTo({
      url: '/pages/Login/Login',
    });
  },
  goSet() {
    wx.navigateTo({
      url: '/pages/Set/Set',
      animationType: 'pop-in',
      animationDuration: 200
    });
  }
})