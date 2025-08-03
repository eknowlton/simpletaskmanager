<?php

namespace App\Http\Controllers;

use Shared\Data\ProjectData;
use Shared\Data\TaskData;
use Shared\Models\Task;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\DeleteTaskRequest;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        return inertia('tasks/index', [
            'tasks' => TaskData::collect($request->user()->tasks()
                ->orderBy('created_at', 'desc')
                ->paginate(5)),
        ]);
    }

    public function create(Request $request)
    {
        return inertia('tasks/create', [
            'projects' => ProjectData::collect($request->user()->projects)
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = new Task($request->except('project_id'));

        $task->project()->associate($request->project_id);

        $request->user()->tasks()->save($task);

        return response(null, 201);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->fill($request->except('project_id'));

        $task->project()->associate($request->project_id);

        $task->save();
    }

    public function destroy(DeleteTaskRequest $request, Task $task)
    {
        $task->delete();

        return response(null, 204);
    }
}
