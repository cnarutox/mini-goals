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
    hiddenInterval: true,
    hiddenIcon: true,
    
    cycleSelectType: 0, //1->byWeeks, 2->byFre, 3->byInterval
    weekDaySelected: [0, 0, 0, 0, 0, 0, 0],
    freSelected: 0,
    intervalSelected: 0,
    cycleStored: 0, //1->binary, 2->real, 3->real

    iconSelected:{
      type: 'cancel',
      color: '',
      size: 25,
    },

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
    icon_items: [
      { 
        name: '1', 
        value: {
          type: 'success',
          color: 'red',
          size: 25,
        } 
      },
      {
        name: '2',
        value: {
          type: 'success',
          color: 'yellow',
          size: 25,
        }
      },
      {
        name: '3',
        value: {
          type: 'success',
          color: 'orange',
          size: 25,
        }
      },
      {
        name: '4',
        value: {
          type: 'success',
          color: 'blue',
          size: 25,
        }
      },
      {
        name: '5',
        value: {
          type: 'success',
          color: 'rgb(0,255,255)',
          size: 25,
        }
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

  /**
   * icon选择单选框
   */
  iconRadioChange(e){
    console.log('icon radiod发生change事件，携带value值为：', e.detail.value)
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
   * 图标选择勾选图标
   */
  checkboxChangeIcon(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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

  /**
   * 周期选择勾选星期后点击确认
   */
  confirmByIcon: function () {
    
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  selectIcon: function(){
    this.setData({
      hiddenIcon: !this.data.hiddenIcon,
    })
  }
})