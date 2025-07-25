<?php


namespace App\Http\Controllers\Inbox;

use App\Data\BoardColumnData;
use App\Data\BoardItemData;
use App\Data\TaskStatusData;
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
            'statuses' => TaskStatusData::collect(TaskStatus::cases()),
            'columns' => collect(TaskStatus::cases())->map(function (TaskStatus $status) use ($request) {
                return new BoardColumnData(
                    $status->value,
                    $status->label(),
                    "",
                    BoardItemData::collect(Task::forUser($request->user())
                        ->withStatus($status)
                        ->get()),
                );
            }),
        ]);
    }

    public function store(BoardStoreRequest $request, Task $task)
    {
        $task->status = $request->input('status');
        $task->save();

        return response()->json([
            'columns' => collect(TaskStatus::cases())->map(function (TaskStatus $status) use ($request) {
                return new BoardColumnData(
                    $status->value,
                    $status->label(),
                    "",
                    BoardItemData::collect(Task::forUser($request->user())
                        ->withStatus($status)
                        ->get()),
                );
            })
        ], 206);
    }
}
