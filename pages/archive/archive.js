// pages/archive/archive.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        archivenum: 0,
        archives: [

        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        console.log(options)
        wx.request({
          url: getApp().globalData.serverUrl + '/api/habit/index?openid=' + app.globalData.userInfo.id + '&state=' + 3,
            success: function(res) {
                console.log(res.data); // 服务器回包信息
                that.setData({
                    archives: res.data.habits,
                    archivenum: res.data.archivenum,
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

    bindlongpress: function(e) {
        var that = this
        console.log('bindlongpress')
        var habitid = e.currentTarget.dataset.id
        console.log(habitid)
        wx.showModal({
            title: '恢复坚持习惯',
            content: '恢复坚持习惯后，习惯会重新进入坚持列表继续坚持，确定恢复吗？',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.request({
                        url: getApp().globalData.serverUrl + '/api/habit/unarchive?param=',
                        method: 'POST',
                        header: { 'content-type': 'application/json' },
                        data: {
                          user_habit: habitid,
                        },
                        success: function(res) {
                            that.onLoad()
                            console.log('res.data', res.data)
                        }
                    })

                } else {
                    console.log('用户点击取消')
                }
            }
        })
    },

    navigatedetail: function(e) {
        console.log('navigatedetail')
      var userhabitid = e.currentTarget.dataset.userhabitid;
      console.log('e.currentTarget.dataset.userhabitid', userhabitid)
        wx.navigateTo({
          url: '../archiveDetail/archiveDetail?userhabitId=' + e.currentTarget.dataset.userhabitid + '&habitname=' + e.currentTarget.dataset.habitname + '&persist=' + e.currentTarget.dataset.persist + '&iconfont=' + e.currentTarget.dataset.iconfont + '&color=' +
e.currentTarget.dataset.color + '&colorto=' +
e.currentTarget.dataset.colorto
        })
    }
})