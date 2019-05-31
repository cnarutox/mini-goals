// pages/add_habit/add_habit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnNameIndex: [
      '热门',
      '健康',
      '学习',
      '思考',
      '晨间',
      '晚间',
      '有趣',
      '推荐',
    ],
    idx: 0,
    buttonSelectedArray:{
    },
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
    var that = this
    wx.request({
      url: getApp().globalData.serverUrl + '/api/habit/recommendation-index?type=' + 1,
      success: function (res) {
        var habitSeletedTitle = 'buttonSelectedArray.title'
        var habitSeleted = 'buttonSelectedArray.habitArray'
        that.setData({
          [habitSeletedTitle]: '热门',
          [habitSeleted]: res.data,
        })
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

  goIndex: function(e){
    var that = this;
    let btn = e.currentTarget.dataset.text;
    let btnIndex = this.data.btnNameIndex.indexOf(btn) + 1;
    console.log("clicked button ", btn);
    console.log("clicked button index ", btnIndex);
    this.setData({
      idx: btnIndex - 1
    })
    wx.request({
      url: getApp().globalData.serverUrl + '/api/habit/recommendation-index?type='+btnIndex,
      success: function(res){
        var habitSeletedTitle = 'buttonSelectedArray.title'
        var habitSeleted = 'buttonSelectedArray.habitArray'
        that.setData({
          [habitSeletedTitle]: btn,
          [habitSeleted]: res.data,
        })
      }
    })
  },

  addsuccess: function(e){
    var that = this
    console.log("addsuccess")
    console.log("e.currentTarget,", e.currentTarget)
    wx.request({
      url: getApp().globalData.serverUrl + '/api/habit/follow',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: {
        habit: e.currentTarget.dataset.habit,
        openid: app.globalData.userInfo.id,
        share_state: 2
      },
      success: function (res) {
        console.log(res)
        console.log(res.data)
        if (res.data == "") {
          wx.showToast({
            title: '习惯已存在',
            icon: 'none',
            duration: 1000
          })
        }
        else {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      }
    })
    // wx.showToast({
    //   title: "加入习惯成功",
    //   icon: "success",
    //   duration: 2000
    // })
  },

  navigateToCustomized: function(){
    console.log("navigateToCustomized");
    wx.navigateTo({
      url: '/pages/customizedHabit/customizedHabit'
    })
  }
})
