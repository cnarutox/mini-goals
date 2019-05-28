// pages/totalpersist/totalpersist.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navbarActiveIndex: 0,
        navbarTitle: [
            '全部'
        ],
        detailDict: [{
                name: "已归档",
                count: 4,
            },
            {
                name: "坚持中",
                count: 4,
            },
        ],
        //objectId:'',
        days: [],
        signUp: [],
        cur_year: 0,
        cur_month: 0,
        count: 0,
        lastX: 0,
        lastY: 0,
        text: "没有滑动",
        hidden: true,
        notload: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('onLoad')
        var that = this
            //this.setData({objectId: options.objectId});
        const date = new Date()
        const cur_year = date.getFullYear();
        const cur_month = date.getMonth() + 1;
        const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
        this.calculateEmptyGrids(cur_year, cur_month);
        this.calculateDays(cur_year, cur_month);
        this.onGetSignUp();
        this.setData({
            cur_year,
            cur_month,
            weeks_ch
        })
        wx.request({
            url: getApp().globalData.serverUrl + '/api/habit/gethabitlist?userId=' + app.globalData.userInfo.id,
            success(res) {
                if (res) {
                    console.log(res.data)
                    that.setData({
                        navbarTitle: ['全部'].concat(res.data['habits'].map(item => {
                            return item['name']
                        })),
                        ['detailDict[0].count']: res.data.archivenum,
                        ['detailDict[1].count']: res.data.count,
                        notload: true,
                        hidden: false
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    onNavBarTap: function(event) {
        console.log('onNavBarTap')
        let navbarTapIndex = event.currentTarget.dataset.navbarIndex
        console.log('navbarTapIndex, ', navbarTapIndex)
        this.setData({
            navbarActiveIndex: navbarTapIndex
        })
    },

    handleCalendar: function(e) {
        console.log('handleCalendar')
        const handle = e.currentTarget.dataset.handle;
        const cur_year = this.data.cur_year;
        const cur_month = this.data.cur_month;
        if (handle === 'prev') {
            let newMonth = cur_month - 1;
            let newYear = cur_year;
            if (newMonth < 1) {
                newYear = cur_year - 1;
                newMonth = 12;
            }
            this.calculateEmptyGrids(newYear, newMonth);
            this.calculateDays(newYear, newMonth);
            this.onGetSignUp();
            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            })
        } else {
            let newMonth = cur_month + 1;
            let newYear = cur_year;
            if (newMonth > 12) {
                newYear = cur_year + 1;
                newMonth = 1;
            }
            this.calculateEmptyGrids(newYear, newMonth);
            this.calculateDays(newYear, newMonth);
            this.onGetSignUp();
            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            })
        }
    },

    calculateEmptyGrids: function(year, month) {
        var that = this;
        //计算每个月时要清零
        that.setData({ days: [] });
        const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
        if (firstDayOfWeek > 0) {
            for (let i = 0; i < firstDayOfWeek; i++) {
                var isSigned = false
                if (i % 2 === 0) {
                    isSigned = true
                }
                var obj = {
                    date: null,
                    isSign: isSigned
                }
                that.data.days.push(obj);
            }
            this.setData({
                days: that.data.days
            });
            //清空
        } else {
            this.setData({
                days: []
            });
        }
    },

    calculateDays: function(year, month) {
        console.log('calculateDays')
        var that = this;
        const thisMonthDays = this.getThisMonthDays(year, month);
        var max = thisMonthDays;
        var min = 0;
        for (let i = 1; i <= thisMonthDays; i++) {
            var rand = Math.round(Math.random() * (max - min));
            console.log('rand, ', rand)
            var isSigned = false;
            if (i == rand) {
                isSigned = true;
                console.log('isSigned True');
            }
            var obj = {
                date: i,
                isSign: isSigned,
            }
            isSigned = false;
            that.data.days.push(obj);
        }
        this.setData({
            days: that.data.days
        });
    },

    getFirstDayOfWeek: function(year, month) {
        return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },

    getThisMonthDays: function(year, month) {
        return new Date(year, month, 0).getDate()
    },

    onGetSignUp: function() {
        console.log('onGetSignUp')
            // var that = this;
            // var Task_User = Bmob.Object.extend("task_user");
            // var q = new Bmob.Query(Task_User);
            // q.get(that.data.objectId, {
            //   success: function (result) {
            //     that.setData({
            //       signUp: result.get("signUp"),
            //       count: result.get("score")
            //     });
            //     //获取后就判断签到情况
            //     that.onJudgeSign();
            //   },
            //   error: function (object, error) {
            //   }  
            // });
    },

    //匹配判断当月与当月哪些日子签到打卡
    onJudgeSign: function() {
        console.log('onJudgeSign')
            // var that = this;
            // var signs = that.data.signUp;
            // var daysArr = that.data.days;
            // for (var i = 0; i < signs.length; i++) {
            //   var current = new Date(signs[i].date.replace(/-/g, "/"));
            //   var year = current.getFullYear();
            //   var month = current.getMonth() + 1;
            //   var day = current.getDate();
            //   day = parseInt(day);
            //   for (var j = 0; j < daysArr.length; j++) {
            //     //年月日相同并且已打卡
            //     if (year == that.data.cur_year && month == that.data.cur_month && daysArr[j].date == day && signs[i].isSign == "今日已打卡") {
            //       daysArr[j].isSign = true;
            //     }
            //   }
            // }
            // that.setData({ days: daysArr });
    },

    onBindAnimationFinish: function(event) {
        console.log('onBindAnimationFinish')
        this.setData({
            navbarActiveIndex: event.detail.current
        })
    }
})