<?php

namespace App\Http\Controllers;

use Shared\Data\TaskData;
use Shared\Models\Task;

use Illuminate\Http\Request;

class InboxController extends Controller
{
    public function __invoke(Request $request)
    {
        return inertia('inbox', [
            'inbox' => TaskData::collect(
                Task::inboxFor($request->user())
                    ->with('audits', 'audits.user')
                    ->limit(10)
                    ->get()
            ),
            'twoMinute' => TaskData::collect(
                Task::twoMinuteFor($request->user())->limit(10)->get()
            )
        ]);
    }
}
