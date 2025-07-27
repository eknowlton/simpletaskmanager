<?php

namespace App\Http\Controllers;

use Shared\Data\TaskData;
use Shared\Data\TaskStatusData;
use Shared\Models\Task;
use Shared\TaskStatus;

use Illuminate\Http\Request;

class InboxController extends Controller
{
    public function __invoke(Request $request)
    {
        return inertia('inbox')->with([
            'inbox' => TaskData::collect(
                Task::inboxFor($request->user())
                    ->with('audits', 'audits.user')
                    ->limit(10)
                    ->get()
            ),
            'twoMinute' => TaskData::collect(
                Task::twoMinuteFor($request->user())->limit(10)->get()
            ),
            'statuses' => TaskStatusData::collect(Taskstatus::cases())
        ]);
    }
}
