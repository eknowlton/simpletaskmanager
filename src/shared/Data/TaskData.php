<?php

namespace Shared\Data;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** 
 * @typescript Task
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class TaskData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string $description,
        public ?CarbonImmutable $due_date = null,
        public TaskStatusData $status,
        public int $priority,
        public ?int $project_id = null,

        /** @var \Shared\Data\TaskAuditData[] */
        public ?array $audits = [],

        /** @var \Shared\Data\TagData[] */
        public ?array $tags = [],

        public CarbonImmutable $created_at,
        public CarbonImmutable $updated_at,
    ) {}
}
