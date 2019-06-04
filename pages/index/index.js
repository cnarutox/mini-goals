const app = getApp();
Page({
  data: {
    input: '',
    todos: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: true
  },

  // test: function() {
  //     wx.navigateTo({
  //         url: '../demoItemMove/demoItemMove'
  //     })
  // },

  onLoad: function() {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          hasUserInfo: true
        })
      },
      fail(res) {
        that.setData({
          hasUserInfo: false
        })
      }
    })
    let postData = {
      userId: app.globalData.userId
    };
    let op = function(data, that) {
      wx.showToast({
        title: '加载成功'
      });
      let taskLists = app.jsonArrayToObjectArray(data.taskLists);
      for (let i = 0; i < taskLists.length; i++) {
        let tasks = data.tasks[i];
        taskLists[i].todoList = app.jsonArrayToObjectArray(tasks);
        taskLists[i].index = i;
      }
      that.setData({
        todos: taskLists
      });
    };
    app.requestSync(app.globalData.taskGetTaskListUrl, postData, op, this);
    wx.stopPullDownRefresh();
  },

  onShow: function() {
    this.onLoad();
  },

  onPullDownRefresh() {
    this.onLoad();
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后，跳转进入小程序首页
      that.setData({
        hasUserInfo: true
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log('成功授权')
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                res.userInfo.id = app.globalData.userInfo.id
                // if (JSON.stringify(app.globalData.userInfo)
                //   != JSON.stringify(res.userInfo)) {
                app.globalData.userInfo = res.userInfo
                wx.setStorage({
                  key: 'userInfo',
                  data: app.globalData.userInfo,
                  success(res) {
                    console.log('成功缓存👇')
                    console.log(app.globalData.userInfo)
                  }
                })
                wx.request({
                  url: getApp().globalData.serverUrl + '/api/user/update',
                  data: {
                    openid: app.globalData.userInfo.id,
                    name: app.globalData.userInfo.nickName,
                    avatar: app.globalData.userInfo.avatarUrl
                  },
                  success(res) {
                    console.log(res.data)
                  }
                })
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (that.userInfoReadyCallback) {
                  that.userInfoReadyCallback(res)
                }
              }
            })
          }
        },
        fail(res) {
          console.log(res.data);
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }

  },
  swap: function(arr, index1, index2) {
    // let tmp = arr[index2];
    // arr.splice(index2, 1);
    // arr.splice(index1, 0, tmp);
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  },

  bindUp: function(e) {
    let listIndex = e.currentTarget.dataset.listIndex;
    this.swap(this.data.todos, listIndex - 1, listIndex);
    this.setData({
      todos: this.data.todos
    });

    let postData = {
      taskListId: this.data.todos[listIndex].id,
    };
    let op = function(data, that) {};
    app.requestAsync(app.globalData.taskTaskListUpUrl, postData, op, this);
  },

  bindTasks: function(e) {
    let listIndex = e.currentTarget.dataset.listIndex;
    wx.setStorage({
      key: 'todo',
      data: this.data.todos[listIndex],
      success: function() {
        wx.navigateTo({
          url: '../tasks/tasks'
        })
      }
    })
  },

  bindComplete: function(e) {
    let index = e.currentTarget.dataset.index;
    let listIndex = e.currentTarget.dataset.listIndex;
    this.data.todos[listIndex].todoList[index].state = 6 - this.data.todos[listIndex].todoList[index].state;
    this.setData({
      todos: this.data.todos
    });

    let postData = {
      taskId: this.data.todos[listIndex].todoList[index].id,
      state: this.data.todos[listIndex].todoList[index].state
    };
    let op = function(data, that) {
      // wx.showToast({
      //     title: '操作成功'
      // });
    };
    app.requestSync(app.globalData.taskCompleteTaskUrl, postData, op, this);
  },

  inputChangeHandle: function(e) {
    this.setData({
      input: e.detail.value
    })
  },

  addTodoHandle: function(e) {
    if (!this.data.input || !this.data.input.trim()) {
      return;
    }
    // let todos = this.data.todos;
    // todos.push({ name: this.data.input, todoList: [] });
    // this.setData({
    //     input: '',
    //     todos: todos,
    // });

    let postData = {
      userId: app.globalData.userId,
      data: {
        name: this.data.input
      }
    };
    let op = function(data, that) {
      wx.showToast({
        title: '添加成功'
      });
      that.onLoad();
    };
    app.requestSync(app.globalData.taskAddTaskListUrl, postData, op, this);
  }
});