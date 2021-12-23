<?php

namespace app\controllers\api;

use app\models\Task;
use app\models\TaskList;
use app\models\User;
use Yii;
use yii\web\Controller;
use yii\helpers\Json;

class TaskController extends Controller
{

//    public function beforeAction($action)
//    {
//        return Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
//    }

    public function actionTest()
    {
        return "test";
    }

    public function actionSave()
    {
    }

    public function actionGetTaskList(){
        $param = Yii::$app->request->post();
        $id = $param['userId'];
        $user = User::findIdentity($id);
        $taskLists = array();
        $tasks = array();
        $i = 0;
        $taskList = $user->getFirstTaskList()->one();
        while ($taskList) {
            $tasks[$i] = $this::getTasks($taskList);
            $taskLists[$i] = Json::encode($taskList);
            $i++;
            $taskList = $taskList->getNextTaskList()->one();
        }
        return json_encode(['success'=>true, 'data' => ['taskLists' => $taskLists, 'tasks' => $tasks,]]);
    }

    public static function getTasks($taskList)
    {
        $tasks = array();
        $i = 0;
        $currentTask = $taskList->getFirstTask()->one();
        while ($currentTask) {
            $tasks[$i] = Json::encode($currentTask);
            $i++;
            $currentTask = $currentTask->getNextTask()->one();
        }
        return $tasks;
    }

    public function actionAddTaskList()
    {
        $param = Yii::$app->request->post();
        $taskListData = $param['data'];
        $id = $param['userId'];

        $taskList = new TaskList();
        $taskList->setAttributes($taskListData);
        $taskList->user = $id;
        $taskList->state = 1;
        $taskList->hidden = 0;

        $user = User::findIdentity($id);
        $currentTaskList = $user->getFirstTaskList()->one();

        if ($currentTaskList) {
            $lastTaskList = $currentTaskList->getNextTaskList()->one();
            while ($lastTaskList != null) {
                $currentTaskList = $lastTaskList;
                $lastTaskList = $currentTaskList->getNextTaskList()->one();
            }
            $taskList->prev_task_list = $currentTaskList->id;
            $taskList->save();
            $currentTaskList->next_task_list = $taskList->id;
            $currentTaskList->save();
        } else {
            $taskList->save();
            $user->first_task_list=$taskList->id;
            $user->save();
        }
        return json_encode(['success'=>true, ]);
    }

    public function actionAddTask()
    {
        $param = Yii::$app->request->post();
        $taskData = $param['data'];
        $taskListId = $param['taskListId'];

        $task = new Task();
        $task->setAttributes($taskData);
        $task->state = 1;
        $task->task_list = $taskListId;

        $taskList = TaskList::findOne(['id' => $taskListId]);
        $currentTask = $taskList->getFirstTask()->one();
        if ($currentTask) {
            $lastTask = $currentTask->getNextTask()->one();
            while ($lastTask != null) {
                $currentTask = $lastTask;
                $lastTask = $currentTask->getNextTask()->one();
            }
            $task->prev_task = $currentTask->id;
            $task->save();
            $currentTask->next_task = $task->id;
            $currentTask->save();
        } else {
            $task->save();
            $taskList->first_task=$task->id;
            $taskList->save();
        }
        return json_encode(['success'=>true, ]);
    }

    public function actionCompleteTask()
    {
        $param = Yii::$app->request->post();
        $taskId = $param['taskId'];
        $state = $param['state'];
        $task = Task::findOne(['id' => $taskId]);
        $task->state = $state;
        $task->save();
        return json_encode(['success'=>true]);
    }

    public function actionRemoveTask()
    {
        $param = Yii::$app->request->post();
        $taskId = $param['taskId'];
        $state = $param['state'];
        $task = Task::findOne(['id' => $taskId]);
        $task->state = $state;

        $preTask = $task->getPrevTask()->one();
        $nextTask = $task->getNextTask()->one();

        if ($preTask) {
            if ($nextTask) {
                $preTask->next_task = $nextTask->id;
            }else{
                $preTask->next_task = null;
            }
            $preTask->save();
        }else{
            $taskList = $task->getTaskList()->one();
            if ($nextTask) {
                $taskList->first_task = $nextTask->id;
            } else {
                $taskList->first_task =null;
            }
            $taskList->save();
        }

        $task->save();
        return json_encode(['success'=>true, ]);
    }

    public function actionRemoveTaskList()
    {
        $param = Yii::$app->request->post();
        $taskListId = $param['taskListId'];
        $state = $param['state'];
        $taskList = TaskList::findOne(['id' => $taskListId]);
        $taskList->state = $state;

        $preTaskList = $taskList->getPrevTaskList()->one();
        $nextTaskList = $taskList->getNextTaskList()->one();

        if ($preTaskList) {
            if ($nextTaskList) {
                $preTaskList->next_task_list = $nextTaskList->id;
            }else{
                $preTaskList->next_task_list = null;
            }
            $preTaskList->save();
        }else{
            $user = $taskList->getUser0()->one();
            $user->name = "test";
            if ($nextTaskList) {
                $user->first_task_list = $nextTaskList->id;
            } else {
                $user->first_task_list =null;
            }
            $user->save();
        }

        $taskList->save();
        return json_encode(['success'=>true, ]);
    }

    public function actionTaskListUp()
    {
        $param = Yii::$app->request->post();
        $taskListId = $param['taskListId'];
        $taskList = TaskList::findOne(['id' => $taskListId]);

        $preTaskList = $taskList->getPrevTaskList()->one();

        if ($preTaskList) {
            return 'da';
            $next = $taskList->next_task_list;
            $taskList->next_task_list = $preTaskList->id;
            $taskList->prev_task_list = $preTaskList->prev_task_list;
            $preTaskList->next_task_list = $taskList->$next;
            $preTaskList->prev_task_list = $taskList->id;

            $preTaskList->save();
            $taskList->save();
        }
        return json_encode([$preTaskList->errors,]);

//        return json_encode(['success'=>true, ]);
    }
}