<?php

namespace app\models;

use Yii;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "icon".
 *
 * @property int $id
 * @property string $path
 *
 * @property Habit[] $habits
 */
class Icon extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'icon';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['path'], 'required'],
            [['path'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'path' => 'Path',
        ];
    }

    public static function getIconsList()
    {
//        $makeRaw = function ($icon) {
//            return '<span class="' . $icon . '"></span>';
//        };
        $result = self::find()->all();
        return ArrayHelper::map($result, 'id', 'path');
//        $result = ArrayHelper::map($result, 'id', 'path');
//        return array_map($makeRaw, $result);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getHabits()
    {
        return $this->hasMany(Habit::className(), ['icon' => 'id']);
    }
}
