<?php

namespace Shared\Data;

use Shared\ProjectStatus;
use Spatie\LaravelData\Data;

/** 
 * @typescript ProjectStatus
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class ProjectStatusData extends Data
{
    public function __construct(
        public string $label,
        public ProjectStatus $value
    ) {}

    public static function fromProjectStatus(ProjectStatus $status): self
    {
        return new self(
            $status->label(),
            ProjectStatus::from($status->value),
        );
    }
}
