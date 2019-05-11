// pages/habit/habit.js
var base64 = require("../images/base64");
Page({

  /**
   */
  data: {
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
   * 需要添加加载该用户习惯列表的实现
   */
  onLoad: function (options) {
    // var that = this
    // wx.request({
    //   url: "http://localhost/habit-list/get-user-habit",
    //   success: function(res){
    //     console.log(res.statusCode)
    //     if(res.statusCode == 200){
    //       that.setData({
    //         habitArray: res.data.habits
    //       })
    //     }
    //   }
    // })
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

  /**
 * 点击添加习惯
 */
  addHabit: function () {

  },

  bindTapView: function() {
   wx.navigateTo({
     url: "/pages/nullHabitList/nullHabitList"
   }) 
  }
})