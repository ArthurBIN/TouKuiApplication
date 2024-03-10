// pages/userInfo/userInfo.js
var app=getApp()
Page({
  data: {
    pre:app.globalData.pre,
    qianm: "个性签名~",
    userinfo: [],
    id: "",
    show: false,
    show2: false,
    stylist: "",
    stylist2: ""
  },
  changeStyList() {
    this.setData({
      show: true
    })
  },
  changeName() {
    this.setData({
      show2: true
    })
  },
  changeTx() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: this.data.pre + '/usertx',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'id': this.data.id,
          },
          success: (res) => {
            console.log('图片上传成功', res.data);
            this.getUserInfo();
          },
          fail: (res) => {
            console.log('图片上传失败', res);
          }
        });
      }
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  onClose2() {
    this.setData({ show2: false });
  },
  onSelect(event) {
    console.log(event.detail);
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
    if (this.data.id) {
      wx.request({
        url: this.data.pre + '/getuserinfo?id=' + this.data.id,
        method: 'GET',
        success: (res) => {
          console.log(res);
          this.setData({
            userinfo: res.data.data,
            stylist: res.data.data[0].styleList,
            stylist2: res.data.data[0].username
          })
        }
      })
    } else {
      self.setData({
        userinfo: []
      })
    }
  },
  ListInput(e) {
    this.setData({
      stylist: e.detail.value
    });
  },
  ListInput2(e) {
    this.setData({
      stylist2: e.detail.value
    });
  },
  baocun() {
    const queryParams = `?id=${this.data.id}&stylelist=${this.data.stylist}`;

    if (this.data.stylist) {
      console.log(this.data.stylist);
      console.log(this.data.id);
      wx.request({
        url: this.data.pre + '/stylelist' + queryParams,
        method: 'POST',
        success: (res) => {
            if (res.data.code === 0) {
              wx.showToast({
                title: '修改成功',
                duration: 500
              });
              this.getUserInfo();
              this.setData({
                show: false
              })
            } else {
          wx.showToast({
            title: '修改失败',
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
  baocun2() {
    const queryParams = `?id=${this.data.id}&username=${this.data.stylist2}`;

    if (this.data.stylist2) {
      wx.request({
        url: this.data.pre + '/username' + queryParams,
        method: 'POST',
        success: (res) => {
            if (res.data.code === 0) {
              wx.showToast({
                title: '修改成功',
                duration: 500
              });
              this.getUserInfo();
              this.setData({
                show2: false
              })
            } else {
          wx.showToast({
            title: '修改失败',
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
  }

})