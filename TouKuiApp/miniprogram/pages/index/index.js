Page({
  data: {
    swiperList: [
      {"bgi": "../../static/images/tkindex1.png", "text": "MasTer F", "text2": "安全旗舰", "tag1": "主动+被动安全", "tag2": "续航时长15h+"},
      {"bgi": "../../static/images/tkindex2.png", "text": "MasTer S", "text2": "高性能全智能", "tag1": "安全+科技", "tag2": "续航时长10h+"},
      {"bgi": "../../static/images/tkindex3.png", "text": "MasTer P", "text2": "安全先锋", "tag1": "重量仅1.2kg", "tag2": "续航时长17h+"},
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
    this.setData({
      swiperItemList: this.getCurrentItem(e.detail.current)
    });
  }
});
