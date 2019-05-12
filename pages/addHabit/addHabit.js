// pages/add_habit/add_habit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnNameIndex: {
      '热门': 0,
      '健康': 1,
      '学习': 2,
      '思考': 3,
      '晨间': 4,
      '晚间': 5,
      '有趣': 6,
      '推荐': 7,
    },
    buttonFirstLine:[
      {
        'title': '热门',
      },
      {
        'title': '健康',
      },
      {
        'title': '学习',
      },
      {
        'title': '思考',
      }
    ],
    buttonSecondLine: [
      {
        'title': '晨间',
      },
      {
        'title': '晚间',
      },
      {
        'title': '有趣',
      },
      {
        'title': '推荐',
      }
    ],
    idx: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  goIndex: function(e){
    let btn = e.currentTarget.dataset.text;
    let btnIndex = this.data.btnNameIndex[btn];
    console.log("clicked button ", btn);
    console.log("clicked button index ", btnIndex);
    this.setData({
      idx: btnIndex
    })
  }
})