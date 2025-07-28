<?php


namespace App\Http\Controllers\Inbox;

use Shared\Data\CalendarEventData;

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
                ->get())
        ]);
    }
}
