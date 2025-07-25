<?php

namespace Api\Http\Controllers;

use Api\Http\Requests\StoreProjectRequest;
use Api\Http\Requests\UpdateProjectRequest;
use Shared\Data\ProjectData;
use Shared\Models\Project;

use Illuminate\Support\Facades\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        return $this->success(
            ProjectData::collect(Project::query()->paginate($request->get('per_page', 10)))
        );
    }

    public function show(Project $project)
    {
        return $this->success(
            ProjectData::collect($project)
        );
    }

    public function store(StoreProjectRequest $request)
    {
        $project = new Project($request->all());
        $project->user()->associate($request->user());
        $project->save();

        return $this->success(
            ProjectData::collect($project),
            201
        );
    }

    public function update(Project $project, UpdateProjectRequest $request)
    {
        return $this->success(
            ProjectData::collect(
                $project->update($request->all())
            ),
            204
        );
    }

    public function destroy(Project $project)
    {
        return $this->result(
            $project->delete(),
            204
        );
    }
}
