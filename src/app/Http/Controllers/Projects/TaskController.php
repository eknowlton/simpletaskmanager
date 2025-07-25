<?php

namespace App\Http\Controllers\Projects;

use Shared\Data\ProjectData;
use Shared\Data\TaskStatusData;
use Shared\Models\Project;
use Shared\Models\Task;
use Shared\TaskStatus;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function create(Request $request, Project $project)
    {
        return inertia('projects/tasks/create')
            ->with('projects', ProjectData::collect($request->user()->projects))
            ->with('project', ProjectData::from($project))
            ->with('statuses', TaskStatusData::collect(TaskStatus::cases()));
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
