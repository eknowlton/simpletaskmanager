<?php

namespace App\Http\Controllers;

use Shared\Data\ProjectData;
use Shared\Data\ProjectStatusData;
use Shared\Data\TaskData;
use Shared\Data\TaskStatusData;
use Shared\Models\Project;
use Shared\ProjectStatus;
use Shared\TaskStatus;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{
    public function index()
    {
        return inertia('projects/index', [
            'projects' => ProjectData::collect(Project::withCount('tasks')
                ->withCount('completedTasks')
                ->withCount('pendingTasks')
                ->withCount('inProgressTasks')
                ->withCount('cancelledTasks')
                ->paginate(10)),
        ]);
    }

    public function create()
    {
        return inertia('projects/create')
            ->with('statuses', ProjectStatusData::collect(ProjectStatus::cases()));
    }

    public function store(StoreProjectRequest $request)
    {
        $project = Project::make($request->only([
            'title',
            'description',
            'status',
            'color',
            'icon'
        ]));

        $project->slug = str($request->title)->slug();

        $project->user()->associate($request->user());

        $project->save();

        return redirect()->route('projects.index');
    }

    public function show(Project $project)
    {
        return inertia('projects/show', [
            'project' => ProjectData::from($project),
            'tasks' => TaskData::collect($project->tasks),
            'project_statuses' => ProjectStatusData::collect(ProjectStatus::cases()),
            'task_statuses' => TaskStatusData::collect(TaskStatus::cases())
        ]);
    }

    public function edit(Project $project)
    {
        //
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    public function destroy(Project $project)
    {
        //
    }
}
