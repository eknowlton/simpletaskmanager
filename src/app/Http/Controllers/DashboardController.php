<?php

namespace App\Http\Controllers;

use App\TaskStatus;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        return inertia('dashboard')
            ->with([
                'test' => 'hello',
                'completed_tasks' => $request->user()->tasks()
                    ->where('status', TaskStatus::Completed)
                    ->orderBy('completed_at', 'desc')
                    ->take(10)
                    ->get(),
                'cancelled_tasks' => $request->user()->tasks()
                    ->where('status', TaskStatus::Cancelled)
                    ->orderBy('cancelled_at', 'desc')
                    ->take(10)
                    ->get(),
                'pending_tasks' => $request->user()->tasks()
                    ->where('status', TaskStatus::Pending)
                    ->orderBy('created_at', 'desc')
                    ->take(10)
                    ->get(),
            ]);
    }
}
