// pages/habit_clock_statistics/habit_clock_statistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    habitId: 0,
    curHabitTag:'',
    curHabitPercent:'0',
    habitPercentBeginLabel:'你以超过了&nbsp;&nbsp;',
    habitPercentEndLabel:'&nbsp;&nbsp;%的用户',
    dataIcon:'../images/data_icon.png',
    dataTag:'数据统计',
    clockBeginLabel:'打卡',
    clocks:0,
    clockEndLabel:'&nbsp;&nbsp;天',
    likeBeginLabel:'点赞',
    likes: 0,
    likeThis:true,
    likeIcon: '../images/like.png',
    likeThisIcon: '../images/like_this.png',
    shareButtonLabel: '炫耀一下',
    detailButtonLabel:'打卡详情'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    wx.request({
      url: 'http://localhost/api/habit/gethabitname?param='+options.habitId,
      success: function(res){
        if(res){
          that.setData({
            habitId: options.habitId,
            curHabitTag: res.data.habitname
          })
        }
      }
    })
    wx.request({
      url: 'http://localhost/api/habit/countpersist?param='+options.habitId,
      success: function(res){
        if(res){
          that.setData({
            clocks: res.data.clocks
          })
        }
      }
    })
    wx.request({
      url: 'http://localhost/api/habit/getuserhabitlike?param='+options.habitId,
      success: function(res){
        if(res){
          that.setData({
            likes: res.data.userhabitlike
          })
        }
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

  likeTap:function(){
    if(this.data.likeThis){
      this.likeThisNot()
    }else{
      this.likeThis()
    }
  },
  likeThisNot:function(){
    this.setData({
      likeThis: false,
      likes: this.data.likes-1
    })
  },
  likeThis:function(){
    this.setData({
      likeThis:true,
      likes: this.data.likes + 1
    })
  },
  gotoHabitClockDetails:function(){
    wx.navigateTo({
      url: '../habit_clock_details/habit_clock_details'
    })
  }
})