<?php

namespace Shared\Models;

use Shared\TaskStatus;

use App\Http\Requests\FilterTasksRequest;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use OwenIt\Auditing\Contracts\Auditable;

class Task extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

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

    public function scopeInboxFor(Builder $query, User $user)
    {
        return $query->where('user_id', $user->id)
            ->orderBy('due_date')
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
        return $this->inboxFor($user)
            ->whereJsonContains('tags', ['value' => 'two-minute']);
    }

    public function scopeByFilter(Builder $query, FilterTasksRequest $request)
    {
        return $query->when($request->status, function ($query) use ($request) {
            return $query->where('status', $request->status);
        })
            ->when($request->search, function ($query) use ($request) {
                return $query->where('title', 'like', '%' . $request->search . '%');
            })
            ->when($request->tags, function ($query) use ($request) {
                return $query->whereJsonContains('tags', $request->tags);
            });
    }
}
