<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;

use Shared\Data\CalendarEventData;
use Shared\Data\ProjectData;
use Shared\Models\Project;

class CalendarController extends Controller
{

    public function show(Project $project)
    {
        return inertia('projects/calendar', [
            'project' => ProjectData::from($project),
            'events' => CalendarEventData::collect($project->tasks),
        ]);
    }
}
