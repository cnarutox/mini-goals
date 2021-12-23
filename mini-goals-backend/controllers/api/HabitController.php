<?php

namespace app\controllers\api;

use app\models\HabitCheck;
use app\models\Icon;
use app\models\UserHabit;
use app\models\User;
use app\models\UserHabitState;
use Yii;
use app\models\Habit;
use yii\web\Controller;

class HabitController extends Controller
{
    /**
     * 获取用户习惯列表
     *
     * @param $openid
     * @param $state
     * @return false|string
     */
    public function actionIndex($openid, $state)
    {
        $user = User::findOne(['openid' => $openid]);
        $habits = $user->getHabits($state);
        $archived_habits = $user->getHabits(UserHabitState::$STATE_ARCHIVED);

        $habits_array = $habits->asArray()->all();
        foreach ($habits_array as &$habit_array) {
            $user_habit = UserHabit::find()
                ->where([
                    'habit' => $habit_array['id'],
                    'user' => $user->id,
                ])
                ->one();
            /* @var $user_habit UserHabit */
            $habit_array['id'] = $user_habit->id;
            $habit_array['habit'] = $user_habit->habit;
            $habit_array['user'] = $user_habit->user;
            $habit_array['state'] = $user_habit->state;
            $habit_array['share_state'] = $user_habit->share_state;
            $habit_array['persist'] = $user_habit->getHabitChecks()->count();
            $habit_array['iconfont'] = Icon::findOne($habit_array['icon'])->path;
            $habit_array['todayClicked'] = HabitCheck::find()
                ->where([
                    'user_habit' => $user_habit->id,
                    'date' => date('Y-m-d'),
                ])
                ->exists();
            $habit_array['style'] = $habit_array['todayClicked'] ? 'linear-gradient(to left,' . $habit_array['color'] . ',' . $habit_array['color_to'] . ')' : 'transparent';
        }

        return json_encode([
            'habits' => $habits_array,
            'count' => $habits->count(),
            'archivenum' => $archived_habits->count()
        ]);
    }

    /**
     * 获取用户获得的赞数
     *
     * @param $openid
     * @return int|string
     */
    public function actionUserLike($openid)
    {
        $user = User::findOne(['openid' => $openid]);
        return $user->getOtherLikes();
    }

    /**
     * 获取用户习惯赞数
     *
     * @param $user_habit
     * @return false|string
     */
    public function actionLike($user_habit)
    {
        $likes_count = UserHabit::findOne($user_habit)->getLikes()->count();
        return json_encode(['userhabitlike' => $likes_count]);
    }

    /**
     * 创建自定义习惯
     *
     * @return false|string
     */
    public function actionCreate()
    {
        $param = Yii::$app->request->post();
        $user = User::findOne(['openid' => $param['openid']]);

        $habit = new Habit();
        $habit->name = $param['name'];
        $habit->type = Habit::$TYPE_PERSONAL;
        $habit->cycle_type = $param['cycle_type'];
        $habit->color = $param['color'];
        $habit->color_to = '#FFFFFF'; // TODO: 允许用户自定义渐变色2
        $habit->cycle_value = $param['cycle_value'];
        $habit->description = $param['description'];
        $habit->type = $param['type'];
        $habit->icon = 1; // TODO: 允许用户自定义图标
        $habit->save();

        $user_habit = new UserHabit();
        $user_habit->user = $user->id;
        $user_habit->habit = $habit->id;
        $user_habit->share_state = $param['share_state'];
        $user_habit->state = UserHabitState::$STATE_NORMAL;
        $user_habit->save();

        return json_encode([$habit, $user_habit]);
    }

    /**
     * 追踪预置习惯
     *
     * @return bool|false|string
     */
    public function actionFollow()
    {
        $param = Yii::$app->request->post();
        $user = User::findOne(['openid' => $param['openid']]);
        $habit = Habit::find()
            ->where(['id' => $param['habit']])
            ->andWhere(['!=', 'type', Habit::$TYPE_PERSONAL])
            ->one();

        /* @var $habit Habit */
        if ($habit && !UserHabit::findOne(['user' => $user->id, 'habit' => $habit->id])) {
            $user_habit = new UserHabit();
            $user_habit->user = $user->id;
            $user_habit->habit = $habit->id;
            $user_habit->share_state = $param['share_state'];
            $user_habit->state = UserHabitState::$STATE_NORMAL;
            $user_habit->save();

            return json_encode([$user_habit]);
        }

        return false;
    }

