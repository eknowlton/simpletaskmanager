<?php

namespace App\Http\Controllers\Projects;

use Shared\Data\ProjectData;
use Shared\Models\Project;
use Shared\Models\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function create(Request $request, Project $project)
    {
        return inertia('projects/tasks/create', [
            'projects' => ProjectData::collect($request->user()->projects),
            'project' => ProjectData::from($project),
        ]);
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
