<?php

namespace Tests\App\Feature;

use Shared\TaskStatus;

it('allows a user to create a task', function () {
    $user = \Shared\Models\User::factory()->create();
    $project = \Shared\Models\Project::factory()->create([
        'user_id' => $user->id,
    ]);

    $this->actingAs($user)
        ->post(route('tasks.store'), [
            'title' => 'New Task',
            'project_id' => $project->id,
            'description' => 'Task description',
            'status' => TaskStatus::Pending->value,
        ])
        ->assertStatus(201);

    $this->assertDatabaseHas('tasks', [
        'title' => 'New Task',
        'user_id' => $user->id,
        'project_id' => $project->id,
    ]);
});

it('fails validation when creating a task without required fields', function () {
    $user = \Shared\Models\User::factory()->create();

    $this->actingAs($user)
        ->post(route('tasks.store'), [])
        ->assertStatus(302);
});