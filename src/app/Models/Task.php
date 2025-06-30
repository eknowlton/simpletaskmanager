<?php

namespace App\Models;

use App\TaskStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $casts = [
        'due_date' => 'datetime',
        'status' => TaskStatus::class,
    ];
    protected $fillable = [
        'title',
        'description',
        'due_date',
        'status',
        'priority',
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

    public function getDueDateAttribute($value)
    {
        return $value ? \Carbon\Carbon::parse($value)->format("Y-m-d") : null;
    }

    public function getStatusLabelAttribute()
    {
        return $this->status->label();
    }
}
