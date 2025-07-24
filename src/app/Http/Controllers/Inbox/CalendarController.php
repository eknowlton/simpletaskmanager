<?php


namespace App\Http\Controllers\Inbox;

use App\Data\CalendarEventData;
use App\Data\TaskStatusData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CalendarController extends Controller
{

    public function show(Request $request)
    {
        return inertia('inbox/calendar', [
            'events' => CalendarEventData::collect($request->user()
                ->tasks()
                ->doesntHave('project')
                ->get()),
            'statuses' => collect(\App\TaskStatus::cases())->map(fn($status) => TaskStatusData::from($status)),
        ]);
    }
}
