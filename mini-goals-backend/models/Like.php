<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "like".
 *
 * @property int $user_habit
 * @property int $user
 * @property string $date
 *
 * @property UserHabit $userHabit
 * @property User $user0
 */
class Like extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'like';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_habit', 'user', 'date'], 'required'],
            [['user_habit', 'user'], 'integer'],
            [['date'], 'safe'],
            [['user_habit', 'user', 'date'], 'unique', 'targetAttribute' => ['user_habit', 'user', 'date']],
            [['user_habit'], 'exist', 'skipOnError' => true, 'targetClass' => UserHabit::className(), 'targetAttribute' => ['user_habit' => 'id']],
            [['user'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'user_habit' => 'User Habit',
            'user' => 'User',
            'date' => 'Date',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUserHabit()
    {
        return $this->hasOne(UserHabit::className(), ['id' => 'user_habit']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser0()
    {
        return $this->hasOne(User::className(), ['id' => 'user']);
    }
}
