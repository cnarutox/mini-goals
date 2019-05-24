// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    likenum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    console.log('onLoad')
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    wx.request({
      url: 'http://localhost/api/habit/gettotallike',
      success: function (res) {
        console.log(res.data);// 服务器回包信息
        that.setData({
          likenum: res.data
        });
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
 
  navigatetomypage: function () {
    console.log('navigatetomypage')
    wx.navigateTo({
      url: '../mypage/mypage'
    })
  },

  navigatetototalpersist: function () {
    console.log('avigatetototalpersist')
    wx.navigateTo({
      url: '../totalpersist/totalpersist'
    })
  }
})