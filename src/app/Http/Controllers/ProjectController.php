<?php

namespace App\Http\Controllers;

use Shared\Data\ProjectData;
use Shared\Data\TaskData;
use Shared\Models\Project;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        return inertia('projects/index', [
            'projects' => ProjectData::collect(Project::forUser($request->user())
                ->withCount('tasks')
                ->withCount('completedTasks')
                ->withCount('pendingTasks')
                ->withCount('inProgressTasks')
                ->withCount('cancelledTasks')
                ->paginate(10)),
        ]);
    }

    public function create()
    {
        return inertia('projects/create');
    }

    public function store(StoreProjectRequest $request)
    {
        $project = new Project($request->only([
            'title',
            'description',
            'status',
            'color',
            'icon'
        ]));

        $slug = str($request->title)->slug();

        while (Project::where('slug', $slug)->exists()) {
            $slug = str($request->title)->slug() . '-' . uniqid();
        }

        $project->slug = $slug;

        $project->user()->associate($request->user());

        $project->save();

        return response(null, 201);
    }

    public function show(Project $project)
    {
        return inertia('projects/show', [
            'project' => ProjectData::from($project),
            'tasks' => TaskData::collect($project->tasks()->paginate()),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->fill($request->only([
            'title',
            'description',
            'status',
            'color',
            'icon'
        ]));

        $project->slug = str($request->title)->slug();
        $project->save();
    }

    public function destroy(Project $project)
    {
        //
    }
}
