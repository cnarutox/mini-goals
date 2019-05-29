// pages/add_habit/add_habit.js
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
      title: '热门',
      habitArray: [
        {
          name: '早起',
          type: 0,
          cycle_type: 2,
          cycle_value: 1,
          color: 'yellow',
          description: 0,
        },
        {
          name: '爱万戌哥',
          type: 1,
          cycle_type: 0,
          cycle_value: 1,
          color: 'green',
          description: 33,
        }, 
        {
          name: '背单词',
          type: 0,
          cycle_type: 2,
          cycle_value: 1,
          color: 'blue',
          description: 49,
        },
      ]
    },
    buttonFirstLine:[
      {
        'title': '热门',
        'habitArray': [
          {
            id: 232,
            name: '早起',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'yellow',
            description: 0,
          },
          {
            id: 343,
            name: '爱万戌哥',
            type: 1,
            cycle_type: 0,
            cycle_value: 1,
            color: 'green',
            description: 33,
          }, {
            id: 21,
            name: '背单词',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'blue',
            description: 49,
          },
        ],
      },
      {
        'title': '健康',
        'habitArray': [
          {
            id: 343,
            name: '爱万戌哥',
            type: 1,
            cycle_type: 0,
            cycle_value: 1,
            color: 'green',
            description: 33,
          }, 
          {
            id: 21,
            name: '背单词',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'blue',
            description: 49,
          },
          {
            id: 232,
            name: '早起',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'yellow',
            description: 0,
          },
          {
            id: 343,
            name: '爱万戌哥',
            type: 1,
            cycle_type: 0,
            cycle_value: 1,
            color: 'green',
            description: 33,
          }, 
          {
            id: 21,
            name: '背单词',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'blue',
            description: 49,
          },
        ]
      },
      {
        'title': '学习',
      },
      {
        'title': '思考',
      }
    ],
    buttonSecondLine: [
      {
        'title': '晨间',
        'habitArray': [
          {
            id: 21,
            name: '背单词',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'blue',
            description: 49,
          },
          {
            id: 232,
            name: '早起',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'yellow',
            description: 0,
          },
          {
            id: 343,
            name: '爱万戌哥',
            type: 1,
            cycle_type: 0,
            cycle_value: 1,
            color: 'green',
            description: 33,
          },
          {
            id: 21,
            name: '背单词',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'blue',
            description: 49,
          },
          {
            id: 21,
            name: '背单词',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'blue',
            description: 49,
          },
          {
            id: 232,
            name: '早起',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'yellow',
            description: 0,
          },
          {
            id: 343,
            name: '爱万戌哥',
            type: 1,
            cycle_type: 0,
            cycle_value: 1,
            color: 'green',
            description: 33,
          },
          {
            id: 21,
            name: '背单词',
            type: 0,
            cycle_type: 2,
            cycle_value: 1,
            color: 'blue',
            description: 49,
          },
        ]
      },
      {
        'title': '晚间',
      },
      {
        'title': '有趣',
      },
      {
        'title': '推荐',
      }
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
      url: "http://localhost/api/habit/getrecommendation?recid="+btnIndex,
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

  addsuccess: function(){
    console.log("addsuccess")
    wx.showToast({
      title: "加入习惯成功",
      icon: "success",
      duration: 2000
    })
  },

  navigateToCustomized: function(){
    console.log("navigateToCustomized");
    wx.navigateTo({
      url: '/pages/customizedHabit/customizedHabit'
    })
  }
})
