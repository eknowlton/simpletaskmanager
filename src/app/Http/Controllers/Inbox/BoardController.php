<?php


namespace App\Http\Controllers\Inbox;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\TaskStatus;
use Illuminate\Http\Request;

class BoardController extends Controller 
{

    public function show(Request $request)
    {
        return inertia('inbox/board', [
            'columns' => collect(TaskStatus::cases())->map(function (TaskStatus $status) {
                return [
                    'id' => $status->value,
                    'title' => $status->label(),
                    'color' => '',
                    'items' => Task::withStatus($status)->get()->map(function (Task $task) {
                        return $task->board;
                    }),
                ];
            }),
        ]);
    }
}