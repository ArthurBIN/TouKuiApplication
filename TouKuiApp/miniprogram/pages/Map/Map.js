// pages/Map/Map.js
Page({
  data: {
    latitude: 0,   // 纬度
    longitude: 0,  // 经度
  },
  onReady: function () {
    // 页面加载完成后立即获取用户位置
    this.getLocation();
  },
  getLocation: function () {
    let that = this;
    // 获取用户当前的授权设置
    wx.getSetting({
      success: (res) => {
        // 如果用户还没有做出决定，则请求位置权限
        if (res.authSetting['scope.userLocation'] === undefined) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              // 用户同意授权，获取详细位置信息
              that.getDetailedLocation();
            },
            fail: () => {
              // 用户拒绝授权，显示提示弹窗
              that.showLocationSettingModal();
            }
          });
        } else if (res.authSetting['scope.userLocation']) {
          // 用户已经同意授权，直接获取详细位置信息
          that.getDetailedLocation();
        } else {
          // 用户拒绝授权，显示提示弹窗
          that.showLocationSettingModal();
        }
      },
      fail: () => {
        // 处理获取用户设置失败的情况
        console.error('获取用户设置失败');
      }
    });
  },
  showLocationSettingModal: function () {
    // 显示提示弹窗，引导用户打开位置权限设置
    wx.showModal({
      title: '提示',
      content: '需要获取您的地理位置，请手动开启位置权限',
      success: function (res) {
        if (res.confirm) {
          // 用户点击确认，打开设置页面
          wx.openSetting({
            success: (settingRes) => {
              // 如果用户在设置页面同意了位置权限，获取详细位置信息
              if (settingRes.authSetting['scope.userLocation']) {
                that.getDetailedLocation();
              }
            }
          });
        }
      }
    });
  },
  getDetailedLocation: function () {
    // 使用 wx.getLocation 获取用户详细位置信息
    let self = this;
    wx.getLocation({
      type: 'gcj02', // 使用 'gcj02' 以获取中国精确坐标
      success: function (locationRes) {
        // 更新页面数据，使地图中心为用户当前位置
        self.setData({
          latitude: locationRes.latitude,
          longitude: locationRes.longitude
        });
        // 输出位置信息
        console.log('用户位置信息:', locationRes);
      },
      fail: function (locationErr) {
        console.error('获取用户位置失败:', locationErr);
        // 处理错误，例如向用户显示错误消息
      }
    });
  }
});
