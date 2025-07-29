<?php

namespace App\Policies;

use Shared\Models\Project;
use Shared\Models\User;

use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Project $project): Response
    {
        return $user->id == $project->user_id
            ? Response::allow()
            : Response::deny('You do not own this project.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Project $project): Response
    {
        dd($user->id, $project->user_id, $user->id === $project->user_id);
        return $user->id == $project->user_id
            ? Response::allow()
            : Response::deny('You do not own this project.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Project $project): Response
    {
        return $user->id == $project->user_id
            ? Response::allow()
            : Response::deny('You do not own this project.');
    }
}
