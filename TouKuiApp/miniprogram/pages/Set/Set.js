// pages/Set/Set.js
Page({
  data: {
    id: ""
  },
  onLoad(options) {
    let self = this;
		  wx.getStorage({
		    key: 'id',
		    success: function (res) {
		      if (res.data) {
		        self.setData({
              id: res.data
            })
		      } else {
		        // 缓存中没有数据的情况下的处理逻辑
            console.log('缓存中没有数据');
            self.setData({
              id: null
            })
		      }
		    },
		    fail: function (err) {
		      console.log('获取缓存失败', err);
		    }
		  });
  },
  Login() {
    wx.navigateTo({
        url: '/pages/Login/Login',
    });
  },
  tuichu() {
    // 清除缓存中的数据
    wx.removeStorage({
      key: 'id',
      success: function (res) {
        setTimeout(function () {
                    wx.switchTab({
                        url: "/pages/user/user"
                    });
                }, 500);
        wx.showToast({
            title: '退出成功！',
            duration: 500
        });
      },
      fail: function (err) {
        console.log('清除缓存失败', err);
      }
    });

  },
  goUserInfo() {
    wx.navigateTo({
      url: '/pages/userInfo/userInfo',
    })
  },
})