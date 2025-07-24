<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\ProjectStatus;
use App\TaskStatus;
use Illuminate\Database\Eloquent\Attributes\Scope;

class Project extends Model
{
    use HasFactory;

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

    #[Scope]
    public function tasksWithStatus($query, TaskStatus $status)
    {
        return $query->whereHas('tasks', function ($q) use ($status) {
            $q->where('status', $status);
        });
    }
}
