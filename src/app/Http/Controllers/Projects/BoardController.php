<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class BoardController extends Controller 
{

    public function show(Request $request, Project $project)
    {
        return inertia('projects/board', [
            'project' => $project,
            'tasks' => $project->tasks,
        ]);
    }
}