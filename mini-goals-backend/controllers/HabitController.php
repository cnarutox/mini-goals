<?php

namespace app\controllers;

use Yii;
use app\models\Habit;
use app\models\HabitSearch;
use yii\db\StaleObjectException;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

class HabitController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['index', 'view', 'create', 'update', 'delete'],
                'rules' => [
                    [
                        'actions' => ['index', 'view', 'create', 'update', 'delete'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    /**
     * 列出习惯列表
     *
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new HabitSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * 显示习惯详情
     *
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * 创建一个预置习惯对象
     *
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Habit();
        $model->type = 1;

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * 修改一个习惯对象
     *
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * 删除一个习惯对象
     *
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     * @throws \Throwable
     * @throws StaleObjectException
     */
    public function actionDelete($id)
    {
        $old_model = $this->findModel($id);
        $user_habits = $old_model->userHabits;
        foreach ($user_habits as $user_habit) {
            $model = new Habit();
            $model->name = $old_model->name;
            $model->type = Habit::$TYPE_PERSONAL;
            $model->cycle_type = $old_model->cycle_type;
            $model->cycle_value = $old_model->cycle_value;
            $model->icon = $old_model->icon;
            $model->color = $old_model->color;
            $model->description = $old_model->description;
            $model->save();
            $user_habit->habit = $model->id;
            $user_habit->save();
        }
        $old_model->delete();
        return $this->redirect(['index']);
    }

    /**
     * 寻找一个习惯对象
     *
     * @param integer $id
     * @return Habit the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Habit::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
