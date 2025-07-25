<?php

namespace Shared\Data;

use Shared\Models\Task;
use Carbon\Carbon;
use Spatie\LaravelData\Data;

/** 
 * @typescript CalendarEvent
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class CalendarEventData extends Data
{
    public function __construct(
        public string $id,
        public string $title,
        public string $color,
        public ?Carbon $start = null,
        public ?Carbon $end = null,
        public TaskData $data
    ) {}

    public static function fromTask(Task $task): self
    {
        return new self(
            $task->id,
            $task->title,
            'white',
            $task->due_date,
            $task->due_date,
            TaskData::from($task)
        );
    }
}
