<?php

namespace Tests\Unit\Data;

use Shared\Data\CalendarEventData;
use Shared\Models\Task;

it('can create a CalendarEventData from a Task', function () {
    $task = Task::factory()->create();

    $calendarEventData = CalendarEventData::fromTask($task);

    expect($calendarEventData)
        ->toBeInstanceOf(CalendarEventData::class);
});