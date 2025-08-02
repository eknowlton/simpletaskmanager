<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Shared\Models\Task>
 */
class TaskFactory extends Factory
{

    protected $model = \Shared\Models\Task::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \Shared\Models\User::factory(),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'status' => \Shared\TaskStatus::Pending->value,
            'project_id' => \Shared\Models\Project::factory(),
            'priority' => $this->faker->numberBetween(0, 5),
            'tags' =>  collect([true, true, true])->map(fn () => ['value' => $word = $this->faker->word, 'label' => $word]), 
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null
        ];
    }
}
