<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\ProjectStatus;

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

    public function getStatusLabelAttribute()
    {
        return $this->status->label();
    }
}
