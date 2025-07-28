<?php

namespace App\Http\Controllers;

use App\Agents\ProjectAgent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        $sessionId = Hash::make($request->session()->getId());

        return inertia('chat', [
            'sessionId' => $sessionId,
            'message' => (object) [
                'id' => time(),
                'message' => "Hello! I'm here to help you create a new project. Please provide me with the details of the project you want to create.",
                'sender' => 'assistant',
                'isLoading' => false,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $agent = ProjectAgent::for($request->user()->id . "_" . $request->sessionId);
        $response = $agent->respond($request->message);

        if (count($response['project']['tasks']) > 10) {
            $response = $agent->respond(
                'Please only give me a maximum of 10 tasks at a time.'
            );
        }

        return response()->json([
            'message' => (object) [
                'id' => $request->messageId,
                'message' => $response['message'],
                'sender' => 'assistant',
                'isLoading' => false,
            ],
            'project' => $response['project'],
        ]);
    }
}
