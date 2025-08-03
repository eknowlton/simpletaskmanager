<?php

namespace Tests\App\Feature;

it('allows a user to delete a task', function () {
    $user = \Shared\Models\User::factory()->create();
    $project = \Shared\Models\Project::factory()->create([
        'user_id' => $user->id,
    ]);
    $task = \Shared\Models\Task::factory()->create([
        'user_id' => $user->id,
        'project_id' => $project->id,
    ]);

    $this->actingAs($user)
        ->delete("/tasks/{$task->id}")
        ->assertStatus(204);

    $this->assertDatabaseMissing('tasks', [
        'id' => $task->id,
    ]);
});

it('denies a user to delete a task of another user', function () {
    $user = \Shared\Models\User::factory()->create();
    $otherUser = \Shared\Models\User::factory()->create();
    $task = \Shared\Models\Task::factory()->create(['user_id' => $otherUser->id]);

    $this->actingAs($user)
        ->delete("/tasks/{$task->id}")
        ->assertStatus(403);
});