<?php

namespace Shared\Models;

use Shared\ProjectStatus;
use Shared\TaskStatus;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Project extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'status',
        'color',
        'icon',
    ];

    protected $casts = [
        'status' => ProjectStatus::class,
    ];

    protected $appends = [
        'status_label',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function completedTasks()
    {
        return $this->hasMany(Task::class)->where('status', TaskStatus::Completed);
    }

    public function pendingTasks()
    {
        return $this->hasMany(Task::class)->where('status', TaskStatus::Pending);
    }

    public function inProgressTasks()
    {
        return $this->hasMany(Task::class)->where('status', TaskStatus::InProgress);
    }

    public function cancelledTasks()
    {
        return $this->hasMany(Task::class)->where('status', TaskStatus::Cancelled);
    }


    public function getStatusLabelAttribute()
    {
        return $this->status->label();
    }

    public function scopeTasksWithStatus(Builder $query, TaskStatus $status)
    {
        return $query->whereHas('tasks', function ($q) use ($status) {
            $q->where('status', $status);
        });
    }

    public function scopeForUser(Builder $query, User $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function inbox()
    {
        return $this->tasks()->inbox();
    }
}
