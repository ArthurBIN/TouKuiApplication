// pages/control/control.js
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
Page({
  data: {
    isRotated: false,
    isLight: false,
    isNoise: false,
    isAmbient: false,
    ismute: false,
    isDisturb: false,
    elNum: 70,
    volume: 0,
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `当前值：${event.detail}`
    });
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
  },
  Noise() {
    wx.vibrateShort({
      success:(res)=> {
        if (!this.data.isNoise) {
          this.setData({
            isNoise: true
          });
          Notify({
            text: '降噪模式开启',
            duration: 1000,
            backgroundColor: '#58BE6A'
          });
        } else {
          this.setData({
            isNoise: false
          });
          Notify({
            text: '降噪模式关闭',
            duration: 1000,
            backgroundColor: '#DA3130'
          });
        }
      }
    })
  },
  Disturb() {
    wx.vibrateShort({
      success:(res)=> {
        if (!this.data.isDisturb) {
          this.setData({
            isDisturb: true
          });
          Notify({
            text: '勿扰模式开启',
            duration: 1000,
            backgroundColor: '#5755C0'
          });
        } else {
          this.setData({
            isDisturb: false
          });
          Notify({
            text: '勿扰模式关闭',
            duration: 1000,
            backgroundColor: '#DA3130'
          });
        }
      }
    })
  },
  mute() {
    wx.vibrateShort({
      success:(res)=> {
        if (!this.data.ismute) {
          this.setData({
            ismute: true
          });
          Notify({
            text: '已静音',
            duration: 1000,
            backgroundColor: '#58BE6A'
          });
        } else {
          this.setData({
            ismute: false
          });
          Notify({
            text: '静音关闭',
            duration: 1000,
            backgroundColor: '#DA3130'
          });
        }
      }
    })
  },
  Ambient() {
    wx.vibrateShort({
      success:(res)=> {
        if (!this.data.isAmbient) {
          this.setData({
            isAmbient: true
          });
          Notify({
            text: '环境声模式开启',
            duration: 1000,
            backgroundColor: '#58BE6A'
          });
        } else {
          this.setData({
            isAmbient: false
          });
          Notify({
            text: '环境声模式关闭',
            duration: 1000,
            backgroundColor: '#DA3130'
          });
        }
      }
    })
  },
  downVolume() {
    wx.vibrateShort({
      success:(res)=> {
        if (this.data.volume > 0) {
          this.setData({
            volume: this.data.volume - 10
          });
        } else {
          wx.showToast({
            title: '已静音',
            image: "../../static/images/!.png",
            duration: 2000
          });
        }
      }
    })
  },
  upVolume() {
    wx.vibrateShort({
      success:(res)=> {
        if (this.data.volume < 100) {
          this.setData({
            volume: this.data.volume + 10
          });
        } else {
          wx.showToast({
            title: '音量已达最大',
            image: "../../static/images/!.png",
            duration: 2000
          });
        }
      }
    })
  }

})