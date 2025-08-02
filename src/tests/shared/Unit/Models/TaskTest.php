<?php

namespace Tests\Shared\Unit\Models;

use Shared\Models\Task;
use Shared\Models\Project;
use Shared\Models\User;
use Shared\TaskStatus;

it('can retrieve the associated project', function () {
    $project = Project::factory()->create();
    $task = Task::factory()->create(['project_id' => $project->id]);

    expect($task->project)->toBeInstanceOf(Project::class);
    expect($task->project->id)->toBe($project->id);
});

it('can retrieve the associated user', function () {
    $user = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $user->id]);

    expect($task->user)->toBeInstanceOf(User::class);
    expect($task->user->id)->toBe($user->id);
});

it('can scope completed tasks', function () {
    Task::factory()->create(['status' => TaskStatus::Completed]);
    Task::factory()->create(['status' => TaskStatus::Pending]);

    $completedTasks = Task::completed()->get();

    expect($completedTasks)->toHaveCount(1);
    expect($completedTasks->first()->status)->toBe(TaskStatus::Completed);
});

it('can scope tasks with a specific status', function () {
    Task::factory()->create(['status' => TaskStatus::InProgress]);
    Task::factory()->create(['status' => TaskStatus::Pending]);

    $inProgressTasks = Task::withStatus(TaskStatus::InProgress)->get();

    expect($inProgressTasks)->toHaveCount(1);
    expect($inProgressTasks->first()->status)->toBe(TaskStatus::InProgress);
});

it('can scope tasks in the inbox', function () {
    $task1 = Task::factory()->create(['due_date' => now()->addDay(), 'created_at' => now()->subDay()]);
    $task2 = Task::factory()->create(['due_date' => now()->addDays(2), 'created_at' => now()]);

    $inboxTasks = Task::inbox()->get();

    expect($inboxTasks->first()->id)->toBe($task1->id);
    expect($inboxTasks->last()->id)->toBe($task2->id);
});

it('can scope tasks for a specific project', function () {
    $project = Project::factory()->create();
    Task::factory()->create(['project_id' => $project->id]);
    Task::factory()->create();

    $projectTasks = Task::forProject($project)->get();

    expect($projectTasks)->toHaveCount(1);
    expect($projectTasks->first()->project_id)->toBe($project->id);
});

it('can scope tasks for a specific user', function () {
    $user = User::factory()->create();
    Task::factory()->create(['user_id' => $user->id]);
    Task::factory()->create();

    $userTasks = Task::forUser($user)->get();

    expect($userTasks)->toHaveCount(1);
    expect($userTasks->first()->user_id)->toBe($user->id);
});

it('can scope two-minute tasks for a specific user', function () {
    $user = User::factory()->create();
    Task::factory()->create(['user_id' => $user->id, 'tags' => [ ['value' => 'two-minute'] ]]);
    Task::factory()->create(['user_id' => $user->id, 'tags' => [ ['value' => 'other-tag'] ]]);

    $twoMinuteTasks = Task::twoMinuteFor($user)->get();

    expect($twoMinuteTasks)->toHaveCount(1);
    expect($twoMinuteTasks->first()->tags)->toContain(['value' => 'two-minute']);
});