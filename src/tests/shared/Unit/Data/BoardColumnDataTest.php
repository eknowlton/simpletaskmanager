<?php

namespace Tests\Shared\Unit\Models;

use Shared\Data\BoardColumnData;
use Shared\Data\BoardItemData;
use Shared\Models\Task;

it('can create a BoardColumnData from a task', function () {

    $tasks = Task::factory()->count(3)->create();

    $boardColumnData = BoardColumnData::from([
        'id' => 'column-1',
        'title' => 'Column 1',
        'color' => 'blue',
        'items' => BoardItemData::collect($tasks)
    ]);

    expect($boardColumnData)
        ->toBeInstanceOf(BoardColumnData::class);

});