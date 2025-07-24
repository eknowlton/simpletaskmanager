<?php

namespace App\Data;

use App\Models\Task;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;

/** 
 * @typescript BoardItem 
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class BoardItemData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string $description,
        public CarbonImmutable $due_date,
        public TaskStatusData $status,
    ) {}

    public static function fromTask(Task $task): self
    {
        return new self(
            $task->id,
            $task->title,
            $task->description,
            $task->due_date,
            TaskStatusData::from($task->status),
        );
    }
}
