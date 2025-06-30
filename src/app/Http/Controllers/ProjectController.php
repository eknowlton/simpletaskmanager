<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\ProjectStatus;

class ProjectController extends Controller
{
    public function index()
    {
        return inertia('projects/index', [
            'projects' => Project::paginate(10),
        ]);
    }

    public function create()
    {
        return inertia('projects/create')
            ->with('statuses', collect(ProjectStatus::cases())->map(fn($status) => [
                'value' => $status->value,
                'name' => $status->label(),
            ]));
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
            'project' => $project
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
