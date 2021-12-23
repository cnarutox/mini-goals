<?php

use app\models\Icon;
use kartik\color\ColorInput;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Habit */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="habit-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'cycle_type')->dropDownList([
        '0' => '星期',
        '1' => '每周几次',
        '2' => '每隔几天',
    ], ['id' => 'cycle-type']) ?>

    <?= $form->field($model, 'cycle_value')->textInput(['id' => 'cycle-value']) ?>

    <?= Html::checkboxList('day_chooser', null, [
        '1' => '星期一',
        '2' => '星期二',
        '4' => '星期三',
        '8' => '星期四',
        '16' => '星期五',
        '32' => '星期六',
        '64' => '星期日',
    ], ['id' => 'day-chooser']) ?>

    <?= $form->field($model, 'icon')->dropDownList(Icon::getIconsList(), ['id' => 'icon']) ?>

    <div id="icon-thumb"></div>

    <?= $form->field($model, 'color')->widget(ColorInput::className(), ['bsVersion' => '3']) ?>

    <?= $form->field($model, 'description')->textarea(['rows' => 6]) ?>

    <div class="form-group">
        <?= Html::submitButton('保存', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>


<?php
$this->registerJs(/** @lang JavaScript */ "
    $(document).ready(() => {
        $('#icon-thumb').html('<span class=\"' + $('#icon').find('option:selected').text() + '\"></span>')
        $('#habit-color-cont').css('padding', '0')
        if ($('#cycle-type').val() === '0') {
            $('#day-chooser').css('display', 'block')
            $('#cycle-value').prop('readonly', true)
            $('#day-chooser input').each(function() {
                if ((parseInt($('#cycle-value').val()) & parseInt($(this).val())) !== 0) {
                    $(this).prop('checked', true)
                }
            })
        } else {
            $('#day-chooser').css('display', 'none')
            $('#cycle-value').prop('readonly', false)
        }
    })
    $('#icon').on('change', () => {
        $('#icon-thumb').html('<span class=\"' + $('#icon').find('option:selected').text() + '\"></span>')
    })
    $('#cycle-type').on('change', () => {
        let cycle_value = $('#cycle-value')
        cycle_value.val('')
        if ($('#cycle-type').val() === '0') {
            $('#day-chooser').css('display', 'block')
            cycle_value.prop('readonly', true)
            $('#day-chooser input').each(function() {
                $(this).prop('checked', false)
            })
        } else {
            $('#day-chooser').css('display', 'none')
            cycle_value.prop('readonly', false)
        }
    })
    $('#day-chooser').on('change', () => {
        let value = 0
        $('#day-chooser input:checked').each(function() {
            value |= parseInt($(this).val())
        })
        $('#cycle-value').val(value)
    })
")
?>