    /**
     * 根据用户习惯 ID 获取习惯名字
     *
     * @param $user_habit
     * @return false|string
     */
    public function actionName($user_habit)
    {
        $habit_name = UserHabit::findOne($user_habit)->habit0->name;
        return json_encode(['habitname' => $habit_name]);
    }

    /**
     * 归档习惯
     *
     * @return bool
     */
    public function actionArchive()
    {
        $param = Yii::$app->request->post();
        $user_habit = UserHabit::findOne($param['user_habit']);
        $user_habit->state = UserHabitState::$STATE_ARCHIVED;
        $user_habit->save();
        return true;
    }

    /**
     * 取消归档习惯
     *
     * @return bool
     */
    public function actionUnarchive()
    {
        $param = Yii::$app->request->post();
        $user_habit = UserHabit::findOne($param['user_habit']);
        $user_habit->state = UserHabitState::$STATE_NORMAL;
        $user_habit->save();
        return true;
    }

    /**
     * 删除自定义习惯
     *
     * @return string
     */
    public function actionDelete()
    {
        $param = Yii::$app->request->post();
        $user_habit = UserHabit::findOne($param['user_habit']);
        $user_habit->state = UserHabitState::$STATE_DELETED;
        $user_habit->save();
        return json_encode($user_habit->errors);
    }

    /**
     * 获取坚持天数
     *
     * @param $user_habit
     * @return false|string
     */
    public function actionPersist($user_habit)
    {
        $user_habit = UserHabit::findOne($user_habit);
        $persist = $user_habit->getHabitChecks()->count();
        return json_encode(['clocks' => $persist]);
    }

    /**
     * 获取一周打卡情况
     *
     * @param $user_habit
     * @param $date
     * @param $weekday
     * @return false|string
     * @throws \Exception
     */
    public function actionWeeklyCheck($user_habit, $date, $weekday)
    {
        $todayclockedin = false;
        $userhabit = UserHabit::findOne($user_habit)->id;

        $datetime = new \DateTime($date);
        $datestring = date_format($datetime, "Y-m-d");
        $weeks = array(0, 0, 0, 0, 0, 0, 0);

        $query = new yii\db\Query;
        //print_r($datestring);
        $query->select('*')
            ->from('habit_check')
            ->where(['user_habit' => $userhabit, 'date' => $datestring]);
        //print_r($query->count());
        //print_r($query->all());
        $todayClicked = $query->count() == 1 ? true : false;

        //print_r( $datetime->format('Y-m-d'."\n"));
        $weekdayint = intval($weekday);
        $interval_pre = new \DateInterval('P' . strval($weekdayint - 1) . 'D');
        $start = $datetime->sub($interval_pre);
        //print_r($start->format('Y-m-d'."\n"));


        $query->select('*')
            ->from('habit_check')
            ->where(['user_habit' => $userhabit]);
        $delta = 0;
        foreach ($query->each() as $item) {
            $temp = new \DateTime($item['date']);
            $delta = $temp->diff($start)->d;

            if ($temp >= $start) {
                if ($delta >= 0 && $delta <= 6) {
                    $weeks[$delta] = 1;
                }

            }
        }
        return json_encode(['delta' => $delta, 'weeks' => $weeks, 'todayClicked' => $todayClicked, 'todaydate' => $datestring]);
    }

    /**
     * 打卡
     *
     * @return bool
     */
    public function actionCheck()
    {
        $param = Yii::$app->request->post();
        $date = date('Y-m-d');
        if (!HabitCheck::findOne(['user_habit' => $param['user_habit'], 'date' => $date])) {
            $habit_check = new HabitCheck();
            $habit_check->user_habit = $param['user_habit'];
            $habit_check->date = $date;
            $habit_check->save();
            return true;
        }
        return false;
    }

    /**
     * 获取推荐预置习惯列表
     *
     * @param $type
     * @return false|string
     */
    public function actionRecommendationIndex($type)
    {
        $habits = Habit::find()
            ->where(['type' => $type])
            ->asArray()
            ->all();
        $list = array_map(function ($habits) {
            $habits['peer'] = UserHabit::find()
                ->where(['habit' => $habits['id']])
                ->count();
            $habits['iconfont'] = Icon::findOne($habits['icon'])->path;
            return $habits;

        }, $habits);
        return json_encode($list);
    }
}
