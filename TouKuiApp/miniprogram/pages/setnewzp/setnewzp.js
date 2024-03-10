// pages/setnewzp/setnewzp.js
var app = getApp()
Page({
  data: {
    pre:app.globalData.pre,
    id: "",
    addImg: "",
    zptext: "",
    zpcontent: ""
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
        } else {
          console.log('缓存中没有数据');
        }
      },
      fail: function (err) {
        console.log('获取缓存失败', err);
      }
    });
  },
  textinput(e) {
    this.setData({
      zptext: e.detail.value
    })
  },
  contentinput(e) {
    this.setData({
      zpcontent: e.detail.value
    })
  },
  postImg() {
    wx.chooseImage({
      count: 1, // 选择一张图片
      success: (res) => {
        // 选择图片成功后，将图片路径设置到盒子中
        var tempFilePaths = res.tempFilePaths;
        // 将图片路径设置到盒子中
        this.setData({
          addImg: tempFilePaths[0]
        });
      }
    })
  },
  postAll() {
    wx.uploadFile({
      url: this.data.pre + '/setzp',
      filePath: this.data.addImg,
      name: 'file',
      formData: {
        'id': this.data.id,
        'title': this.data.zptext,
        'content': this.data.zpcontent
      },
      success: (res) => {
        var fanhui = JSON.parse(res.data);
        console.log(fanhui.code);
        
          if(fanhui.code === 0) {
            setTimeout(function () {
              wx.switchTab({
                url: '../find/find',
              })
            }, 500);
            wx.showToast({
              title: '发布成功！',
              duration: 500
            });
          } else {
            console.log(res);
            wx.showToast({
              title: '发布失败！',
              duration: 500
            });
          }
      },
      fail: function (res) {
        console.log('图片上传失败', res);
      }
    });
  }
  
})