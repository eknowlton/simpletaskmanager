<?php

namespace Tests\App\Feature;

it('allows a user to delete a project', function () {
    $user = \Shared\Models\User::factory()->create();
    $project = \Shared\Models\Project::factory()->create([
        'user_id' => $user->id,
    ]);

    $this->actingAs($user)
        ->delete(route('projects.destroy', $project));

    $this->assertDatabaseMissing('projects', [
        'id' => $project->id,
    ]);
});

it('does not allow a user to delete a project of another user', function () {
    $user = \Shared\Models\User::factory()->create();
    $otherUser = \Shared\Models\User::factory()->create();
    $project = \Shared\Models\Project::factory()->create(['user_id' => $otherUser->id]);

    $this->actingAs($user)
        ->delete(route('projects.destroy', $project))
        ->assertStatus(403);
});