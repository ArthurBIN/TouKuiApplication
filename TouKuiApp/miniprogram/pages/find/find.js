// pages/find/find.js
var app=getApp()
Page({
  data: {
    pre:app.globalData.pre,
    Allzp: [],
    id: "",
    dzList: [],
  },
 
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    });
    // this.getAllZp();
    this.setData({
      Allzp: []
    })
    this.loadData(0, 5);
    wx.getStorage({
      key: 'id',
      success: (res)=> {
        if (res.data) {
          this.setData({
            id: res.data
          })
          this.getdz();
          wx.hideLoading();
        } else {
          console.log('缓存中没有数据');
          this.setData({
            id: "",
            dzList: []
          })
        }
      },
      fail: (err)=> {
        console.log('获取缓存失败', err);
        this.setData({
          id: "",
          dzList: []
        })
        wx.hideLoading();
      }
    });
  },
  onShow: function () {
    let updatedZpid = wx.getStorageSync('updatedZpid');
    let updatedDzNum = wx.getStorageSync('updatedDzNum');
    let updatedCommentNum = wx.getStorageSync('updatedCommentNum');
    this.getdz();
    
    if (updatedZpid !== undefined && updatedDzNum !== undefined && updatedCommentNum !== undefined) {
      let updatedAllzp = this.data.Allzp.map(item => {
        if (item.zpid === parseInt(updatedZpid)) {
          item.zpdz = updatedDzNum;
          item.zppl = updatedCommentNum;
        }
        return item;
      });
  
      this.setData({
        Allzp: updatedAllzp
      });
  
      // 清除本地存储的数据
      wx.removeStorageSync('updatedZpid');
      wx.removeStorageSync('updatedDzNum');
      wx.removeStorageSync('updatedCommentNum');
    }
  },
  
  
  
  onReachBottom: function() {
    let currentCount = this.data.Allzp.length;
    this.loadData(currentCount, 5); // 加载下5条数据
  },
  
  onPullDownRefresh: function () {
    if (this.data.id) {
      this.setData({
        Allzp: []
      })
      this.loadData(0, 5);
      this.getdz();
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        duration: 500
      });
    } else {
      this.setData({
        Allzp: []
      })
      this.loadData(0, 5);
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        duration: 500
      });
    }

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
          } else {
            this.setData({
              dzList: []
            })
          }
        }
      })
    } else {
      this.setData({
        dzList: []
      })
    }
  },
  goSetZp() {
    console.log(this.data.id);
    if(this.data.id) {
      wx.navigateTo({
        url: '../setnewzp/setnewzp',
      })
    } else {
      wx.showToast({
        title: '请您先登录',
        image: "../../static/images/!.png",
        duration: 2000
      });
    }
  },
  goZpitem: function (e) {
    var zpid = e.currentTarget.dataset.zpid;
    if(this.data.id) {
      wx.navigateTo({
        url: '../zpPage/zpPage?id=' + this.data.id + '&zpid=' + zpid,
      })
    } else {
      wx.navigateTo({
        url: '../zpPage/zpPage?zpid=' + zpid,
      })
    }
  },
  HandleDz: function (e) {
    if (this.data.id) {
      var zpid = e.currentTarget.dataset.zpid;
      if (this.data.dzList.includes(zpid.toString())) {
        wx.showToast({
          title: '您已赞过该作品',
          image: "../../static/images/!.png",
          duration: 2000
        });
        return;
      } else {
        const queryParams = `?id=${this.data.id}&zpid=${zpid}`;
        wx.request({
          url: this.data.pre + '/dz' + queryParams,
          method: 'POST',
          success: (res) => {
            if (res.data.code === 0) {
              wx.showToast({
                title: '点赞成功',
                duration: 500
              });
              // 更新点赞成功的作品的点赞数
              let updatedAllzp = this.data.Allzp.map(item => {
                if (item.zpid === zpid) {
                  item.zpdz += 1; // 假设dzNum是点赞数字段
                }
                return item;
              });
              this.setData({
                Allzp: updatedAllzp
              });
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
      }
    } else {
      wx.showToast({
        title: '请您先登录',
        image: "../../static/images/!.png",
        duration: 2000
      });
    }
  },
  
  loadData: function(start, limit) {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: this.data.pre + '/getMore',
      data: {
        start: start,
        limit: limit
      },
      success: function(res) {
        console.log(res);
        if(res.data.code === 0) {
          this.setData({
            Allzp: this.data.Allzp.concat(res.data.data)
          });
        } else {
          console.log(res.data.msg);
        }
        wx.hideLoading();
      }.bind(this)
    });
  },
  getAllZp() {
    wx.request({
      url: this.data.pre + '/getallzp',
      method: 'GET',
        success: (res) => {
          this.setData({
            Allzp: res.data.data
          })
        }
    })
  },
  

})