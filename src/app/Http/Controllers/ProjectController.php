<?php

namespace App\Http\Controllers;

use App\Data\ProjectData;
use App\Data\ProjectStatusData;
use App\Data\TaskData;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\ProjectStatus;

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
            'statuses' => ProjectStatusData::collect(ProjectStatus::cases())
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
