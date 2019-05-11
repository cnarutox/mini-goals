// pages/habit/habit.js
var base64 = require("../images/base64");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDate:'4/24',
    habitArray: [
      {
        src: '../images/icon_footer.png',
        txt: 'footer',
        illustrate: 0,
      },
      {
        src: '../images/icon_intro.png',
        txt: 'intro',
        illustrate: 2,
      },
      {
        src: '../images/icon_nav_nav.png',
        txt: 'nav_nav',
        illustrate: 3,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      icon: base64.icon20
    });
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
  gotoHabitClock:function(){
    wx.navigateTo({
      url: '../habit_clock/habit_clock'
    })
  },
  bindTapView: function () {
    wx.navigateTo({
      url: "/pages/nullHabitList/nullHabitList"
    })
  }
})