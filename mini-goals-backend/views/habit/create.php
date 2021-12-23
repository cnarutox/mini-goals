<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Habit */

$this->title = '新增预置习惯';
$this->params['breadcrumbs'][] = ['label' => '习惯管理', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="habit-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
