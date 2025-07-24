<?php


namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Project;

class CalendarController extends Controller
{

    public function show(Project $project)
    {
        return inertia('projects/calendar', [
            'project' => $project,
            'tasks' => $project->tasks->map(function ($task) {
                return $task->calendar;
            }),
        ]);
    }
}

