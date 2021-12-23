<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "task".
 *
 * @property int $id
 * @property int $task_list
 * @property string $name
 * @property int $state
 * @property int $prev_task
 * @property int $next_task
 *
 * @property Task $prevTask
 * @property Task[] $tasks
 * @property Task $nextTask
 * @property Task[] $tasks0
 * @property TaskList $taskList
 * @property TaskState $state0
 * @property TaskList[] $taskLists
 */
class Task extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'task';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['task_list', 'name', 'state'], 'required'],
            [['task_list', 'state', 'prev_task', 'next_task'], 'integer'],
            [['name'], 'string'],
            [['prev_task'], 'exist', 'skipOnError' => true, 'targetClass' => Task::className(), 'targetAttribute' => ['prev_task' => 'id']],
            [['next_task'], 'exist', 'skipOnError' => true, 'targetClass' => Task::className(), 'targetAttribute' => ['next_task' => 'id']],
            [['task_list'], 'exist', 'skipOnError' => true, 'targetClass' => TaskList::className(), 'targetAttribute' => ['task_list' => 'id']],
            [['state'], 'exist', 'skipOnError' => true, 'targetClass' => TaskState::className(), 'targetAttribute' => ['state' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'task_list' => 'Task List',
            'name' => 'Name',
            'state' => 'State',
            'prev_task' => 'Prev Task',
            'next_task' => 'Next Task',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPrevTask()
    {
        return $this->hasOne(Task::className(), ['id' => 'prev_task']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTasks()
    {
        return $this->hasMany(Task::className(), ['prev_task' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNextTask()
    {
        return $this->hasOne(Task::className(), ['id' => 'next_task']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTasks0()
    {
        return $this->hasMany(Task::className(), ['next_task' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTaskList()
    {
        return $this->hasOne(TaskList::className(), ['id' => 'task_list']);
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
    public function getTaskLists()
    {
        return $this->hasMany(TaskList::className(), ['first_task' => 'id']);
    }
}
