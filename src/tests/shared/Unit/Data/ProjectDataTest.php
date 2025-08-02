<?php

namespace Tests\Unit\Data;

use Shared\Data\CalendarEventData;
use Shared\Data\ProjectData;
use Shared\Models\Project;

it('can create a ProjectData from a Project', function () {
    $project = Project::factory()->create();

    $projectData = ProjectData::from($project);

    expect($projectData)
        ->toBeInstanceOf(ProjectData::class);
});