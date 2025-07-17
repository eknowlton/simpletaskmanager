<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use App\TaskStatus;
use Illuminate\Http\Request;

class BoardController extends Controller 
{

    public function show(Request $request, Project $project)
    {
        return inertia('projects/board', [
            'project' => $project,
            'columns' => collect(TaskStatus::cases())->map(function (TaskStatus $status) use ($project) {
                return [
                    'id' => $status->value,
                    'title' => $status->label(),
                    'color' => '',
                    'items' => Task::forProject($project)->withStatus($status)->get()->map(function (Task $task) {
                        return $task->board;
                    }),
                ];
            }),
        ]);
    }
}