<?php

namespace app\models;

use Yii;
use yii\base\NotSupportedException;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property int $openid
 * @property string $name
 * @property int $first_task_list
 * @property int $is_admin
 * @property int $avatar
 *
 * @property Label[] $labels
 * @property Like[] $likes
 * @property TaskList[] $taskLists
 * @property TaskList $firstTaskList
 * @property UserHabit[] $userHabits
 * @property Habit[] $habits
 */
class User extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
{
    public $password;
    public $auth_key;
    public $access_token;

    private static $admin_passwords = [
        '1' => 'admin',
    ];

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'is_admin', 'openid'], 'required'],
            [['first_task_list'], 'integer'],
            [['is_admin'], 'boolean'],
            [['openid', 'avatar'], 'safe'],
            [['name'], 'string', 'max' => 20],
            [['first_task_list'], 'exist', 'skipOnError' => true, 'targetClass' => TaskList::className(), 'targetAttribute' => ['first_task_list' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id]);
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        throw new NotSupportedException('对不起，该功能暂未实现。');
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($auth_key)
    {
        return $this->getAuthKey() === $auth_key;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        if (isset(self::$admin_passwords[$this->id])) {
            return self::$admin_passwords[$this->id] === $password;
        }
        return false;
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLabels()
    {
        return $this->hasMany(Label::className(), ['user' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLikes()
    {
        return $this->hasMany(Like::className(), ['user' => 'id']);
    }

    public function getOtherLikes()
    {
        return Like::find()
            ->leftJoin(UserHabit::tableName(), 'user_habit.id = like.user_habit')
            ->where(['user_habit.user' => $this->id])
            ->count();
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTaskLists()
    {
        return $this->hasMany(TaskList::className(), ['user' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFirstTaskList()
    {
        return $this->hasOne(TaskList::className(), ['id' => 'first_task_list']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUserHabits()
    {
        return $this->hasMany(UserHabit::className(), ['user' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getHabits($state)
    {
        return $this->hasMany(Habit::className(), ['id' => 'habit'])->viaTable('user_habit', ['user' => 'id'], function ($query) use ($state) {
            /* @var $query \yii\db\ActiveQuery */

            $query->andWhere(['state' => $state]);
        });
    }

    public function updateFirstTaskList($firstTaskList)
    {
        $this->firstTaskList = $firstTaskList;
        $this->save();
    }
}
