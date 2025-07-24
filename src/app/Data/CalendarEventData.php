<?php

namespace App\Data;

use App\Models\Task;
use Carbon\CarbonImmutable;
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
        public CarbonImmutable $start,
        public CarbonImmutable $end,
        public TaskData $data
    ) {}

    public static function fromTask(Task $task): self
    {
        return new self(
            $task->id,
            $task->title,
            $task->due_date,
            $task->due_date,
            TaskData::from($task)
        );
    }
}
