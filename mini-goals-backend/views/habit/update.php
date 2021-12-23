<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Habit */

$this->title = '修改预置习惯：' . $model->name;
$this->params['breadcrumbs'][] = ['label' => '习惯管理', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = '修改预置习惯';
?>
<div class="habit-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
