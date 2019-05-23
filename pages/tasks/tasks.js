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
        this.data.todo.todoList[index].completed =
            !this.data.todo.todoList[index].completed;
        this.setData({
            todo: this.data.todo
        })
        this.save();
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
        })
        this.save()
    },

    removeTodoHandle: function (e) {
        let index = e.currentTarget.dataset.index;
        this.data.todo.todoList[index].state = 1;
        this.setData({
            todo: this.data.todo
        });
        this.save();
    },

    completedAllHandle: function () {
        for (let i = 0; i < this.data.todo.todoList.length; i++) {
            this.data.todo.todoList[i].completed = true;
        }
        this.setData({
            todo: this.data.todo,
        });
        this.save();
    },

    clearCompletedHandle: function () {
        for (let i = 0; i < this.data.todo.todoList.length; i++) {
            this.data.todo.todoList[i].completed = false;
        }
        this.setData({
            todo: this.data.todo,
        });
        this.save();
    },

    bindDelete:function () {
        let that = this;
        wx.showModal({
            title:'提示',
            content: '确定删除此清单？',
            success: function (res) {
                if (res.confirm) {
                    that.delete();
                }
            }
        })
    },

    delete: function () {
        wx.showToast({
            title: 'delete'
        })
    },

    bindOnFile: function () {
        let that = this;
        wx.showModal({
            title:'提示',
            content: '确定归档此清单？',
            success: function (res) {
                if (res.confirm) {
                    that.onFile();
                }
            }
        })
    },

    onFile:function () {
        wx.showToast({
            title: 'onfile'
        })
    }
})
