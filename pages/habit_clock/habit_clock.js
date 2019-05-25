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
    var date = util.formatTime2(new Date())
    var weekday = util.formatTime5(new Date())
    this.setData({
      curDate: date,
      habitId: options.habitId,
    })
    console.log('date', date)
    wx.request({
      url: "http://localhost/api/habit/getclockin?param=" + that.data.habitId + "&date=" + date + "&weekday=" + weekday,
      success: function (res) {
        console.log(res.data)
        var weeks = res.data.weeks
        var todayClicked = res.data.todayClicked
        var todaydate = res.data.todaydate
        console.log('weeks', weeks)
        console.log('todayClicked', todayClicked)
        console.log('todaydate', todaydate)
        for (var i = 0; i < 7; i++) {
          if(weeks[i]==1){
            var clocked = 'weekClock[' + i + '].isClock'
            that.setData({
              [clocked]: true
            })
          }
        }
        that.setData({
          todayClicked: res.data.todayClicked
        })
      }
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
    var that = this
    wx.navigateTo({
      url: '../habit_clock_statistics/habit_clock_statistics?habitId='+that.data.habitId
    })
  },

  clickHabit: function () {
    var that = this
    console.log('todatClicked', that.data.todayClicked)
    if(that.data.todayClicked!=true){
      console.log('clickedHabit')
      var weekday = util.formatTime5(new Date()) - 1
      var date = util.formatTime2(new Date())
      var clocked = 'weekClock[' + weekday + '].isClock'
      // var weekday = util.formatTime5(new Date())
      this.setData({
        todayClicked: true,
        [clocked]: true,
      })
      //console.log(that.data.habitid)
      console.log('weekday', weekday)
      wx.request({
        url: "http://localhost/api/habit/clockin?param=" + that.data.habitId + "&date=" + date,
        success: function (res) {
          if (res) {
            console.log(res)
          }
        }
      })
    }
  }
})