<?php

namespace App\Data;

use App\Models\Task;
use Spatie\LaravelData\Data;

/** 
 * @typescript BoardItem 
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class BoardItemData extends Data
{
    public function __construct(
        public int $id,
        public TaskData $data
    ) {}

    public static function fromTask(Task $task): self
    {
        return new self(
            $task->id,
            TaskData::from($task)
        );
    }
}
