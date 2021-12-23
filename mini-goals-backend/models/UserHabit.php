<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user_habit".
 *
 * @property int $id
 * @property int $user
 * @property int $habit
 * @property int $state
 * @property int $share_state [0 => '公开', 1 => '公布内容', 2 => '公布坚持情况']
 *
 * @property Like[] $likes
 * @property Habit $habit0
 * @property UserHabitState $state0
 * @property User $user0
 * @property HabitCheck[] $habitChecks
 */
class UserHabit extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_habit';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user', 'habit', 'state', 'share_state'], 'required'],
            [['user', 'habit', 'state', 'share_state'], 'integer'],
            [['user', 'habit'], 'unique', 'targetAttribute' => ['user', 'habit']],
            [['habit'], 'exist', 'skipOnError' => true, 'targetClass' => Habit::className(), 'targetAttribute' => ['habit' => 'id']],
            [['state'], 'exist', 'skipOnError' => true, 'targetClass' => UserHabitState::className(), 'targetAttribute' => ['state' => 'id']],
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
            'habit' => 'Habit',
            'state' => 'State',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLikes()
    {
        return $this->hasMany(Like::className(), ['user_habit' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getHabit0()
    {
        return $this->hasOne(Habit::className(), ['id' => 'habit']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getState0()
    {
        return $this->hasOne(UserHabitState::className(), ['id' => 'state']);
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
    public function getHabitChecks()
    {
        return $this->hasMany(HabitCheck::className(), ['user_habit' => 'id']);
    }
}
