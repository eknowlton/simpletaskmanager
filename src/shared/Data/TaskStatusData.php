<?php

namespace Shared\Data;

use Shared\TaskStatus;
use Spatie\LaravelData\Data;

/** 
 * @typescript TaskStatus
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
