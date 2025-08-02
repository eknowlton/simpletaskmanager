<?php

namespace Tests\Shared\Unit\Models;

use Shared\Models\Project;
use Shared\Models\Task;
use Shared\TaskStatus;

it('can retrieve in-progress tasks', function () {
    $project = Project::factory()->create();
    Task::factory()->count(2)->create([
        'project_id' => $project->id,
        'status' => TaskStatus::InProgress,
    ]);
    Task::factory()->count(3)->create([
        'project_id' => $project->id,
        'status' => TaskStatus::Completed,
    ]);

    $inProgressTasks = $project->inProgressTasks;

    expect($inProgressTasks)->toHaveCount(2)
        ->and($inProgressTasks->first()->status)->toBe(TaskStatus::InProgress);
});

it('can retrieve cancelled tasks', function () {
    $project = Project::factory()->create();
    Task::factory()->count(1)->create([
        'project_id' => $project->id,
        'status' => TaskStatus::Cancelled,
    ]);
    Task::factory()->count(4)->create([
        'project_id' => $project->id,
        'status' => TaskStatus::Pending,
    ]);

    $cancelledTasks = $project->cancelledTasks;

    expect($cancelledTasks)->toHaveCount(1)
        ->and($cancelledTasks->first()->status)->toBe(TaskStatus::Cancelled);
});