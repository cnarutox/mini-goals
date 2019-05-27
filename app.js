//app.js
App({
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
                url: 'http://localhost/api/user/login',
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
                            if (JSON.stringify(that.globalData.userInfo) != JSON.stringify(res.userInfo)) {
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
                                url: 'http://localhost/api/user/update',
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
  globalData: {
    userInfo: {
      id: 0
    }
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