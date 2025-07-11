<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\TaskStatus;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        return inertia('tasks/index', [
            'tasks' => $request->user()->tasks()->orderBy('created_at', 'desc')->paginate(5)
        ]);
    }

    public function create(Request $request)
    {
        return inertia('tasks/create')
            ->with('projects', $request->user()->projects)
            ->with('statuses', collect(TaskStatus::cases())->map(fn($status) => [
                'value' => $status->value,
                'name' => $status->label(),
            ]));
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


        return redirect()->route('tasks.index');
    }

    public function show(Request $request, Task $task)
    {
        return inertia('tasks/show', [
            'task' => $task,
            'projects' => $request->user()->projects,
            'statuses' => collect(TaskStatus::cases())->map(fn($status) => [
                    'value' => $status->value,
                    'name' => $status->label(),
                ])->toArray()
            ]);
    }

    public function edit(Task $task)
    {
        //
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    public function destroy(Task $task)
    {
        //
    }
}
