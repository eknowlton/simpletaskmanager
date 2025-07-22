<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Models\Project;
use App\Models\Task;
use App\TaskStatus;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function create(Request $request, Project $project)
    {
        return inertia('projects/tasks/create')
            ->with('projects', $request->user()->projects)
            ->with('project', $project)
            ->with('statuses', collect(TaskStatus::cases())->map(fn($status) => [
                'value' => $status->value,
                'name' => $status->label(),
            ]));
    }

    public function store(StoreTaskRequest $request, Project $project)
    {
        $task = Task::make([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'status' => $request->status,
            'priority' => $request->priority,
            'tags' => $request->tags,
        ]);

        if ($request->has('project_id')) {
            $task->project()->associate($project->id);
        }

        $request->user()->tasks()->save($task);

        return redirect()->route('projects.show', [$project]);
    }
}
