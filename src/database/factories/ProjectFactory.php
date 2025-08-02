<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Shared\Models\Project>
 */
class ProjectFactory extends Factory
{

    protected $model = \Shared\Models\Project::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'slug' => $this->faker->unique()->slug(),
            'description' => $this->faker->paragraph(),
            'status' => \Shared\ProjectStatus::InProgress,
            'color' => '#2596be',
            'icon' => null,
            'user_id' => \Shared\Models\User::factory(),
        ];
    }

    /**
     * A project state that exists with tasks.
     */

    public function withTasks(int $count = 5): static
    {
        return $this->has(\Shared\Models\Task::factory()->count($count), 'tasks');
    } 
}