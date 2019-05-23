// pages/customized_habit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    hiddenName: false,
    hiddenWeeks: true,
    hiddenFre: true,  
    hiddenInterval: true,
    hiddenIcon: true,
    
    hiddenShowArea: false,
    hiddenTextArea: true,

    hiddenPersist: true,


    inputVal: "",
    habitName: "请输入你要自定义的习惯",
    cycleSelectType: 0, //1->byWeeks, 2->byFre, 3->byInterval
    weekDaySelected: [0, 0, 0, 0, 0, 0, 0],
    freSelected: 0,
    intervalSelected: 0,
    cycleStored: 0,

    descriptionForHabit: '点此输入你的描述~',

    shareable: false,
    persistenceSharaeble: false,


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
    ],
    colorData: {
      //基础色相，即左侧色盘右上顶点的颜色，由右侧的色相条控制
      hueData: {
        colorStopRed: 255,
        colorStopGreen: 0,
        colorStopBlue: 0,
      },
      //选择点的信息（左侧色盘上的小圆点，即你选择的颜色）
      pickerData: {
        x: 0, //选择点x轴偏移量
        y: 480, //选择点y轴偏移量
        red: 0,
        green: 0,
        blue: 0,
        hex: '#000000'
      },
      //色相控制条的位置
      barY: 0
    },
    rpxRatio: 1 
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
      hiddenName: true,
      habitName: this.data.inputVal
    })
  },


  /**
   * 周期选择单选框
   */
  radioChange(e){
    console.log('radiod发生change事件，携带value值为：', e.detail.value)
    console.log('cycleSelectType: ', this.data.cycleSelectType)
    switch(e.detail.value){
      case "byWeek":
        console.log('weekDaySelected, ', this.data.weekDaySelected)
        if(this.data.cycleSelectType===1){
          this.setData({
            index: 0
          })
        }
        else{
          this.setData({
            weekDaySelected: [0, 0, 0, 0, 0, 0, 0]
          })
        }
        this.setData({
          hiddenWeeks: false,
          hiddenFre: true,
          hiddenInterval: true,
        });
        break;
      case "byFre":
        if(this.data.cycleSelectType===2){
          this.setData({
            index: this.data.freSelected
          })
        }
        else{
          this.setData({
            index: 0
          })
        }
        this.setData({
          hiddenFre: false,
          hiddenWeeks: true,
          hiddenInterval: true,
        })
        break;
      case "byInterval":
        if(this.data.cycleSelectType===3){
          this.setData({
            index: this.data.intervalSelected
          })
        }
        else{
          this.setData({
            index: 0
          })
        }
        this.setData({
          hiddenInterval: false,
          hiddenFre: true,
          hiddenWeeks: true,
        })
        break;
      default:
        console.log("default")
    }
  },

  /**
   * 周期选择按照星期时弹出的复选框
   */
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
   * 周期选择勾选星期后点击确认
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
      freSelected: 0,
      intervalSeleceted: 0,
      index: 0,
    })
  },

  /**
   * 周期选择勾选频率后点击确认
   */
  confirmByFre: function(){
    this.setData({
      hiddenFre: true,
      cycleSelectType: 2,
      cycleStored: this.data.index,
      weekDaySelected: [0, 0, 0, 0, 0, 0, 0],
      freSelected: this.data.index,
      intervalSelected: 0,
      index: 0,
    })
  },

  /**
   * 周期选择勾选间隔后点击确认
   */
  confirmByInterval: function () {
    this.setData({
      hiddenInterval: true,
      cycleSelectType: 3,
      cycleStored: this.data.index,
      weekDaySelected: [0,0,0,0,0,0,0],
      freSelected: 0,
      intervalSelected: this.data.index,
      index: 0,
    })
  },



  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  

  /**
   * Input点击确认
   */
  confirmByText: function(e){
    console.log('confirmByText')
    console.log(e.detail.value)
  },

  /**
   * 监听textarea输入
   */
  watchinput: function(e){
    console.log(e.detail.value)
  },

  textAreaOnBlur: function(e){
    console.log("textAreaOnBlur, ", e.detail.value)
    console.log("textAreaOnBlur.length", e.detail.value.length)
    var toShow = ""
    if(e.detail.value.length>0){
      toShow = e.detail.value
    }
    else{
      toShow = "点这里输入你的描述~"
    }
    this.setData({
      descriptionForHabit: toShow,
      hiddenShowArea: false,
      hiddenTextArea: true,
    })
  },

  tapText: function(){
    console.log('tapText')
    this.setData({
      hiddenShowArea: true,
      hiddenTextArea: false,
    })
  },

  /**
   * 监听textarea输入
   */
  switchChange: function(){
    console.log('switchChange')
    console.log(this.data.hiddenPersist)
    this.setData({
      shareable: !this.data.shareable,
      hiddenPersist: !this.data.hiddenPersist,
    })
  },

  switchPersistChange: function(){
    console.log('switchPersistChange')
    this.setData({
      persistenceShareable: !this.data.persistenceSharaeble
    })
  },

  createSuc: function(){
    var that = this
    wx.showToast({
      title: '成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
    wx.request({
      url: 'http://localhost/api/habit/createhabit',
      method: 'POST',
      header: {'content-type': 'application/json'},
      data:{  
        name: that.data.habitName,
        cycle_type: that.data.cycleSelectType,
      },
      success: function(res){
        console.log(res.data)
      }
    })
  },

  onChangeColor(e) {
    //返回的信息在e.detail.colorData中
    this.setData({
      colorData: e.detail.colorData
    })
  },
  selectIcon: function () {
    this.setData({
      hiddenIcon: !this.data.hiddenIcon,
    })
  },
  /**
 * 图标颜色选择勾选星期后点击确认
 */
  confirmByIcon: function () {
    this.setData({
      hiddenIcon: true,
    })
  }
})