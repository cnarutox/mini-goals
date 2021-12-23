<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "habit".
 *
 * @property int $id
 * @property string $name
 * @property int $type [0 => '预置习惯', 1 => '自定义习惯']
 * @property int $cycle_type [0 => '星期（二进制）', 1 => '每周几次'. 2 => '每隔几天']
 * @property int $cycle_value
 * @property int $icon
 * @property string $color
 * @property string $color_to
 * @property string $description
 *
 * @property Icon $icon0
 * @property UserHabit[] $userHabits
 * @property User[] $users
 */
class Habit extends \yii\db\ActiveRecord
{
    static $TYPE_PERSONAL = 0;
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'habit';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'type', 'cycle_type', 'cycle_value', 'icon', 'color'], 'required'],
            [['type', 'cycle_type', 'cycle_value', 'icon'], 'integer'],
            [['description'], 'string'],
            [['name'], 'string', 'max' => 128],
            [['color', 'color_to'], 'string', 'max' => 7],
            [['icon'], 'exist', 'skipOnError' => true, 'targetClass' => Icon::className(), 'targetAttribute' => ['icon' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => '序号',
            'name' => '名称',
            'type' => 'Type',
            'cycle_type' => '循环类型',
            'cycle_value' => '循环周期',
            'icon' => '图标',
            'color' => '主题颜色',
            'description' => '详细描述',

            'follower_count' => '坚持该习惯的人数',
        ];
    }

    public function getFollower_count()
    {
        return count($this->userHabits);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getIcon0()
    {
        return $this->hasOne(Icon::className(), ['id' => 'icon']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUserHabits()
    {
        return $this->hasMany(UserHabit::className(), ['habit' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUsers()
    {
        return $this->hasMany(User::className(), ['id' => 'user'])->viaTable('user_habit', ['habit' => 'id']);
    }
}
