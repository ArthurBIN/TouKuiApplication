// pages/control/control.js
Page({

  data: {
    isRotated: false
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
    
  }

})