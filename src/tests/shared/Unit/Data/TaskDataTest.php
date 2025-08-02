<?php

namespace Tests\Unit\Data;

use Shared\Data\TaskData;
use Shared\Models\Task;

it('can create a TaskData from a Task', function () {
    $task = Task::factory()->create();

    $taskData = TaskData::from($task);

    expect($taskData)
        ->toBeInstanceOf(TaskData::class);
});