const app = getApp();

Page({
  data: {
    input: '',
    todos: null
  },

  // test: function() {
  //     wx.navigateTo({
  //         url: '../demoItemMove/demoItemMove'
  //     })
  // },

  load: function () {
    let postData = {
      userId: app.globalData.userId
    };
    let op = function (data, that) {
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

  onShow: function () {
    this.load();
  },

  onPullDownRefresh() {
    this.load();
  },

  swap: function (arr, index1, index2) {
    // let tmp = arr[index2];
    // arr.splice(index2, 1);
    // arr.splice(index1, 0, tmp);
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  },

  bindUp: function (e) {
    let listIndex = e.currentTarget.dataset.listIndex;
    this.swap(this.data.todos, listIndex - 1, listIndex);
    this.setData({
      todos: this.data.todos
    });

    let postData = {
      taskListId: this.data.todos[listIndex].id,
    };
    let op = function (data, that) {
    };
    app.requestAsync(app.globalData.taskTaskListUpUrl, postData, op, this);
  },

  bindTasks: function (e) {
    let listIndex = e.currentTarget.dataset.listIndex;
    wx.setStorage({
      key: 'todo',
      data: this.data.todos[listIndex],
      success: function () {
        wx.navigateTo({
          url: '../tasks/tasks'
        })
      }
    })
  },

  bindComplete: function (e) {
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
    let op = function (data, that) {
      // wx.showToast({
      //     title: '操作成功'
      // });
    };
    app.requestSync(app.globalData.taskCompleteTaskUrl, postData, op, this);
  },

  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },

  addTodoHandle: function (e) {
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
      data: { name: this.data.input }
    };
    let op = function (data, that) {
      wx.showToast({
        title: '添加成功'
      });
      that.load();
    };
    app.requestSync(app.globalData.taskAddTaskListUrl, postData, op, this);
  }
});