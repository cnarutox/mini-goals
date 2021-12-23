<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "task_list".
 *
 * @property int $id
 * @property int $user
 * @property string $name
 * @property int $state
 * @property int $hidden
 * @property int $prev_task_list
 * @property int $next_task_list
 * @property int $first_task
 *
 * @property Task[] $tasks
 * @property Task $firstTask
 * @property TaskList $prevTaskList
 * @property TaskList[] $taskLists
 * @property TaskList $nextTaskList
 * @property TaskList[] $taskLists0
 * @property TaskState $state0
 * @property User $user0
 * @property TaskListLabel[] $taskListLabels
 * @property Label[] $labels
 * @property User[] $users
 */
class TaskList extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'task_list';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user', 'name', 'state', 'hidden'], 'required'],
            [['user', 'state', 'prev_task_list', 'next_task_list', 'first_task'], 'integer'],
            [['hidden'], 'boolean'],
            [['name'], 'string', 'max' => 128],
            [['first_task'], 'exist', 'skipOnError' => true, 'targetClass' => Task::className(), 'targetAttribute' => ['first_task' => 'id']],
            [['prev_task_list'], 'exist', 'skipOnError' => true, 'targetClass' => TaskList::className(), 'targetAttribute' => ['prev_task_list' => 'id']],
            [['next_task_list'], 'exist', 'skipOnError' => true, 'targetClass' => TaskList::className(), 'targetAttribute' => ['next_task_list' => 'id']],
            [['state'], 'exist', 'skipOnError' => true, 'targetClass' => TaskState::className(), 'targetAttribute' => ['state' => 'id']],
            [['user'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user' => 'User',
            'name' => 'Name',
            'state' => 'State',
            'hidden' => 'Hidden',
            'prev_task_list' => 'Prev Task List',
            'next_task_list' => 'Next Task List',
            'first_task' => 'First Task',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTasks()
    {
        return $this->hasMany(Task::className(), ['task_list' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFirstTask()
    {
        return $this->hasOne(Task::className(), ['id' => 'first_task']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPrevTaskList()
    {
        return $this->hasOne(TaskList::className(), ['id' => 'prev_task_list']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTaskLists()
    {
        return $this->hasMany(TaskList::className(), ['prev_task_list' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNextTaskList()
    {
        return $this->hasOne(TaskList::className(), ['id' => 'next_task_list']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTaskLists0()
    {
        return $this->hasMany(TaskList::className(), ['next_task_list' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getState0()
    {
        return $this->hasOne(TaskState::className(), ['id' => 'state']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser0()
    {
        return $this->hasOne(User::className(), ['id' => 'user']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTaskListLabels()
    {
        return $this->hasMany(TaskListLabel::className(), ['task_list' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLabels()
    {
        return $this->hasMany(Label::className(), ['id' => 'label'])->viaTable('task_list_label', ['task_list' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUsers()
    {
        return $this->hasMany(User::className(), ['first_task_list' => 'id']);
    }
}
