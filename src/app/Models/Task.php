<?php

namespace App\Models;

use App\TaskStatus;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

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

    protected $appends = [
        'status_label',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getStatusLabelAttribute()
    {
        return $this->status->label();
    }

    public function scopeInboxFor(Builder $query, User $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function scopeTwoMinuteFor(Builder $query, User $user)
    {
        return $this->inboxFor($user)
        ->whereJsonContains('tags', ['value' => 'two-minute']);
    }

    public function getCalendarAttribute()
    {
        return (object) [
            'id' => $this->id,
            'start' => $this->due_date,
            'end' => $this->due_date,
            'title' => $this->title,
            'color' => $this->project?->color,
        ];
    }
}
