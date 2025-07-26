<?php

namespace Api\Http\Controllers;

class Controller
{
    public function success($data = [], $code = 200)
    {
        return response()->json([
            'success' => true,
            'data' => $data,
        ], $code);
    }

    public function error($message = 'An error occurred', $code = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], $code);
    }

    public function result(bool $result, $code = 200)
    {
        return response()->json([
            'success' => $result,
        ], $code);
    }
}
