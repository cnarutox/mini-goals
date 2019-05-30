// pages/friends/friends.js
var app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumbupdoneicon: "../images/zan_this.png",
    thumbupicon: "../images/zan.png",
    likeicon: "../images/hearts.png",
    friendArray: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log ('onLoad' + app.globalData.userInfo.id)

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
    var that = this
    var date = util.formatTime2(new Date())
    wx.getStorage({
      key: 'friendArray',
      success(res) {
        console.log('获取缓存朋友圈')
        that.setData({
          friendArray: res.data
        })
      }
    })
    wx.request({
      url: getApp().globalData.serverUrl + '/api/friend/moments?userid=' + app.globalData.userInfo.id + "&date=" + date,
      success(res) {
        if (res) {
          that.setData({
            friendArray: res.data
          })
          wx.setStorage({
            key: 'friendArray',
            data: res.data,
          })
        }
      }
    })
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

  thumbuptap(e) {
    // console.log('thumbuptap')
    // console.log('e.currentTarget.dataset', e.currentTarget.dataset)
    var index = e.currentTarget.dataset.index
    var date = util.formatTime2(new Date())
    var userhabitid = e.currentTarget.dataset.userhabit
    var that = this
    // console.log('this.data.friendArray[index].thumbed', this.data.friendArray[index].thumbed)
    // console.log('date', date)
    // console.log('userhabitid', userhabitid)
    // console.log('index', index)
    if (this.data.friendArray[index].thumbed != true) {
      var isthumbed = "friendArray[" + index + "].thumbed"
      var list = "friendArray[" + index + "].likelist"
      var add_str = this.data.friendArray[index].likelist.length !== 0 ? '，' : ''
      // console.log(this.data.friendArray[index].likelist.length, add_str)
      that.setData({
        [isthumbed]: true,
        [list]: that.data.friendArray[index].likelist + add_str + app.globalData.userInfo.nickName
      })
      wx.setStorage({
        key: 'friendArray',
        data: that.data.friendArray,
      })
      wx.request({
        url: getApp().globalData.serverUrl + '/api/friend/thumbup?userid=' + app.globalData.userInfo.id + "&date=" + date + "&userhabit=" + userhabitid,
        success(res) {
          if (res) {
            wx.showToast({
              title: '成功',
            })
            console.log(userhabitid)
          }
        }
      })
    }
  }
})