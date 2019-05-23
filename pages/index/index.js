Page({
    data: {
        input: '',
        todos: [
            {
                id: 4,
                name: 'name1',
                todoList: [
                    {
                        id: 131,
                        name: 'task1'
                    },
                    {
                        id: 231,
                        name: 'task2'
                    }
                ],
                completedList: [
                    {
                        id: 313,
                        name: 'task3'
                    },
                    {
                        id: 431,
                        name: 'task4'
                    }
                ]
            },
            {
                id: 3,
                name: 'name1',
                todoList: [
                ],
                completedList: [
                    {
                        id: 331,
                        name: 'task3'
                    },
                    {
                        id: 431,
                        name: 'task4'
                    }
                ]
            }
        ],
    },


    bindTasks: function (e) {
        let listIndex = e.currentTarget.dataset.listIndex;
        console.log(e.currentTarget.dataset.listIndex)
        wx.setStorage({
            key:'todo',
            data: this.data.todos[listIndex],
            success:function () {
                wx.navigateTo({
                    url: '../tasks/tasks'
                })
            }
        })
    },

    bindComplete: function (e) {
        let index = e.currentTarget.dataset.index;
        let listIndex = e.currentTarget.dataset.listIndex;
        this.data.todos[listIndex].todoList[index].completed = true;
        this.setData({
            todos:this.data.todos
        })
    },

    onLoad: function () {
    },

    inputChangeHandle: function (e) {
        this.setData({input: e.detail.value})
    },

    addTodoHandle: function (e) {
        if (!this.data.input || !this.data.input.trim()) return
        var todos = this.data.todos
        todos.push({name: this.data.input, completed: false})
        var logs = this.data.logs
        logs.push({timestamp: new Date(), action: 'Add', name: this.data.input})
        this.setData({
            input: '',
            todos: todos,
            leftCount: this.data.leftCount + 1,
            logs: logs
        })
        this.save()
    }
})
