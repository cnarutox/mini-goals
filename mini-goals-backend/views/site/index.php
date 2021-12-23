<?php

/* @var $this yii\web\View */

$this->title = '小目标后台管理系统';
?>
<div class="site-index">

    <div class="jumbotron">
        <h1>小目标后台管理系统</h1>

        <p class="lead">使用本应用的总人数：<?= \app\models\User::find()->count() ?></p>

        <p class="tool-btn">
            <?php if (Yii::$app->user->isGuest): ?>
                <a class="btn btn-lg btn-success" href="/mini-goals/site/login">登录</a>
            <?php else: ?>
                <a class="btn btn-lg btn-success" href="/mini-goals/habit/index">进入习惯管理</a>
            <?php endif ?>
        </p>
    </div>

</div>

<style>
    .tool-btn {
        margin-top: 100px;
    }
</style>
