<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\HabitSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = '习惯管理';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="habit-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('新增预置习惯', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            [
                'attribute' => 'id',
                'headerOptions' => [
                    'width' => '80',
                ],
            ],
            'name',
            [
                'attribute' => 'follower_count',
                'headerOptions' => [
                    'width' => '180',
                ],
            ],
            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>


</div>
