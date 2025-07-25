<?php

namespace Api\Http\Controllers\Projects;

use Shared\Data\TaskData;
use Shared\Models\Task;

use Api\Http\Controllers\Controller;
use Api\Http\Requests\Projects\StoreTaskRequest;
use Api\Http\Requests\Projects\UpdateTaskRequest;
use Illuminate\Support\Facades\Request;
use Shared\Data\ProjectData;
use Shared\Models\Project;

class TaskController extends Controller
{
    public function index(Project $project, Request $request)
    {
        return $this->success(
            [
                'project' => ProjectData::collect($project),
                'tasks' => TaskData::collect($project->tasks()->paginate($request->get('per_page', 10)))
            ]
        );
    }

    public function show(Project $project, Task $task)
    {
        return $this->success(
            [
                'project' => ProjectData::collect($project),
                'task' => TaskData::collect($task)
            ]
        );
    }

    public function store(Project $project, StoreTaskRequest $request)
    {
        $task = new Task($request->all());
        $task->project()->associate($project);
        $task->user()->associate($request->user());
        $task->save();

        return $this->success(
            [
                'project' => ProjectData::collect($project),
                'task' => TaskData::collect($task)
            ],
            201
        );
    }

    public function update(Project $project, Task $task, UpdateTaskRequest $request)
    {
        return $this->success(
            TaskData::collect(
                $task->update($request->all())
            ),
            204
        );
    }

    public function destroy(Project $project, Task $task)
    {
        return $this->result(
            $task->delete(),
            204
        );
    }
}
