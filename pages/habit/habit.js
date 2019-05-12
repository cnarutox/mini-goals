// pages/habit/habit.js
var base64 = require("../images/base64");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDate:'4/24',
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
   */
  onLoad: function (options) {
    this.setData({
      icon: base64.icon20
    });
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
  bindTapView: function () {
    wx.navigateTo({
      url: "/pages/nullHabitList/nullHabitList"
    })
  },

  handleLongPress: function() {
    console.log("長按");
    wx.showActionSheet({
      itemList: ['删除习惯','归档习惯','修改习惯'],
      success: function(res){
        console.log(res.tapIndex);
        switch(res.tapIndex){
          case 0:
            console.log("删除习惯");
            wx.showModal({
              title: '删除习惯',
              content: '删除习惯后，该习惯的历史记录会被清空，你确定删除？',
              cancleText: '取消',
              cancelColor: '#000000',
              confirmText: '删除',
              confirmColor: '#576B95',
              success: function(res){
                if(res.cancel){
                  console.log("cancel")
                }
                else if(res.confirm){
                  console.log('confirm')
                }
              }
            })
            break;
          case 1:
            console.log("归档习惯");
            break;
          case 2:
            console.log("修改习惯");
            break;
          default:
            console.log("default");
        }
      },
      fail: function(res){
        console.log(res.errMsg)
      }
    })
  },

  addHabit: function(){
    console.log("addHabit");
  }
})