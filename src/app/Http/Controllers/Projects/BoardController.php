<?php

namespace App\Http\Controllers\Projects;

use App\Data\BoardColumnData;
use App\Data\BoardItemData;
use App\Data\ProjectData;
use App\Http\Controllers\Controller;
use App\Http\Requests\BoardStoreRequest;
use App\Models\Project;
use App\Models\Task;
use App\TaskStatus;
use Illuminate\Http\Request;

class BoardController extends Controller
{

    public function show(Request $request, Project $project)
    {
        return inertia('projects/board', [
            'project' => ProjectData::from($project),
            'columns' => collect(TaskStatus::cases())
                ->map(function (TaskStatus $status) use ($project, $request) {
                    return new BoardColumnData(
                        $status->value,
                        $status->label(),
                        "",
                        BoardItemData::collect(Task::forUser($request->user())
                            ->forProject($project)
                            ->withStatus($status)
                            ->get()),
                    );
                }),
        ]);
    }

    public function store(BoardStoreRequest $request, Project $project, Task $task)
    {
        $task->status = $request->input('status');
        $task->save();

        return response()->json([
            'columns' => collect(TaskStatus::cases())
                ->map(function (TaskStatus $status) use ($project, $request) {
                    return new BoardColumnData(
                        $status->value,
                        $status->label(),
                        "",
                        BoardItemData::collect(Task::forUser($request->user())
                            ->forProject($project)
                            ->withStatus($status)
                            ->get()),
                    );
                }),

        ], 206);
    }
}
