// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    // pre:"http://10.223.143.49:8080"
    // pre:"http://192.168.1.7:8080"  //基地wifi
    pre: "http://192.168.142.46:8080"
  }
})
