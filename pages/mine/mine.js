// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    likenum: 0,
    totallikeicon: "icon-zanfill",
    persisticon: "icon-jianshen",
    mineicon: "icon-geren",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    if (app.globalData.userInfo) {
      console.log(9999999)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    wx.request({
      url: getApp().globalData.serverUrl + '/api/habit/user-like?openid=' + app.globalData.userInfo.id,
      success: function(res) {
        console.log(res.data); // 服务器回包信息
        that.setData({
          likenum: res.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  navigatetomypage: function() {
    console.log('navigatetomypage')
    wx.navigateTo({
      url: '../mypage/mypage'
    })
  },

  navigatetototalpersist: function() {
    console.log('avigatetototalpersist')
    wx.navigateTo({
      url: '../totalpersist/totalpersist'
    })
  }
})