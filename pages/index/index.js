const app = getApp();

Page({
    data: {
        input: '',
        todos: null
    },

    test: function () {
        wx.navigateTo({
            url: '../demoItemMove/demoItemMove'
        })
    },

    load: function () {
        this.setData({
            todos: [
                {
                    id: 4,
                    name: 'name1',
                    todoList: [
                        {
                            id: 131,
                            name: 'task1',
                            state: 1
                        },
                        {
                            id: 231,
                            name: 'task2'
                        },
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
                    todoList: [{
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
        })

        // let op = function (res,that) {
        //     console.log(res)
        //     that.setData({
        //         input: res.data
        //     })
        // };
        //
        // app.request('http://localhost:8080/api/task/test',op,this);

        wx.stopPullDownRefresh();
    },

    save: function (operation, data) {
        let postData = {
            userId: 1234,
            operation: operation,
            data: data
        };
        let op = function (data, that) {
            wx.showToast({
                title: '操作成功'
            });
            console.log(JSON.stringify(data['key1']));
            let d = JSON.parse(data);
            console.log(d);
        };
        app.request('http://localhost:8080/api/task/save', postData, op, this);
    },

    onLoad: function () {
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
        this.save("up", this.data.todos[listIndex]);
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
        this.data.todos[listIndex].todoList[index].completed =
            !this.data.todos[listIndex].todoList[index].completed;
        this.setData({
            todos: this.data.todos
        });
        this.save("complete", this.data.todos[listIndex].todoList[index]);
    },

    inputChangeHandle: function (e) {
        this.setData({input: e.detail.value})
    },

    addTodoHandle: function (e) {
        if (!this.data.input || !this.data.input.trim()) return
        let todos = this.data.todos;
        todos.push({name: this.data.input, todoList: [], completedList: []});
        this.setData({
            input: '',
            todos: todos,
        });
        this.save("add", this.data.todos[this.data.todos.length - 1]);
    }
});
