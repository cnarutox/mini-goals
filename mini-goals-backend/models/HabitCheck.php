<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "habit_check".
 *
 * @property int $user_habit
 * @property string $date
 * @property int $id
 */
class HabitCheck extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'habit_check';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_habit', 'date'], 'required'],
            [['user_habit'], 'integer'],
            [['date'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'user_habit' => 'User Habit',
            'date' => 'Date',
            'id' => 'ID',
        ];
    }
}
