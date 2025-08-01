<?php

namespace App\Http\Controllers\Projects;

use Shared\Data\BoardColumnData;
use Shared\Data\BoardItemData;
use Shared\Data\ProjectData;
use Shared\Models\Project;
use Shared\Models\Task;
use Shared\TaskStatus;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBoardRequest;

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
                        BoardItemData::collect(
                            Task::forProject($project)
                                ->where('status', $status)
                                ->get()
                        ),
                    );
                }),
        ]);
    }

    public function store(StoreBoardRequest $request, Project $project, Task $task)
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
