// pages/customized_habit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    hiddenName: false,
    hiddenWeeks: true,
    hiddenFre: true,  
    hiddenIntervals: true,

    selectPerson: true,
    firstPerson: '个人',
    selectArea: false,

    radio_items:[
      {name: 'byWeek', value: '按星期'},
      {name: 'byFre', value: '按频率'},
      {name: 'byInterval', value: '按间隔'},
    ],
    week_items:[
      { name: 'Mon', value: '星期一' },
      { name: 'Tue', value: '星期二' },
      { name: 'Wed', value: '星期三' },
      { name: 'Thus', value: '星期四' },
      { name: 'Fri', value: '星期五' },
      { name: 'Sat', value: '星期六' },
      { name: 'Sun', value: '星期天' }
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

  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      hiddenName: false,
      inputVal: e.detail.value
    });
  },
  establish: function(){
    this.setData({
      hiddenName: true
    })
  },
  radioChange(e){
    console.log('radiod发生change事件，携带value值为：', e.detail.value)
    switch(e.detail.value){
      case "byWeek":
        this.setData({
          hiddenWeeks: false
        });
        break;
      case "byFre":
        this.setData({
        })
        break;
      case "byInterval":
        this.setData({

        })
        break;
      default:
        console.log("default")
    }
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },


  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  //点击切换
  mySelect: function (e) {
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
    })
  },
})