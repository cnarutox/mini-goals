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
    
    cycleSelectType: 0, //1->byWeeks, 2->byFre, 3->byInterval
    weekDaySelected: [0, 0, 0, 0, 0, 0, 0],
    cycleStored: 0, //1->binary, 2->real, 3->real

    array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    index: 0,
    radio_items:[
      {name: 'byWeek', value: '按星期'},
      {name: 'byFre', value: '按频率'},
      {name: 'byInterval', value: '按间隔'},
    ],
    week_items:[
      { name: 1, value: '星期一' },
      { name: 2, value: '星期二' },
      { name: 3, value: '星期三' },
      { name: 4, value: '星期四' },
      { name: 5, value: '星期五' },
      { name: 6, value: '星期六' },
      { name: 7, value: '星期天' }
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
          hiddenWeeks: false,
          hiddenFre: true,
          hiddenIntervals: true,
        });
        break;
      case "byFre":
        this.setData({
          hiddenFre: false,
          hiddenWeeks: true,
          hiddenIntervals: true,
        })
        break;
      case "byInterval":
        this.setData({
          hiddenIntervals: false,
          hiddenFre: true,
          hiddenWeeks: true,
        })
        break;
      default:
        console.log("default")
    }
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var lst = e.detail.value
    console.log('lst, ', lst)
    console.log('length of lst, ', lst.length)
    this.setData({
      weekDaySelected: [0,0,0,0,0,0,0]
    })
    for(var i=0;i<lst.length;i++){
      var idx = parseInt(lst[i])-1
      console.log('idx, ', idx)
      var weekday = 'weekDaySelected['+idx+']'
      var result = 0
      this.setData({
        [weekday] : 1,
      })
    }
    console.log('weekDaySelected, ', this.data.weekDaySelected)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  confirmByWeeks: function(){
    var binResult = this.data.weekDaySelected.join('')
    console.log('binResult, ', binResult)
    var intResult = parseInt(binResult, 2)
    console.log('intResult,', intResult)
    this.setData({
      hiddenWeeks: true,
      cycleSelectType: 1,
      cycleStored: intResult,
    })
  },
  confirmByFre: function(){
    this.setData({
      hiddenFre: true,
      cycleSelectType: 2,
      cycleStored: this.data.index,
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})