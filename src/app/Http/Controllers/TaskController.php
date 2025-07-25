<?php

namespace App\Http\Controllers;

use App\Data\ProjectData;
use App\Data\TaskData;
use App\Data\TaskStatusData;
use App\Http\Requests\FilterTasksRequest;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\DeleteTaskRequest;
use App\Models\Task;
use App\TaskStatus;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(FilterTasksRequest $request)
    {
        return inertia('tasks/index')
            ->with(
                'tasks',
                TaskData::collect($request->user()->tasks()
                    ->orderBy('created_at', 'desc')
                    ->paginate(5)),
            )
            ->with('statuses', TaskStatusData::collect(TaskStatus::cases()));
    }

    public function create(Request $request)
    {
        return inertia('tasks/create')
            ->with('projects', ProjectData::collect($request->user()->projects))
            ->with('statuses', TaskStatusData::collect(TaskStatus::cases()));
    }

    public function store(StoreTaskRequest $request)
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
            $task->project()->associate($request->project_id);
        }

        $request->user()->tasks()->save($task);


        return redirect()->back();
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'status' => $request->status,
            'priority' => $request->priority,
            'tags' => $request->tags,
        ]);

        $task->project()->associate($request->project_id);

        return redirect()->back();
    }

    public function destroy(DeleteTaskRequest $request, Task $task)
    {
        //
    }
}
