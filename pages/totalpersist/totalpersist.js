// pages/totalpersist/totalpersist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 0,
    navbarTitle: [
      '全部',
      '习惯1',
      '习惯2',
      '习惯3',
    ],
    detailDict: [
      { 
        "name": "已完成",
        "count": 0,
       },
      {
        "name": "未完成",
        "count": 4,
      },
      {
        "name": "坚持中",
        "count": 4,
      },
    ],
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

  onNavBarTap: function(event){
    console.log('onNavBarTap')
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    console.log('navbarTapIndex, ' , navbarTapIndex)
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  }
})