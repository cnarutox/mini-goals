<?php

namespace app\controllers\api;

use app\models\ResponseMessage;
use Yii;
use yii\web\Controller;
use app\models\User;

class UserController extends Controller
{
    /**
     * 用户登录
     *
     * @param $code
     * @return string
     */
    public function actionLogin($code)
    {
        $wx_appid = Yii::$app->params['wx_appid'];
        $wx_secret = Yii::$app->params['wx_secret'];
        $url = 'https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code'
            . '&appid=' . $wx_appid
            . '&secret=' . $wx_secret
            . '&js_code=' . $code;
        $openid = json_decode(file_get_contents($url))->openid;
        $user = User::findOne(['openid' => $openid]);
        if ($user) {
            return $openid;
        }
        $user = new User();
        $user->openid = $openid;
        $user->is_admin = 0;
        $user->name = Yii::$app->params['guest_name'];
        $user->save();
        return json_encode($user->errors);
    }

    /**
     * 更新用户信息
     *
     * @param $openid
     * @param $name
     * @param $avatar
     * @return string
     */
    public function actionUpdate($openid, $name, $avatar)
    {
        $user = User::findOne(['openid' => $openid]);
        $user->name = $name;
        $user->avatar = $avatar;
        $user->save();
        return ResponseMessage::$SUCCESS['SUCCESS'];
    }
}
