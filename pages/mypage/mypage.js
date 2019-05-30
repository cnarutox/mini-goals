// pages/mypage/mypage.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        totalhabit: 0,
        archivehabit: 0,
        unarchivebind: 'navigatetohabitdetail',
        archivebind: 'navigatetoarchive',
        archives: [],
        toView: 'yellow',
        scrollTop: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        console.log('onLoad')
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        }
        wx.request({
          url: getApp().globalData.serverUrl + '/api/habit/gethabitlist?userId=' + app.globalData.userInfo.id,
            success: function(res) {
                console.log(res.data); // 服务器回包信息
                that.setData({
                    totalhabit: res.data.count,
                    archives: res.data.habits,
                    archivehabit: res.data.archivenum,
                });
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
        this.onLoad()
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
    scroll: function(e) {
        console.log(e)
    },
    upper: function(e) {
        console.log('滚动到顶部')
    },
    lower: function(e) {
        console.log('滚动到底部')
    },
    navigatetoarchive: function() {
        wx.navigateTo({
            url: '../archive/archive',
        })
    },
    navigatetohabitdetail: function() {
        wx.navigateTo({
            url: '../habit_clock_details/habit_clock_details'
        })
    }
})