
//app.js
const serverUrl = 'https://aliyun.alumik.cn:5180';
// const serverUrl = 'http://localhost';
App({
  globalData: {
    serverUrl: serverUrl,
    userInfo: {
      id: 0
    },
    userId: 2,
    taskAddTaskListUrl: serverUrl + '/api/task/add-task-list',
    taskGetTaskListUrl: serverUrl + '/api/task/get-task-list',
    taskAddTaskUrl: serverUrl + '/api/task/add-task',
    taskCompleteTaskUrl: serverUrl + '/api/task/complete-task',
    taskRemoveTaskUrl: serverUrl + '/api/task/remove-task',
    taskRemoveTaskListUrl: serverUrl + '/api/task/remove-task-list',
    taskTaskListUpUrl: serverUrl + '/api/task/task-list-up',
    taskTaskUpUrl: serverUrl + '/api/task/task-up',
  },
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log('获取缓存用户为👇')
        console.log(res.data)
        that.globalData.userInfo = res.data
      },
      fail(res) {
        console.log('未缓存用户')
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.login({
          success(res) {
            if (res.code) {
              // 发起网络请求
              wx.request({
                url: getApp().globalData.serverUrl + '/api/user/login',
                data: {
                  code: res.code
                },
                success(res) {
                  that.globalData.userInfo.id = res.data
                  // console.log('用户id为' + that.globalData.userInfo.id)
                  // 获取用户信息
                  wx.getSetting({
                    success: res => {
                      if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                          success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            res.userInfo.id = that.globalData.userInfo.id
                            if (JSON.stringify(that.globalData.userInfo)
                              != JSON.stringify(res.userInfo)) {
                              that.globalData.userInfo = res.userInfo
                              wx.setStorage({
                                key: 'userInfo',
                                data: that.globalData.userInfo,
                                success(res) {
                                  console.log('成功缓存👇')
                                  console.log(that.globalData.userInfo)
                                }
                              })
                              // console.log(that.globalData.userInfo)
                              wx.request({
                                url: getApp().globalData.serverUrl + '/api/user/update',
                                data: {
                                  id: that.globalData.userInfo.id,
                                  name: that.globalData.userInfo.nickName,
                                  avatar: that.globalData.userInfo.avatarUrl
                                },
                                success(res) {
                                  console.log(res.data)
                                }
                              })
                            } else {
                              console.log('无需更新用户缓存信息')
                            }
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (that.userInfoReadyCallback) {
                              that.userInfoReadyCallback(res)
                            }
                          }
                        })
                      }
                    }
                  })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },

  requestAsync: function (url, data, successFunc, that) {
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && res.data.success) {
          successFunc(res.data.data, that);
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器错误',
          icon: 'none'
        })
      }
    });
  },
  requestSync: function (url, data, successFunc, that) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        // console.log(res);
        if (res.statusCode == 200 && res.data.success) {
          successFunc(res.data.data, that);
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          });
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '服务器错误',
          icon: 'none'
        })
      }
    });
  },
  jsonToObject: function (jsonString) {
    return JSON.parse(jsonString);
  },
  jsonArrayToObjectArray: function (jsonArray) {
    let arr = [];
    for (let i = 0; i < jsonArray.length; i++) {
      let o = this.jsonToObject(jsonArray[i]);
      arr = arr.concat(o);
    }
    return arr;
  },
  request: function (url, data, successFunc, that) {
    wx.request({
      url: url,
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: data,
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          successFunc(res.data, that);
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器错误',
          icon: 'none'
        })
      }
    });
  }
})
