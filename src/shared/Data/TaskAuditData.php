<?php

namespace Shared\Data;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\TypeScriptTransformer\Attributes\TypeScriptType;

/** 
 * @typescript TaskAudit
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class TaskAuditData extends Data
{
    public function __construct(
        public int $id,
        public string $event,
        public string $description,
        #[TypeScriptType([
            '[key: string]' => 'value: string',
        ])]
        public array $old_values,

        #[TypeScriptType([
            '[key: string]' => 'value: string',
        ])]
        public array $new_values,

        public CarbonImmutable $created_at,
        public CarbonImmutable $updated_at,
    ) {}
}
