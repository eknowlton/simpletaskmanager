<?php

namespace Shared\Data;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/** 
 * @typescript User
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class UserData extends Data
{
    public function __construct(
        public int $id,


        public string $name,
        public string $email,

        public CarbonImmutable $created_at,
        public CarbonImmutable $updated_at,
    ) {}
}
