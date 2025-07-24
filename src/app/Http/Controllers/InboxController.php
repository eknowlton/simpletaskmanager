<?php

namespace App\Http\Controllers;

use App\Data\TaskData;
use App\Data\TaskStatusData;
use App\Models\Task;
use App\TaskStatus;
use Illuminate\Http\Request;

class InboxController extends Controller
{
    public function __invoke(Request $request)
    {
        return inertia('inbox')->with([
            'inbox' => TaskData::collect(Task::inboxFor($request->user())->limit(10)->get()),
            'twoMinute' => TaskData::collect(Task::twoMinuteFor($request->user())->limit(10)->get()),
            'statuses' => TaskStatusData::collect(Taskstatus::cases())
        ]);
    }
}
