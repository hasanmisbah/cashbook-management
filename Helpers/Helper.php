<?php

use Illuminate\Http\JsonResponse;

class Helper {
    static function formatResponse(mixed $data = [], string $message = 'Data successfully fetched', bool $status = true, int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'data'    => $data,
            'message' => $message,
            'status'  => $status,
        ], $statusCode);
    }


    static function sendResponse(mixed $data = [], string $message = 'Data successfully fetched', bool $status = true, int $statusCode = 200): JsonResponse
    {
        return self::formatResponse($data, $message, $status, $statusCode);
    }

    static function unAuthorizedResponse($message = 'Unauthorized access'): JsonResponse
    {
        return self::formatResponse([], $message, false, 403);
    }


    static function ddCors(...$vars)
    {

        $referer = $_SERVER['HTTP_REFERER'];
        $origin = substr($referer, 0, -1);

        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: *');
        header('Access-Control-Allow-Headers: *');
// header('Access-Control-Max-Age: 86400');

        header('Content-Type: text/html');

        dd(...$vars);

    }

    /**
     * @throws JsonException
     */
    static function ddCorsJson(...$vars)
    {

        $referer = $_SERVER['HTTP_REFERER'];
        $origin = substr($referer, 0, -1);

        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: *');
        header('Access-Control-Allow-Headers: *');
// header('Access-Control-Max-Age: 86400');

        header('Content-Type: application/json');

        die(json_encode($vars, JSON_THROW_ON_ERROR));
    }
}
