
<?php

namespace App\Data;

use Spatie\LaravelData\Data;

/** 
 * @typescript BoardColumn 
 * @typescript-transformer Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer
 */
class BoardColumnData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string $color,

        /** @var \App\Data\BoardItemData[] */
        public array $items
    ) {}
}
