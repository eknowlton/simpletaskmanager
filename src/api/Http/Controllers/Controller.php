<?php

namespace Api\Http\Controllers;

class Controller
{
    public function result(bool $result, $status = 200)
    {
        return response()->json([
            'success' => true,
            'result' => $result
        ], $status);
    }

    public function success($data, $status = 200)
    {
        return response()->json([
            'success' => true,
            'data' => $data
        ], $status);
    }

    public function error($error, $status = 200)
    {
        return response()->json([
            'success' => false,
            'error' => $error
        ], $status);
    }
}
