// pages/Map/Map.js
var app = getApp()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  data: {
    pre: app.globalData.pre,
    markersNum: 0,
    id: "",
    latitude: 0,   // 纬度
    longitude: 0,  // 经度
    userlatitude: 0,
    userlongitude: 0,
    markers: [],
    wishLocation: [],
    wishLocationNum: 0,
    foots: [],
    footsNum: 0,
    list: [],
    locations: [],
    isSearch: false,
    SearchValue: "",
    localCity: "全国",
    isLocal: false,
    show: false,
    footshow: false,
    focus: false,
    show2: false,
    show3: false,
    mapsize: 14,
    isLocal: false,
    actions: [],
    actions3:[],
    getmarkerid: 0
  },
  onClose() {
    this.setData({ show2: false });
  },
  onClose3() {
    this.setData({ show3: false });
  },
  onSelect(event) {
    console.log(event.detail);
    const that = this;
    const id = this.data.getmarkerid;
    const data = {
      id: id
    }

    if (event.detail.name === '已完成心愿') {
      wx.request({
        url: this.data.pre + '/addfootprint',
        method: 'POST',
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 设置 content-type
        },
        success: (res) => {
          console.log(res);
          if(res.data.code == 0) {
            wx.showToast({
              title: '已完成！',
              duration: 500
            });
          }
          that.setData({
            show2: false
          })
          that.getUserMarkers(this.data.id)
        }
      })
    } else if (event.detail.name === '删除该标记') {
      const formData = {
        userid: parseInt(this.data.id),
        id: id
      };
      this.deleteMarkerMeth(formData);
    }
  },
  onSelect3(event) {
    const id = this.data.getmarkerid;
    
    if (event.detail.name === '删除该标记') {
      const formData = {
        userid: parseInt(this.data.id),
        id: id
      };
      this.deleteMarkerMeth(formData);
    }
  },

  //逆地址解析当前地址
  reverseGeocoding() {
    this.cancleAdd();
    this.getDetailedLocation();
    console.log(this.data.latitude);
    const latitude = this.data.userlatitude;
    const longitude = this.data.userlongitude;
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1',
      data: {
        location: latitude + ',' + longitude,
        key: 'TQ4BZ-YHACG-JC4QK-QOS37-FGAUF-GIFZ7' 
      },
      success: (res) => {
        console.log(res);
        if (res.data && res.data.result) {
          const address = res.data.result.address;
          const formattedAddress = res.data.result.formatted_addresses.recommend;
  
          // 输出逆地址解析结果
          console.log('经度:', longitude, '纬度:', latitude);
          console.log('推荐地址:', formattedAddress);
          console.log('详细地址:', address);

          Dialog.confirm({
            title: '是否添加该地点至足迹',
            message: formattedAddress
          }).then(() => {
            const data = {
              userid: this.data.id,
              latitude: latitude,
              longitude: longitude,
              iconPath: '../../static/images/zj.png', 
              width: 30,
              height: 30,
              localname: formattedAddress,
              isGone: 1
            };
            wx.request({
              url: this.data.pre + '/addmarker',
              method: 'POST',
              data: data,
              success: (res) => {
                if (res.data.code === 0) {
                  wx.showToast({
                    title: '添加成功！',
                    duration: 500
                  });
                  this.setData({
                    SearchValue: "",
                    isLocal: false
                  })
                  this.getUserMarkers(this.data.id)
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    image: "../../static/images/!.png",
                    duration: 2000
                  });
                }
              },
              fail: (res) => {
                console.error('请求失败', res);
              }
            })
          }).catch(() => {
            // on cancel
          });
          
          // 可以将地址信息保存在data中，或者进行其他操作
        } else {
          console.error('未找到逆地址解析结果');
        }
      },
      fail: (err) => {
        console.error('逆地址解析失败:', err);
      }
    });
  },

  addScale() {
    wx.vibrateShort({
      success:(res)=> {
        if(this.data.mapsize != 20) {
          this.setData({
            mapsize: this.data.mapsize+1
          })
        }
      }
    })
  },
  minusScale() {
    wx.vibrateShort({
      success:(res)=> {
        if(this.data.mapsize != 3) {
          this.setData({
            mapsize: this.data.mapsize-1
          })
        }
      }
    })
  },
  

  //取消搜索
  cancleAdd() {
    wx.vibrateShort({
      success:(res)=> {
        this.getUserMarkers(this.data.id);
        this.setData({
          SearchValue: "",
          isSearch: false,
          isLocal: false
        })
      }
    })
    
  },

  //定位用户当前位置
  getuserlocal() {
    wx.vibrateShort({
      success:(res)=> {
        this.getDetailedLocation();
      }
    })
  },

  //点击地图标记
  markerTap: function(e) {
    var markerid = e.markerId;
    console.log('Marker Id:', markerid);
    this.setData({
      getmarkerid: markerid
    })
    const marker = this.data.markers.find(marker => marker.id === e.markerId);
    if (marker) {
      console.log('Marker Title:', marker.localname);
      console.log(marker.isGone);
      // 在这里可以根据 marker.title 执行相应的逻辑
    }
    if(marker.isGone === 0) {
      this.setData({
        actions: [
          {
            name: marker.localname,
            disabled: true
          },
          {
            name: '已完成心愿'
          },
          {
            name: '删除该标记'
          }
        ],
      })
      this.setData({
        show2: true
      })
    } else if(marker.isGone === 1) {
      this.setData({
        actions3: [
          {
            name: marker.localname,
            disabled: true
          },
          {
            name: '删除该标记'
          }
        ],
      })
      console.log(this.data.actions3);
      this.setData({
        show3: true
      })
    }
  },

  //从缓存中获取用户id
  onShow() {
    let self = this;
    wx.getStorage({
      key: 'id',
      success: function (res) {
        if (res.data) {
          self.setData({
            id: res.data
          })
          self.getUserMarkers(self.data.id);
        } else {
          console.log('缓存中没有数据');
          self.setData({
            markers: []
          })
          
        }
      },
      fail: function (err) {
        console.log('获取缓存失败', err);
        self.setData({
          markers: []
        })
      }
    });
  },
  //删除标记
  deleteMarker(event) {
    const id = event.currentTarget.dataset.id;
    const formData = {
      userid: parseInt(this.data.id),
      id: id
    };
    this.deleteMarkerMeth(formData);
  },   

  //删除标记的方法
  deleteMarkerMeth(formData) {
    const that = this; // 存储正确的 this

Dialog.confirm({
    message: '确认删除该标记吗'
}).then(function() {
    // 发起请求
    wx.request({
        url: that.data.pre + '/deletemarker',
        method: 'POST',
        data: formData,
        header: {
            'content-type': 'application/x-www-form-urlencoded' // 设置 content-type
        },
        success: (res) => {
            console.log(res);
            if (res.data.code === 0) {
                wx.showToast({
                    title: '删除成功！',
                    duration: 500
                });
                that.getUserMarkers(that.data.id); 

                that.setData({
                  show2: false,
                  show3: false
                })
                console.log(1);
            } else {
                wx.showToast({
                    title: res.data.msg,
                    image: "../../static/images/!.png",
                    duration: 2000
                });
            }
        },
        fail: (res) => {
            console.error('请求失败', res);
        }
    });
}).catch(() => {
    // on cancel
});
  },

  closeMarkers() {
    this.setData({ show: false });
  },
  openMarkers() {
    this.setData({
      show: true
    })
  },
  openFoots() {
    this.setData({
      footshow: true
    })
  },
  closeFoots() {
    this.setData({
      footshow: false
    })
  },

  //获取用户标记地点
  getUserMarkers(id) {
    let self = this;
    console.log(id);
    wx.request({
      url: this.data.pre + '/getmarkers?id=' + id,
      method: 'GET',
      success: (res) => {
        if (res.data.code === 0) {
          console.log(res);
          const markers = res.data.data;
          const filteredMarkers = markers.filter(marker => marker.isGone === 0);
          const filteredFoots = markers.filter(marker => marker.isGone === 1);
          const filteredMarkersNum = filteredMarkers.length;
          const filteredFootsNum = filteredFoots.length;
          self.setData({
            markers: markers,
            wishLocation: filteredMarkers,
            foots: filteredFoots,
            wishLocationNum: filteredMarkersNum,
            footsNum: filteredFootsNum
          });
        } else {
          self.setData({
            markers: []
          })
        }
      },
      fail: (res) => {
        console.error('请求失败', res);
      }
    })
  },
  
  //添加标记
  addMarkers: function(event) {
    const data = {
      userid: this.data.id,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      iconPath: '../../static/images/wz2.png', 
      width: 30,
      height: 30,
      localname: this.data.SearchValue
    };
    wx.request({
      url: this.data.pre + '/addmarker',
      method: 'POST',
      data: data,
      success: (res) => {
        if (res.data.code === 0) {
          wx.showToast({
            title: '添加成功！',
            duration: 500
          });
          this.setData({
            SearchValue: "",
            isLocal: false
          })
          this.getUserMarkers(this.data.id)
        } else {
          wx.showToast({
            title: res.data.msg,
            image: "../../static/images/!.png",
            duration: 2000
          });
        }
      },
      fail: (res) => {
        console.error('请求失败', res);
      }
    })
  },

  //关闭搜索框页
  goBack() {
    this.setData({
      isSearch: false
    })
    if(this.data.SearchValue=="") {
      this.setData({
        locations: [],
        mapsize: 14
      })
    }
  },

  //打开搜索框页
  goSearch() {
    this.setData({
      isSearch: true,
      isLocal: false,
      SearchValue: "",
      isLocal: false
    })
    this.getUserMarkers(this.data.id)
    this.setData({
      focus: true
    })
  },

  //点击查找的结果并返回该地点的坐标
  selectLocation: function (e) {
    const index = e.currentTarget.dataset.index;
    const selectedLocation = this.data.locations[index];

    this.setData({
      SearchValue: selectedLocation,
    });
    const keyword = this.data.SearchValue.trim();
    console.log(selectedLocation);
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1',
      data: {
        address: selectedLocation,
        key: 'TQ4BZ-YHACG-JC4QK-QOS37-FGAUF-GIFZ7' // 替换为您申请的地图API密钥
      },
      success: (res) => {
        console.log(res);
        if (res.data && res.data.result) {
          const location = res.data.result.location;
          const latitude = location.lat;
          const longitude = location.lng;
  
          // 输出经纬度信息
          console.log('地名:', selectedLocation, '经度:', longitude, '纬度:', latitude);
          
          //做标记
          let currentMarkers = this.data.markers;
          let newMarker = {
            id: 1,
            latitude: latitude,
            longitude: longitude,
            iconPath: '../../static/images/wz3.png', // 如果需要显示自定义图标，可以设置iconPath
            width: 30,
            height: 30
          };
          currentMarkers.push(newMarker);

          // 可以将经纬度信息保存在data中，或者进行其他操作
          this.setData({
            latitude: latitude,
            longitude: longitude,
            isSearch: false,
            markers: currentMarkers,
            isLocal: true,
            mapsize: 14,
            isLocal: true
          })
          console.log(this.data.mapsize);
        } else {
          console.error('未找到地名对应的经纬度信息');
          wx.showToast({
            title: "未找到该地点坐标！",
            image: "../../static/images/!.png",
            duration: 2000
          });
        }
      },
      fail: (err) => {
        console.error('查询地名失败:', err);
        wx.showToast({
          title: "未找到该地点坐标！",
          image: "../../static/images/!.png",
          duration: 2000
        });
      }
    });
  
    this.getLocall(keyword);
    
  },

  //输入框输入内容
  onInput: function (e) {
    this.setData({
      SearchValue: e.detail.value
    })
    const keyword = this.data.SearchValue.trim();
    this.getLocall(keyword);
  },

  //获取模糊查询后的数据
  getLocall(keyword) {
    if (keyword.length > 0) {
      // 调用微信小程序提供的地理位置服务接口进行查询
      wx.request({
        url: 'https://apis.map.qq.com/ws/place/v1/suggestion',
        data: {
          keyword: keyword,
          region: this.data.localCity,
          key: 'TQ4BZ-YHACG-JC4QK-QOS37-FGAUF-GIFZ7' // 替换为您申请的地图API密钥
        },
        success: (res) => {
          if (res.data && res.data.data) {
            const locations = res.data.data.map((item) => {
              return item.title;
            });
        
            this.setData({
              locations: locations
            });
          } else {
            console.error('查询地名失败: 返回数据格式不正确', res.data);
          }
        },
        fail: (err) => {
          console.error('查询地名失败:', err);
        }
      });
    } else {
      this.setData({
        locations: []
      });
    }
  },

  onReady: function () {
    // 页面加载完成后立即获取用户位置
    this.getLocation();
  },

  //获取用户当前位置
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
        console.log('获取用户设置失败');
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
          longitude: locationRes.longitude,
          userlatitude: locationRes.latitude,
          userlongitude: locationRes.longitude,
          mapsize: 14
        });
        // 输出位置信息
        console.log('用户位置信息:', locationRes);
      },
      fail: function (locationErr) {
        console.log('获取用户位置失败:', locationErr);
        // 处理错误，例如向用户显示错误消息
      }
    });
  }
});
