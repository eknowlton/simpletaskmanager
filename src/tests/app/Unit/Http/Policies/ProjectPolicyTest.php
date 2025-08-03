<?php

namespace Tests\App\Unit\Http\Policies;

use Shared\Models\Project;
use Shared\Models\User;

it('allows a user to create a project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $policy = new \App\Policies\ProjectPolicy();
    $result = $policy->create($user, $project);
    $this->assertTrue($result->allowed());
});

it('allows a user to update their own project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create(['user_id' => $user->id]);

    $policy = new \App\Policies\ProjectPolicy();
    $result = $policy->update($user, $project);
    $this->assertTrue($result->allowed());
});

it('denies a user to update a project of another user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $project = Project::factory()->create(['user_id' => $otherUser->id]);

    $policy = new \App\Policies\ProjectPolicy();
    $result = $policy->update($user, $project);
    $this->assertFalse($result->allowed());
});

it('allows a user to view their own project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create(['user_id' => $user->id]);

    $policy = new \App\Policies\ProjectPolicy();
    $result = $policy->view($user, $project);
    $this->assertTrue($result->allowed());
});

it('denies a user to view a project of another user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $project = Project::factory()->create(['user_id' => $otherUser->id]);

    $policy = new \App\Policies\ProjectPolicy();
    $result = $policy->view($user, $project);
    $this->assertFalse($result->allowed());
});

it('allows a user to delete their own project', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create(['user_id' => $user->id]);

    $policy = new \App\Policies\ProjectPolicy();
    $result = $policy->delete($user, $project);
    $this->assertTrue($result->allowed());
});

it('denies a user to delete a project of another user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $project = Project::factory()->create(['user_id' => $otherUser->id]);

    $policy = new \App\Policies\ProjectPolicy();
    $result = $policy->delete($user, $project);
    $this->assertFalse($result->allowed());
});