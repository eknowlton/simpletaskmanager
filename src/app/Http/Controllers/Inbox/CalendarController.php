<?php


namespace App\Http\Controllers\Inbox;

use App\Http\Controllers\Controller;
use App\Http\Resources\CalendarResource;
use Illuminate\Http\Request;

class CalendarController extends Controller 
{

    public function show(Request $request)
    {
        return inertia('inbox/calendar', [
            'tasks' => $request->user()->tasks()->without('project')->get()->map(function ($task) {
                return $task->calendar;
            }),
        ]);
    }
}