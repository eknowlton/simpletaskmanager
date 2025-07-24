<?php


namespace App\Http\Controllers\Inbox;

use App\Http\Controllers\Controller;
use App\Http\Requests\BoardStoreRequest;
use App\Models\Task;
use App\TaskStatus;
use Illuminate\Http\Request;

class BoardController extends Controller
{

    public function show(Request $request)
    {
        return inertia('inbox/board', [
            'statuses' => collect(TaskStatus::cases())->map(function (TaskStatus $status) {
                return [
                    'value' => $status->value,
                    'label' => $status->label(),
                ];
            }),
            'columns' => collect(TaskStatus::cases())->map(function (TaskStatus $status) use ($request) {
                return [
                    'id' => $status->value,
                    'title' => $status->label(),
                    'color' => '',
                    'items' => Task::forUser($request->user())->withStatus($status)->get()->map(function (Task $task) {
                        return $task->board;
                    }),
                ];
            }),
        ]);
    }

    public function store(BoardStoreRequest $request, Task $task)
    {
        $task->status = $request->input('status');
        $task->save();

        return response()->json([
            'columns' => collect(TaskStatus::cases())->map(function (TaskStatus $status) use ($request) {
                return [
                    'id' => $status->value,
                    'title' => $status->label(),
                    'color' => '',
                    'items' => Task::forUser($request->user())->withStatus($status)->get()->map(function (Task $task) {
                        return $task->board;
                    }),
                ];
            })
        ], 206);
    }
}

