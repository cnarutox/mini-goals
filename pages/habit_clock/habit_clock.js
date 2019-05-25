// pages/habit_clock/habit_clock.js

var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDate: '加载中...',
    todayClicked: false,
    statisticsTag: '坚持情况',
    statisticsIcon: '../images/statistics_icon.png',
    shareButtonLabel: '炫耀一下',
    statisticsButtonLabel: '统计情况',
    habitId: 0,
    weekClock: [
      {
        tag: '一',
        isClock: false
      }, {
        tag: '二',
        isClock: false
      }, {
        tag: '三',
        isClock: false
      }, {
        tag: '四',
        isClock: false
      }, {
        tag: '五',
        isClock: false
      }, {
        tag: '六',
        isClock: false
      }, {
        tag: '七',
        isClock: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log('onLoad,', options)
    var habitid_temp = options.habitId
    var DATE = util.formatTime2(new Date())
    var date = util.formatTime2(new Date())
    var weekday = util.formatTime5(new Date())
    var weekClocked = [1, 0, 0, 1, 0, 0, 0]
    that.setData({
      habitId: habitid_temp,
    })
    wx.request({
      url: "http://localhost/api/habit/getclockin?param=" + habitid_temp + "&date=" + date + "&weekday=" + weekday,
      success: function (res) {
        console.log(res.data)
        var weeks = res.data.weeks
        console.log(weeks)
        for (var i = 0; i < 7; i++) {
          if(weeks[i]==1){
            var clocked = 'weekClock[' + i + '].isClock'
            that.setData({
              [clocked]: true
            })
          }
          
        }
      }
    })
    this.setData({
      curDate: DATE,
      habitId: options.habitId,
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

  gotoHabitClockStatistics: function () {
    wx.navigateTo({
      url: '../habit_clock_statistics/habit_clock_statistics'
    })
  },

  clickHabit: function () {
    var that = this
    var weekday = util.formatTime5(new Date())-1
    var date = util.formatTime2(new Date())
    var clocked = 'weekClock[' +weekday + '].isClock'
    var weekday = util.formatTime5(new Date())
    this.setData({
      todayClicked: true,
      [clocked]: true,
    })
    console.log(that.data.habitid)
    console.log(weekday)
    wx.request({
      url: "http://localhost/api/habit/clockin?param="+that.data.habitId+"&date="+date,
      success: function(res){
        if(res){
          console.log(res)
        }
      }
    })
  }
})