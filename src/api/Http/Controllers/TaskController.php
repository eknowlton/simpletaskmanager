<?php

namespace Api\Http\Controllers;

use Api\Http\Requests\StoreTaskRequest;
use Api\Http\Requests\UpdateTaskRequest;
use Shared\Data\TaskData;
use Shared\Models\Task;

use Illuminate\Support\Facades\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        return $this->success(
            TaskData::collect(Task::query()->paginate($request->get('per_page', 10)))
        );
    }

    public function show(Task $task)
    {
        return $this->success(
            TaskData::collect($task)
        );
    }

    public function store(StoreTaskRequest $request)
    {
        $task = new Task($request->all());
        $task->user()->associate($request->user());
        $task->save();

        return $this->success(
            TaskData::collect($task),
            201
        );
    }

    public function update(Task $task, UpdateTaskRequest $request)
    {
        return $this->success(
            TaskData::collect(
                $task->update($request->all())
            ),
            204
        );
    }

    public function destroy(Task $task)
    {
        return $this->result(
            $task->delete(),
            204
        );
    }
}
