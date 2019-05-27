const app = getApp();

Page({
    data: {
        input: '',
        todo: null,
    },

    load: function () {
        let that = this;
        wx.getStorage({
            key: 'todo',
            success: function (res) {
                that.setData({
                    todo: res.data
                })
            }
        })
    },

    save: function () {

    },

    onLoad: function () {
        this.load()
    },

    bindComplete: function (e) {
        let index = e.currentTarget.dataset.index;
        this.data.todo.todoList[index].state =
            6 - this.data.todo.todoList[index].state;
        this.setData({
            todo: this.data.todo
        });

        let postData = {
            taskId: this.data.todo.todoList[index].id,
            state: this.data.todo.todoList[index].state
        };
        let op = function(data, that) {
            // wx.showToast({
            //     title: '操作成功'
            // });
        };
        app.requestSync(app.globalData.taskCompleteTaskUrl, postData, op, this);
    },

    inputChangeHandle: function (e) {
        this.setData({input: e.detail.value})
    },

    addTodoHandle: function () {
        if (!this.data.input || !this.data.input.trim()) return
        let todo = this.data.todo;
        todo.todoList.push({name: this.data.input});
        this.setData({
            input: '',
            todo: todo,
        });

        let postData = {
            taskListId: this.data.todo.id,
            data: this.data.todo.todoList[this.data.todo.todoList.length - 1]
        };
        let op = function (data, that) {
            wx.showToast({
                title: '添加成功'
            });
        };
        app.requestSync(app.globalData.taskAddTaskUrl, postData, op, this);
    },

    removeTodoHandle: function (e) {
        let index = e.currentTarget.dataset.index;
        this.data.todo.todoList[index].state = 2;
        this.setData({
            todo: this.data.todo
        });

        let postData = {
            taskId: this.data.todo.todoList[index].id,
            state: this.data.todo.todoList[index].state
        };
        let op = function(data, that) {
            // wx.showToast({
            //     title: '操作成功'
            // });
        };
        app.requestSync(app.globalData.taskRemoveTaskUrl, postData, op, this);
    },

    bindDelete: function () {
        let that = this;
        wx.showModal({
            title: '提示',
            content: '确定删除此清单？',
            success: function (res) {
                if (res.confirm) {
                    that.delete();
                }
            }
        })
    },

    delete: function () {
        let postData = {
            taskListId: this.data.todo.id,
            state: 2
        };
        let op = function(data, that) {
            wx.showToast({
                title: '删除成功'
            });
            wx.navigateBack();
        };
        app.requestSync(app.globalData.taskRemoveTaskListUrl, postData, op, this);
    },

    bindOnFile: function () {
        let that = this;
        wx.showModal({
            title: '提示',
            content: '确定归档此清单？',
            success: function (res) {
                if (res.confirm) {
                    that.onFile();
                }
            }
        })
    },

    onFile: function () {
        let postData = {
            taskListId: this.data.todo.id,
            state: 5
        };
        let op = function(data, that) {
            wx.showToast({
                title: '归档成功'
            });
            wx.navigateBack();
        };
        app.requestSync(app.globalData.taskRemoveTaskListUrl, postData, op, this);
    }
});
