<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user_habit_state".
 *
 * @property int $id
 * @property string $name
 *
 * @property UserHabit[] $userHabits
 */
class UserHabitState extends \yii\db\ActiveRecord
{
    static $STATE_NORMAL = 1;
    static $STATE_DELETED = 2;
    static $STATE_ARCHIVED = 3;

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_habit_state';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'string', 'max' => 20],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUserHabits()
    {
        return $this->hasMany(UserHabit::className(), ['state' => 'id']);
    }
}
