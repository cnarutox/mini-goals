// pages/habit_clock/habit_clock.js

var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDate: '加载中...',
    clockRightIcon:'../images/clock_right.png',
    clockNullIcon: '../images/clock_null.png',
    statisticsTag:'坚持情况',
    statisticsIcon:'../images/statistics_icon.png',
    shareButtonLabel:'炫耀一下',
    statisticsButtonLabel:'统计情况',
    weekClock:[
      {
        tag:'一',
        isClock:false
      }, {
        tag: '二',
        isClock: false
      }, {
        tag: '三',
        isClock: true
      }, {
        tag: '四',
        isClock: false
      }, {
        tag: '五',
        isClock: true
      }, {
        tag: '六',
        isClock: true
      }, {
        tag: '七',
        isClock: false
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatTime4(new Date())
    this.setData({
      curDate: DATE
    })
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

  gotoHabitClockStatistics:function(){
    wx.navigateTo({
      url: '../habit_clock_statistics/habit_clock_statistics'
    })
  }
})