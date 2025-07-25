<?php

namespace Shared\Data;

use App\Models\Project;
use Carbon\Carbon;
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
        public Carbon $created_at,
        public Carbon $updated_at,
        public int $tasks_count = 0,
        public int $completed_tasks_count = 0,
    ) {}

    public static function fromProject(Project $project): self
    {
        return new self(
            $project->id,
            $project->title,
            $project->slug,
            $project->description,
            $project->color,
            $project->icon,
            ProjectStatusData::from($project->status),
            $project->created_at,
            $project->updated_at,
            $project->tasks()->count() ?? 0,
            $project->tasks()->completed()->count() ?? 0,
        );
    }
}
