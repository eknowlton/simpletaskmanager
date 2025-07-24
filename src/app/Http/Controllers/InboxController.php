<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\TaskStatus;
use Illuminate\Http\Request;

class InboxController extends Controller
{
    public function __invoke(Request $request)
    {
        return inertia('inbox')->with([
            'inbox' => Task::inboxFor($request->user())->limit(10)->get(),
            'twoMinute' => Task::twoMinuteFor($request->user())->limit(10)->get(),
            'statuses' => collect(TaskStatus::cases())->map(fn($status) => [
                'value' => $status->value,
                'label' => $status->label(),
            ]),
        ]);
    }
}
