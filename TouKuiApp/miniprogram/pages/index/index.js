Page({
  data: {
    swiperList: [
      {"bgi": "https://img.zcool.cn/community/01bbb1592d29b7b5b3086ed458a806.jpg@1280w_1l_2o_100sh.jpg", "text": "MasTer S", "text2": "高性能全智能", "tag1": "安全+科技", "tag2": "续航时长10h+"},
      {"bgi": "https://tse2-mm.cn.bing.net/th/id/OIP-C.nhasLy5bOHeMklBtT-j22gHaL2?rs=1&pid=ImgDetMain", "text": "MasTer F", "text2": "安全旗舰", "tag1": "主动+被动安全", "tag2": "续航时长15h+"},
      {"bgi": "https://pic2.zhimg.com/50/v2-94adf9fbb461f950558028199a2c519a_hd.jpg?source=1940ef5c", "text": "MasTer P", "text2": "安全先锋", "tag1": "重量仅1.2kg", "tag2": "续航时长17h+"},
    ],
    indicatorDots: true,
    interval: 5000,
    duration: 500,
    currentIndex: 0,
    swiperItemList: []
  },
  onLoad() {
    this.setData({
      swiperItemList: this.data.swiperList[0]
    })
  },
  getCurrentItem(i) {
    return this.data.swiperList[i];
  },
  swiperChange(e) {
    console.log('Current Item:', this.getCurrentItem(e.detail.current));
    this.setData({
      swiperItemList: this.getCurrentItem(e.detail.current)
    });
  }
});
