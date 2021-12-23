<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "task_list_label".
 *
 * @property int $label
 * @property int $task_list
 *
 * @property Label $label0
 * @property TaskList $taskList
 */
class TaskListLabel extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'task_list_label';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['label', 'task_list'], 'required'],
            [['label', 'task_list'], 'integer'],
            [['label', 'task_list'], 'unique', 'targetAttribute' => ['label', 'task_list']],
            [['label'], 'exist', 'skipOnError' => true, 'targetClass' => Label::className(), 'targetAttribute' => ['label' => 'id']],
            [['task_list'], 'exist', 'skipOnError' => true, 'targetClass' => TaskList::className(), 'targetAttribute' => ['task_list' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'label' => 'Label',
            'task_list' => 'Task List',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLabel0()
    {
        return $this->hasOne(Label::className(), ['id' => 'label']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTaskList()
    {
        return $this->hasOne(TaskList::className(), ['id' => 'task_list']);
    }
}
