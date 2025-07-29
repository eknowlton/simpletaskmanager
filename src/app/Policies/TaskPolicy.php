<?php

namespace App\Policies;

use Shared\Models\Task;
use Shared\Models\User;

use Illuminate\Auth\Access\Response;

class TaskPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Task $task): Response
    {
        return $user->id == $task->user_id
            ? Response::allow()
            : Response::deny('You do not own this task.');
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
    public function update(User $user, Task $task): Response
    {
        $ownsProject = $task?->project?->user_id == $user->id;
        $ownsTask = $user->id == $task->user_id;

        return $ownsTask || $ownsProject
            ? Response::allow()
            : Response::deny('You do not own this task.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task): Response
    {
        return $task->user_id == $user->id
            ? Response::allow()
            : Response::deny('You do not own this task.');
    }
}
