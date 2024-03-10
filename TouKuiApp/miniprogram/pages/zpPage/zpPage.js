// pages/zpPage/zpPage.js
var app=getApp()
Page({
  data: {
    pre: app.globalData.pre,
    id: "",
    zpid: "",
    zp: [],
    pl: [],
    isShow: true,
    plValue: "",
    ispl: false,
    isFocus: false,
    plcontent: "",
    plNum: 0,
    dzList: [],
    isdz: false
  },
  onUnload: function () {
    // 获取当前作品的 zpid、点赞数和评论数
    let zpid = this.data.zpid;
    let dzNum = this.data.zp.zpdz;
    let commentNum = this.data.plNum;
  
    // 将数据保存到本地缓存中
    wx.setStorageSync('updatedZpid', zpid);
    wx.setStorageSync('updatedDzNum', dzNum);
    wx.setStorageSync('updatedCommentNum', commentNum);
  },
  
  onLoad: function (options) {
    if(options.id) {
      this.setData({
        id: options.id,
        zpid: options.zpid
      })
    } else {
      this.setData({
        id: "",
        zpid: options.zpid
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    this.getZp();
    this.getPl();
    this.getdz();
    wx.hideLoading();
  },
  getdz() {
    if (this.data.id) {
      wx.request({
        url: this.data.pre + '/getdz?id=' + this.data.id,
        method: 'GET',
        success: (res)=> {
          if(res.data.code === 0) {
            this.setData({
              dzList: res.data.data
            })
            if(this.data.dzList.indexOf(this.data.zpid) !== -1) {
              this.setData({
                isdz: true
              })
            } else {
              this.setData({
                isdz: false
              })
            }
          }
        }
      })
    } else {
      this.setData({
        dzList: []
      })
    }
  },
  getZp() {
    if(this.data.zpid) {
      wx.request({
        url: this.data.pre + '/getzpinfo?zpid=' + this.data.zpid,
        method: 'GET',
        success: (res) => {
          this.setData({
            zp: res.data.data
          })
        }
      })
    }
  },
  HandleDz() {
    wx.vibrateShort({
      success:(res)=> {
        if (this.data.id) {
          const queryParams = `?id=${this.data.id}&zpid=${this.data.zpid}`;
          wx.request({
            url: this.data.pre + '/dz' + queryParams,
            method: 'POST',
            success: (res) => {
              if (res.data.code === 0) {
                wx.showToast({
                  title: '点赞成功',
                  duration: 500
                });
                this.getZp();
                this.getdz();
              } else {
                  wx.showToast({
                  title: '点赞失败',
                  duration: 2000
                });
              }
            },
            fail: (res) => {
              // 处理请求失败的情况
              console.error('请求失败', res)
            }
          })
        } else {
          wx.showToast({
            title: '请您先登录',
            image: "../../static/images/!.png",
            duration: 2000
          });
        }
      },
      fail: function() {
        console.log('手机震动失败')
      }
    })
  },
  CancleDz() {
    wx.vibrateShort({
      success:(res)=> {
        if (this.data.id) {
          const queryParams = `?id=${this.data.id}&zpid=${this.data.zpid}`;
          wx.request({
            url: this.data.pre + '/cancledz' + queryParams,
            method: 'POST',
            success: (res) => {
              if (res.data.code === 0) {
                wx.showToast({
                  title: '取消点赞成功',
                  duration: 500
                });
                this.getdz();
                this.getZp();
                this.setData({
                  isdz: false
                })
              } else {
                  wx.showToast({
                  title: '取消点赞失败',
                  duration: 2000
                });
              }
            },
            fail: (res) => {
              // 处理请求失败的情况
              console.error('请求失败', res)
            }
          })
        } else {
          wx.showToast({
            title: '请您先登录',
            image: "../../static/images/!.png",
            duration: 2000
          });
        }
      },
      fail: function() {
        console.log('手机震动失败')
      }
    })
  },
  Handleplcontent(e) {
    this.setData({
      plcontent: e.detail.value
    });
  },
  setPl() {
    const queryParams = `?userid=${this.data.id}&zpid=${this.data.zpid}&content=${this.data.plcontent}`;

    wx.request({
      url: this.data.pre + '/pl' + queryParams,
      method: 'POST',
      success: (res)=> {
        if(res.data.code === 0) {
          this.getPl();
          this.setData({
            ispl: false,
            isFocus: false,
            plcontent: null
          });
        }
      }
    })
  },
  postpl: function (e) {
    if(this.data.id) {
      let focus = e.currentTarget.dataset.focus;
      if (focus) {
        this.setData({
          ispl: true,
          isFocus: true,
        });
      }
    } else {
      wx.showToast({
        title: '请您先登录',
        image: "../../static/images/!.png",
        duration: 2000
      });
    }
  },
  closeinput() {
    this.setData({
      ispl: false,
      isFocus: false,
    });
  },
  getPl() {
    wx.request({
      url: this.data.pre + '/getpl?zpid=' + this.data.zpid,
      method: 'GET',
      success: (res) => {
        if (res.data.data) {
          this.setData({
            pl: res.data.data,
            plNum: res.data.data.length,
            isShow: false
          })
        } else {
            this.setData({
              isShow: true
          })
        }
        
      }
    })
  },
  goBack() {
    wx.switchTab({
      url: '../find/find',
    })
  },
  Motai() {
    wx.previewImage({
      current: 'data:image/jpeg;base64,' + this.data.zp.zpimg, // 当前显示图片的链接
      urls: ['data:image/jpeg;base64,' + this.data.zp.zpimg] // 要预览的图片链接数组
    })
  },
  
  
 
})