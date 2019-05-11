// pages/habit_clock_statistics/habit_clock_statistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHabitTag:'吃早餐',
    curHabitPercent:'90',
    habitPercentBeginLabel:'你以超过了%&nbsp;&nbsp;',
    habitPercentEndLabel:'&nbsp;&nbsp;的用户',
    dataIcon:'../images/data_icon.png',
    dataTag:'数据统计',
    clockBeginLabel:'打卡',
    clocks:20,
    clockEndLabel:'&nbsp;&nbsp;天',
    likeBeginLabel:'点赞',
    likes: 10,
    likeThis:true,
    likeIcon: '../images/like.png',
    likeThisIcon: '../images/like_this.png'
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
  }
})