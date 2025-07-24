<?php

namespace App\Data;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;

/** 
 * @typescript Project
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class ProjectData extends Data
{
    public function __construct(
        public string $id,
        public string $title,
        public string $slug,
        public ?string $description = null,
        public ?string $color = '#2596be',
        public ?string $icon = null,
        public ProjectStatusData $status,
        public CarbonImmutable $created_at,
        public CarbonImmutable $updated_at,
    ) {}
}
