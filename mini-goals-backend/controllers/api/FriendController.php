<?php

namespace app\controllers\api;

use app\models\HabitCheck;
use app\models\UserHabitState;
use Yii;
use yii\helpers\ArrayHelper;
use yii\db\Query;
use yii\web\Controller;
use app\models\UserHabit;
use app\models\User;
use app\models\Habit;
use app\models\Like;
use app\models\Icon;

class FriendController extends Controller
{
    /**
     * 获取朋友圈列表
     *
     * @param $openid
     * @return false|string
     */
    public function actionMoments($openid)
    {

        $date = date('Y-m-d');
        $user = User::findOne(['openid' => $openid]);
        $moments = (new Query())
            ->from(HabitCheck::tableName())
            ->leftJoin(UserHabit::tableName(), 'habit_check.user_habit = user_habit.id')
            ->where(['!=', 'user_habit.share_state', 0])
            ->andwhere(['!=','user_habit.state',  UserHabitState::$STATE_DELETED])
//            ->andWhere(['habit_check.date' => $date])
            ->orderBy('habit_check.id desc')
            ->all();
        $list = [];
        foreach ($moments as $moment) {
            $item = [];
            $item_user = User::findOne($moment['user']);
            $item_habit = Habit::findOne($moment['habit']);
            $item_like_users = (new Query)
                ->from(Like::tableName())
                ->leftJoin(User::tableName(), 'like.user = user.id')
                ->where([
                    'like.user_habit' => $moment['user_habit'],
//                    'date' => $date,
                ])
                ->all();
            $item_like_users = array_unique($item_like_users, SORT_REGULAR);
            $item['user_habit'] = $moment['user_habit'];
            $item['date'] = $moment['date'];
            $item['userid'] = $moment['user'];
            $item['habitid'] = $moment['habit'];
            $item['userName'] = $item_user->name;
            $item['avatar'] = $item_user->avatar;
            $item['color'] = $item_habit->color;
            $item['color_to'] = $item_habit->color_to;
            $item['habitName'] = $item_habit->name;
            $item['iconfont'] = Icon::findOne($item_habit->icon)->path;
            $item['habitpersist'] = HabitCheck::find()
                ->where(['user_habit' => $moment['user_habit']])
                ->count();
            $item['likelist'] = implode('，', ArrayHelper::getColumn($item_like_users, 'name'));
            $item['thumbed'] = Like::find()
                ->where([
                    'user_habit' => $moment['user_habit'],
                    'user' => $user->id,
//                    'date' => $date,
                ])
                ->exists();
            $list[] = $item;
        }

        return json_encode($list);
    }

    /**
     * 点赞
     *
     * @return false|string
     */
    public function actionLike($openid, $user_habit)
    {
        $user = User::findOne(['openid' => $openid]);
        $like = new Like();
        $like->user = $user->id;
        $like->user_habit = $user_habit;
        $like->date = date('Y-m-d');
        $like->save();
        return json_encode($like);
    }
}
