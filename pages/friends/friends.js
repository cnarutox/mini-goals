// pages/friends/friends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumbupicon: "../images/zan.png",
    likeicon: "../images/like.png",
    friendArray:[
      {
        userName: 'Flora',
        icon: 'https://wx.qlogo.cn/mmopen/vi_32/CdhiaPlII2pp1AmfhVjcxkzl6zInhUIiayFx2iabKmRX2mSIoc8pQa2rdwpLCT4C86rrCx0y7z0oczGoJ7f7cIsWQ/132',
        time: '4分钟前',
        habitcolor: 'black',
        habitName: '洗澡澡',
        habitpersist: 9,
        likelist: ['张三','李四','王五','陈戌']
      },
      {
        userName: 'cnarutox',
        icon: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83er7mP5wibqzZ4icO7VDkId75AiaOCEbSVYuqM8eZVIXPsMSN998MHZq6cpLbMaOZ56WPKOTCIPMcF0Bg/132',
        time: '昨天',
        habitcolor: 'yellow',
        habitName: '吃早饭',
        habitpersist: 10,
        likelist: ['1', '2', '3', '4', '1', '2', '3', '4']
      }, 
      {
        userName: 'Flora',
        icon: 'https://wx.qlogo.cn/mmopen/vi_32/CdhiaPlII2pp1AmfhVjcxkzl6zInhUIiayFx2iabKmRX2mSIoc8pQa2rdwpLCT4C86rrCx0y7z0oczGoJ7f7cIsWQ/132',
        time: '2019-5-10',
        habitcolor: 'green',
        habitName: '爱万戌哥',
        habitpersist: 40,
        likelist: ['1', '2', '3', '4']
      },
    ]
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

  }
})