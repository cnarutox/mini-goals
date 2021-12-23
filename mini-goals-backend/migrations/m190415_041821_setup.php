<?php

use yii\db\Migration;

/**
 * Class m190415_041821_setup
 */
class m190415_041821_setup extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user', [
            'id' => $this->primaryKey(),
            'openid' => $this->string()->notNull(),
            'name' => $this->string(20)->notNull(),
            'first_task_list' => $this->integer()->null(),
            'is_admin' => $this->boolean()->notNull(),
        ]);

        $this->createTable('label', [
            'id' => $this->primaryKey(),
            'user' => $this->integer()->notNull(),
            'name' => $this->string(20)->notNull(),
        ]);

        $this->createTable('task_list', [
            'id' => $this->primaryKey(),
            'user' => $this->integer()->notNull(),
            'name' => $this->string(128)->notNull(),
            'state' => $this->integer()->notNull(),
            'hidden' => $this->boolean()->notNull(),
            'prev_task_list' => $this->integer()->null(),
            'next_task_list' => $this->integer()->null(),
            'first_task' => $this->integer()->null(),
        ]);

        $this->createTable('task', [
            'id' => $this->primaryKey(),
            'task_list' => $this->integer()->notNull(),
            'name' => $this->text()->notNull(),
            'state' => $this->integer()->notNull(),
            'prev_task' => $this->integer()->null(),
            'next_task' => $this->integer()->null(),
        ]);

        $this->createTable('task_state', [
            'id' => $this->primaryKey(),
            'name' => $this->string(20)->notNull(),
        ]);

        $this->createTable('task_list_label', [
            'label' => $this->integer()->notNull(),
            'task_list' => $this->integer()->notNull(),
        ]);

        $this->createTable('icon', [
            'id' => $this->primaryKey(),
            'path' => $this->text()->notNull(),
        ]);

        $this->createTable('habit', [
            'id' => $this->primaryKey(),
            'name' => $this->string(128)->notNull(),
            'type' => $this->integer()->notNull()->comment("[0 => '预置习惯', 1 => '自定义习惯']"),
            'cycle_type' => $this->integer()->notNull()->comment("[0 => '星期（二进制）', 1 => '每周几次'. 2 => '每隔几天']"),
            'cycle_value' => $this->integer()->notNull(),
            'icon' => $this->integer()->notNull(),
            'color' => $this->string(7)->notNull(),
            'description' => $this->text()->null(),
        ]);

        $this->createTable('user_habit', [
            'id' => $this->primaryKey(),
            'user' => $this->integer()->notNull(),
            'habit' => $this->integer()->notNull(),
            'state' => $this->integer()->notNull(),
            'share_state' => $this->integer()->notNull()->comment("[0 => '公开', 1 => '公布内容', 2 => '公布坚持情况']"),
        ]);

        $this->createTable('user_habit_state', [
            'id' => $this->primaryKey(),
            'name' => $this->string(20)->notNull(),
        ]);

        $this->createTable('like', [
            'user_habit' => $this->integer()->notNull(),
            'user' => $this->integer()->notNull(),
            'date' => $this->date()->notNull(),
        ]);

        $this->batchInsert(
            'task_state',
            ['id', 'name'],
            [
                [1, '正常'],
                [2, '已删除'],
                [3, '已隐藏'],
                [4, '已放弃'],
            ]
        );

        $this->batchInsert(
            'user_habit_state',
            ['id', 'name'],
            [
                [1, '正常'],
                [2, '已删除'],
                [3, '已归档'],
            ]
        );

        $this->addForeignKey(
            'user_task_list_id_fk',
            'user',
            'first_task_list',
            'task_list',
            'id'
        );

        $this->addForeignKey(
            'label_user_id_fk',
            'label',
            'user',
            'user',
            'id'
        );

        $this->addForeignKey(
            'task_list_label_label_id_fk',
            'task_list_label',
            'label',
            'label',
            'id'
        );

        $this->addForeignKey(
            'task_list_label_task_list_id_fk',
            'task_list_label',
            'task_list',
            'task_list',
            'id'
        );

        $this->addForeignKey(
            'task_list_user_id_fk',
            'task_list',
            'user',
            'user',
            'id'
        );

        $this->addForeignKey(
            'task_list_task_state_id_fk',
            'task_list',
            'state',
            'task_state',
            'id'
        );

        $this->addForeignKey(
            'task_list_task_list_id_fk',
            'task_list',
            'prev_task_list',
            'task_list',
            'id'
        );

        $this->addForeignKey(
            'task_list_task_list_id_fk2',
            'task_list',
            'next_task_list',
            'task_list',
            'id'
        );

        $this->addForeignKey(
            'task_list_task_id_fk',
            'task_list',
            'first_task',
            'task',
            'id'
        );

        $this->addForeignKey(
            'task_task_list_id_fk',
            'task',
            'task_list',
            'task_list',
            'id'
        );

        $this->addForeignKey(
            'task_task_id_fk',
            'task',
            'prev_task',
            'task',
            'id'
        );

        $this->addForeignKey(
            'task_task_id_fk2',
            'task',
            'next_task',
            'task',
            'id'
        );

        $this->addForeignKey(
            'task_task_state_id_fk',
            'task',
            'state',
            'task_state',
            'id'
        );

        $this->addForeignKey(
            'habit_icon_id_fk',
            'habit',
            'icon',
            'icon',
            'id'
        );

        $this->addForeignKey(
            'user_habit_user_id_fk',
            'user_habit',
            'user',
            'user',
            'id'
        );

        $this->addForeignKey(
            'user_habit_habit_id_fk',
            'user_habit',
            'habit',
            'habit',
            'id'
        );

        $this->addForeignKey(
            'user_habit_user_habit_state_id_fk',
            'user_habit',
            'state',
            'user_habit_state',
            'id'
        );

        $this->addForeignKey(
            'like_user_habit_id_fk',
            'like',
            'user_habit',
            'user_habit',
            'id'
        );

        $this->addForeignKey(
            'like_user_id_fk',
            'like',
            'user',
            'user',
            'id'
        );

        $this->createIndex(
            'task_list_label_uk',
            'task_list_label',
            ['label', 'task_list'],
            true
        );

        $this->createIndex(
            'user_habit_uk',
            'user_habit',
            ['user', 'habit'],
            true
        );

        $this->createIndex(
            'like_uk',
            'like',
            ['user_habit', 'user', 'date'],
            true
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m190415_041821_setup cannot be reverted.\n";

        return false;
    }
    */
}
