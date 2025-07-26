<?php

namespace Api\Http\Controllers;

use Api\Http\Requests\StoreProjectRequest;
use Api\Http\Requests\UpdateProjectRequest;
use Shared\Data\ProjectData;
use Shared\Models\Project;

use Illuminate\Support\Facades\Request;

class ProjectController extends Controller
{
    /**
     * Show All Projects
     * @response array{success: bool, data: array<ProjectData>}
     */
    public function index(Request $request)
    {
        return $this->success(
            ProjectData::collect(
                Project::forUser($request->user())
                    ->paginate()
            )
        );
    }

    /**
     * Show Project
     * @response array{success: bool, data: ProjectData}
     */
    public function show(Project $project)
    {
        return $this->success(
            ProjectData::collect($project)
        );
    }

    /**
     * Store Project
     * @response array{success: bool, data: ProjectData}
     */
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

    /**
     * Update Project
     * @response array{success: bool, data: ProjectData}
     */
    public function update(Project $project, UpdateProjectRequest $request)
    {
        return $this->success(
            ProjectData::collect(
                $project->update($request->all())
            ),
            204
        );
    }

    /**
     * Delete Project
     * @response array{success: bool}
     */
    public function destroy(Project $project)
    {
        return $this->result(
            $project->delete(),
            204
        );
    }
}
