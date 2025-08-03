<?php

namespace Tests\App\Feature;

it('allows a user to update a project', function () {
    $user = \Shared\Models\User::factory()->create();
    $project = \Shared\Models\Project::factory()->create([
        'user_id' => $user->id,
    ]);

    $this->actingAs($user)
        ->put(route('projects.update', $project), [
            'title' => 'Updated Project Name',
            'description' => 'Updated Project Description',
            'status' => \Shared\ProjectStatus::InProgress->value,
            'color' => '#FF5733',
            'icon' => 'updated-icon',
        ]);

    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
        'title' => 'Updated Project Name',
        'description' => 'Updated Project Description',
        'status' => \Shared\ProjectStatus::InProgress->value,
        'color' => '#FF5733',
        'icon' => 'updated-icon',
    ]);
});

it('does not allow a user to update a project of another user', function () {
    $user = \Shared\Models\User::factory()->create();
    $otherUser = \Shared\Models\User::factory()->create();
    $project = \Shared\Models\Project::factory()->create(['user_id' => $otherUser->id]);

    $this->actingAs($user)
        ->put(route('projects.update', $project), [
            'title' => 'Unauthorized Update',
            'description' => 'This should not be allowed',
            'status' => \Shared\ProjectStatus::InProgress->value,
            'color' => '#FF5733',
            'icon' => 'unauthorized-icon',
        ])
        ->assertStatus(403);
});