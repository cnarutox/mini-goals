<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Habit;

/**
 * HabitSearch represents the model behind the search form of `app\models\Habit`.
 */
class HabitSearch extends Habit
{
    public $follower_count;

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id'], 'integer'],
            [['name'], 'safe'],
            [['follower_count'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Habit::find();
        $sub_query = UserHabit::find()
            ->select(['habit', 'count("user") as follower_count'])
            ->groupBy('habit');
        $query->leftJoin(['habit_sum' => $sub_query], 'habit_sum.habit = habit.id');
        $query->where(['!=', 'type', Habit::$TYPE_PERSONAL]);

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $dataProvider->setSort([
            'attributes' => [
                'id',
                'name',
                'follower_count' => [
                    'asc' => ['habit_sum.follower_count' => SORT_ASC],
                    'desc' => ['habit_sum.follower_count' => SORT_DESC],
                ],
            ],
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name]);

        return $dataProvider;
    }
}
