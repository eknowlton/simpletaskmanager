<?php

namespace Tests\App\Feature;

it('allows a user to create a project', function () {
    $user = \Shared\Models\User::factory()->create();

    $this->actingAs($user)
        ->put(route('projects.store'), [
            'title' => 'New Project',
            'description' => 'Project description',
            'status' => \Shared\ProjectStatus::InProgress->value,
            'color' => '#FF5733',
            'icon' => 'project-icon',
        ])
        ->assertStatus(201);

    $this->assertDatabaseHas('projects', [
        'title' => 'New Project',
        'user_id' => $user->id,
        'description' => 'Project description',
        'status' => \Shared\ProjectStatus::InProgress->value,
        'color' => '#FF5733',
        'icon' => 'project-icon',
    ]);
});

it('fails validation when creating a project without required fields', function () {
    $user = \Shared\Models\User::factory()->create();

    $this->actingAs($user)
        ->put(route('projects.store'), [])
        ->assertStatus(302);
});