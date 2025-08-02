<?php

namespace Shared\Models;

use Database\Factories\TaskFactory;
use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Shared\TaskStatus;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use OwenIt\Auditing\Contracts\Auditable;

#[UseFactory(TaskFactory::class)]
class Task extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable, HasUuids;

    protected $table = 'tasks';

    protected $casts = [
        'due_date' => 'datetime',
        'status' => TaskStatus::class,
        'tags' => 'json'
    ];

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'status',
        'priority',
        'tags',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeCompleted(Builder $query)
    {
        return $query->where('status', TaskStatus::Completed);
    }

    public function scopeWithStatus(Builder $query, TaskStatus $status)
    {
        return $query->where('status', $status);
    }

    public function scopeInbox(Builder $query)
    {
        return $query->orderBy('due_date')
            ->orderBy('created_at');
    }

    public function scopeForProject(Builder $query, Project $project)
    {
        return $query->where('project_id', $project->id);
    }

    public function scopeForUser(Builder $query, User $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function scopeTwoMinuteFor(Builder $query, User $user)
    {
        return $query->forUser($user)->inbox()
            ->whereJsonContains('tags', ['value' => 'two-minute']);
    }
}
