<?php


namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Http\Resources\CalendarResource;
use App\Models\Project;
use Illuminate\Http\Request;

class CalendarController extends Controller 
{

    public function show(Request $request, Project $project)
    {
        return inertia('projects/calendar', [
            'project' => $project,
            'tasks' => $project->tasks->map(function ($task) {
                return $task->calendar;
            }),
        ]);
    }
}