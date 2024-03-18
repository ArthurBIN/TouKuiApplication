// pages/control/control.js
Page({

  data: {
    isRotated: false,
    isLight: false,
    elNum: 70
  },
  rotateBox: function() {
    wx.vibrateShort({
      success:(res)=> {
        if (!this.data.isRotated) {
          this.setData({
            isRotated: true
          });
        } else {
          this.setData({
            isRotated: false
          });
        }
      }
    })
    
  },
  Light() {
    wx.vibrateShort({
      success:(res)=> {
        if (!this.data.isLight) {
          this.setData({
            isLight: true
          });
        } else {
          this.setData({
            isLight: false
          });
        }
      }
    })
  }

})