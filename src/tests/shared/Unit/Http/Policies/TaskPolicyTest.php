<?php

namespace Tests\Unit\Http\Policies;

use Shared\Models\Project;
use Shared\Models\Task;
use Shared\Models\User;
use Shared\TaskStatus;
use Tests\TestCase;

it('allows a user to create a task', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $policy = new \App\Policies\TaskPolicy();
    $result = $policy->create($user, $project);
    $this->assertTrue($result->allowed());
});

it('allows a user to update their own task', function () {
    $user = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $user->id]);

    $policy = new \App\Policies\TaskPolicy();
    $result = $policy->update($user, $task);
    $this->assertTrue($result->allowed());
});

it('denies a user to update a task of another user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $otherUser->id]);

    $policy = new \App\Policies\TaskPolicy();
    $result = $policy->update($user, $task);
    $this->assertFalse($result->allowed());
});

it('allows a user to view their own task', function () {
    $user = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $user->id]);

    $policy = new \App\Policies\TaskPolicy();
    $result = $policy->view($user, $task);
    $this->assertTrue($result->allowed());
});

it('denies a user to view a task of another user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $otherUser->id]);

    $policy = new \App\Policies\TaskPolicy();
    $result = $policy->view($user, $task);
    $this->assertFalse($result->allowed());
});

it('allows a user to delete their own task', function () {
    $user = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $user->id]);

    $policy = new \App\Policies\TaskPolicy();
    $result = $policy->delete($user, $task);
    $this->assertTrue($result->allowed());
});

it('denies a user to delete a task of another user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $otherUser->id]);

    $policy = new \App\Policies\TaskPolicy();
    $result = $policy->delete($user, $task);
    $this->assertFalse($result->allowed());
});