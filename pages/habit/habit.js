// pages/habit/habit.js
var base64 = require("../images/base64");
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        habitArray: [],
        src: '../images/nullhabitlist.png'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.request({
            url: 'http://localhost/api/habit/gethabitlist?userId=' + app.globalData.userInfo.id,
            success: function(res) {
                console.log('habit onLoad: ' + res.data); // 服务器回包信息
                that.setData({
                    habitArray: res.data.habits
                });
            }
        })
        this.setData({
            icon: base64.icon20
        });
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
    bindTapView: function() {
        wx.navigateTo({
            url: "/pages/nullHabitList/nullHabitList"
        })
    },

    handleLongPress: function(e) {
        console.log("長按")
        var that = this
        var habitid = e.currentTarget.dataset.id
        wx.showActionSheet({
            itemList: ['删除习惯', '归档习惯', '修改习惯'],
            success: function(res) {
                // console.log(res.tapIndex);
                switch (res.tapIndex) {
                    case 0:
                        // console.log("删除习惯");
                        wx.showModal({
                            title: '删除习惯',
                            content: '删除习惯后，该习惯的历史记录会被清空，你确定删除？',
                            cancleText: '取消',
                            cancelColor: '#000000',
                            confirmText: '删除',
                            confirmColor: '#576B95',
                            success: function(res) {
                                if (res.cancel) {
                                    console.log("cancel")
                                } else if (res.confirm) {
                                    wx.request({
                                        url: "http://localhost/api/habit/delete?param=" + habitid,
                                        success: function(res) {
                                            console.log('delete' + res.data)
                                            that.onLoad()
                                        }
                                    })
                                }
                            }
                        })
                        break;
                    case 1:
                        console.log("归档习惯");
                        wx.request({
                            url: "http://localhost/api/habit/archive?param=" + habitid,
                            success: function(res) {
                                console.log('archive' + res.data)
                                that.onLoad()
                            }
                        })
                        wx.showToast({
                            title: '归档成功，可在个人主页恢复！',
                            icon: 'none',
                            duration: 2000,
                        })
                        break;
                    case 2:
                        console.log("修改习惯");
                        var index = e.currentTarget.dataset.id;
                        // console.log(index);
                        wx.navigateTo({
                            url: '../customizedHabit/customizedHabit'
                        })
                        break;
                    default:
                        // console.log("default");
                }
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })
    },

    addHabit: function() {
        console.log("addHabit");
        wx.navigateTo({
            url: "/pages/addHabit/addHabit"
        })
    }
})