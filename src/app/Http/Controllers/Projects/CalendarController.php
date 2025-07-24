<?php

namespace App\Http\Controllers\Projects;

use App\Data\CalendarEventData;
use App\Data\ProjectData;
use App\Http\Controllers\Controller;
use App\Models\Project;

class CalendarController extends Controller
{

    public function show(Project $project)
    {
        return inertia('projects/calendar', [
            'project' => ProjectData::from($project),
            'tasks' => CalendarEventData::collect($project->tasks),
        ]);
    }
}
