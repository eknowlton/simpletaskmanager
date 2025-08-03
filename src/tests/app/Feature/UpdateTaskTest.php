<?php

namespace Tests\App\Feature;

it('allows a user to update their own task', function () {
    $user = \Shared\Models\User::factory()->create();
    $task = \Shared\Models\Task::factory()->create(['user_id' => $user->id]);

    $this->actingAs($user)
        ->put(route('tasks.update', $task), [
            'title' => 'Updated Task',
            'description' => 'Updated description',
            'status' => \Shared\TaskStatus::InProgress->value,
        ])
        ->assertStatus(200);

    $this->assertDatabaseHas('tasks', [
        'id' => $task->id,
        'title' => 'Updated Task',
        'description' => 'Updated description',
        'status' => \Shared\TaskStatus::InProgress->value,
    ]);
});

it('fails validation when updating a task without required fields', function () {
    $user = \Shared\Models\User::factory()->create();
    $task = \Shared\Models\Task::factory()->create(['user_id' => $user->id]);

    $this->actingAs($user)
        ->put(route('tasks.update', $task), [])
        ->assertStatus(302);
});

it('denies a user to update a task of another user', function () {
    $user = \Shared\Models\User::factory()->create();
    $otherUser = \Shared\Models\User::factory()->create();
    $task = \Shared\Models\Task::factory()->create(['user_id' => $otherUser->id]);

    $this->actingAs($user)
        ->put(route('tasks.update', $task), [
            'title' => 'Updated Task',
            'description' => 'Updated description',
            'status' => \Shared\TaskStatus::InProgress->value,
        ])
        ->assertStatus(403);
});