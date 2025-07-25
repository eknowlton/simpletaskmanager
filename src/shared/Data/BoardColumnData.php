<?php

namespace Shared\Data;

use Spatie\LaravelData\Data;

/** 
 * @typescript BoardColumn 
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class BoardColumnData extends Data
{
    public function __construct(
        public string $id,
        public string $title,
        public string $color,

        /** @var \Shared\Data\BoardItemData[] */
        public $items
    ) {}
}
