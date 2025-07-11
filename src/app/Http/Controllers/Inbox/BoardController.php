<?php


namespace App\Http\Controllers\Inbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BoardController extends Controller 
{

    public function show(Request $request)
    {
        return inertia('inbox/board', [
            'tasks' => $request->user()->tasks()->without('project')->get(),
        ]);
    }
}