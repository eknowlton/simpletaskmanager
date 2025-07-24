<?php

namespace App\Data;

use Spatie\LaravelData\Data;

/** 
 * @typescript Tag
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class TagData extends Data
{
    public function __construct(
        public string $label,
        public string $value
    ) {}

    public static function fromTag($tag): self
    {
        return new self(
            $tag['label'],
            $tag['value'],
        );
    }
}
