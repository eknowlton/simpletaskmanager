<?php

namespace App\Data;

use App\TaskStatus;
use Spatie\LaravelData\Data;

/** 
 * @typescript
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class TaskStatusData extends Data
{
    public function __construct(
        public string $label,
        public TaskStatus $value
    ) {}

    public static function fromTaskStatus(TaskStatus $status): self
    {
        return new self(
            $status->label(),
            TaskStatus::from($status->value),
        );
    }
}
