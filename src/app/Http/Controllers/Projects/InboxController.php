<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use Shared\Data\ProjectData;
use Shared\Data\TaskData;
use Shared\Models\Project;

class InboxController extends Controller
{
    public function __invoke(Project $project)
    {
        return inertia('projects/inbox', [
            'project' => ProjectData::from($project),
            'tasks' => TaskData::collect($project->inbox()->get()),
        ]);
    }
}
