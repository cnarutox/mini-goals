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
    weekClock: [{
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
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoadclock')
    console.log(options)
    var that = this
    wx.getStorage({
      key: 'todayClicked' + options.habitId,
      success: function (res) {
        console.log('getStorage', res.data)
        that.setData({
          todayClicked: res.data
        })
        console.log('成功获取缓存')
      },
    })
    wx.getStorage({
      key: 'weekClock' + options.habitId,
      success: function (res) {
        console.log('getStorage', res.data)
        that.setData({
          weekClock: res.data
        })
      }
    })
    console.log('habit_clock onLoad,', options)
    var date = util.formatTime2(new Date())
    var weekday = util.formatTime5(new Date())
    console.log('weekday: ' + weekday)
    this.setData({
      curDate: date,
      habitId: options.habitId,
    })
    console.log('user_habit,', that.data.habitId)
    wx.request({
      url: getApp().globalData.serverUrl + '/api/habit/weekly-check?user_habit=' + that.data.habitId + "&date=" + date + "&weekday=" + weekday,
      success: function (res) {
        console.log('res.data,', res.data)
        var weeks = res.data.weeks
        // var todayClicked = res.data.todayClicked
        // var todaydate = res.data.todaydate
        // console.log(res.data)
        // console.log('weeks', weeks)
        // console.log('todayClicked', todayClicked)
        // console.log('todaydate', todaydate)
        for (var i = 0; i < 7; i++) {
          var clocked = 'weekClock[' + i + '].isClock'
          if (weeks[i] == 1) {
            that.setData({
              [clocked]: true
            })
          }
          else that.setData({
            [clocked]: false
          })
        }
        that.setData({
          todayClicked: res.data.todayClicked
        })
        wx.setStorage({
          key: 'todayClicked' + options.habitId,
          data: res.data.todayClicked,
        })
        wx.setStorage({
          key: 'weekClock' + options.habitId,
          data: res.data.weeks,
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
      url: '../habit_clock_statistics/habit_clock_statistics?habitId=' + that.data.habitId
    })
  },

  clickHabit: function () {
    var that = this
    if (that.data.todayClicked != true) {
      console.log('todatClicked != true')
      var weekday = util.formatTime5(new Date())-1
      var date = util.formatTime2(new Date())
      var clocked = 'weekClock[' + weekday + '].isClock'
      this.setData({
        todayClicked: true,
        [clocked]: true,
      })
      wx.setStorage({
        key: 'todayClicked' + that.data.habitId,
        data: that.data.todayClicked,
      })
      wx.setStorage({
        key: 'weekClock' + that.data.habitId,
        data: that.data.weekClock,
      })
      console.log('call check')
      console.log(that.data.habitId)
      wx.request({
        url: getApp().globalData.serverUrl + '/api/habit/check',
        method: 'POST',
        header: {'content-type': 'application/json'},
        data: {
          user_habit: that.data.habitId
        },
        success: function (res) {
          if (res.data==1) {
            wx.showToast({
              title: 'success'
            })
          }
        }
      })
    }
  }
})