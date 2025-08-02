<?php


namespace App\Http\Controllers\Inbox;

use Shared\Data\BoardColumnData;
use Shared\Data\BoardItemData;
use Shared\Data\TaskStatusData;
use Shared\Models\Task;
use Shared\TaskStatus;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBoardRequest;

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

    public function store(StoreBoardRequest $request, Task $task)
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
