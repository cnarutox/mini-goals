<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Habit */

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => '习惯管理', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="habit-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('修改', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('删除', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => '您确定要删除此项吗？',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
            'name',
            [
                'attribute' =>  'cycle_type',
                'value' => function($model) {
                    switch ($model->cycle_type) {
                        case 0:
                            return '星期';
                        case 1:
                            return '每周几次';
                        case 2:
                            return '每隔几天';
                        default:
                            return '未知';
                    }
                }
            ],
            [
                'attribute' => 'cycle_value',
                'value' => function($model) {
                    if ($model->cycle_type == 0) {
                        $days = [
                            1 => '星期一',
                            2 => '星期二',
                            4 => '星期三',
                            8 => '星期四',
                            16 => '星期五',
                            32 => '星期六',
                            64 => '星期日',
                        ];
                        $selected_days = [];
                        foreach ($days as $k => $v)
                        if (($model->cycle_value & $k) != 0) {
                            $selected_days[] = $v;
                        }
                        return implode('，', $selected_days);
                    } else {
                        return $model->cycle_value;
                    }
                }
            ],
            [
                'attribute' => 'icon',
                'value' => $model->icon0->path,
            ],
            [
                'attribute' => 'color',
                'value' => '<span style="width: 20px; background-color: ' . $model->color . ';">&emsp;</span> '. $model->color,
                'format' => 'raw',
            ],
            'description:ntext',
        ],
    ]) ?>

</div>
