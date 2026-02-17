<?php

namespace Shared\Data;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;

/**
 * @typescript Task
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class TaskData extends Data
{
    public function __construct(
        public ?string $id = null,
        public string $title,
        public string $description,
        public ?CarbonImmutable $planned_on = null,
        public TaskStatusData $status,
        public int $priority,
        public ?string $project_id = null,

        /** @var \Shared\Data\TaskAuditData[] */
        public ?array $audits = [],

        /** @var \Shared\Data\TagData[] */
        public ?array $tags = [],

        public CarbonImmutable $created_at,
        public CarbonImmutable $updated_at,
    ) {}
}
