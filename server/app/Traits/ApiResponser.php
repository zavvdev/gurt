<?php

namespace App\Traits;

use App\Enums\ResponseMessage;
use App\Enums\ResponseStatus;
use Illuminate\Http\Response;

trait ApiResponser
{
    private function composeResponse(
        ResponseStatus $status,
        int $code,
        mixed $data = null,
        ResponseMessage|string $message = null,
    ) {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    protected function successResponse(
        mixed $data = null,
        ResponseMessage|string $message = null,
        int $code = Response::HTTP_OK,
    ) {
        return $this->composeResponse(
            ResponseStatus::Success,
            $code,
            $data,
            $message,
        );
    }

    protected function errorResponse(
        int $code,
        ResponseMessage|string $message = null,
        mixed $data = null,
    ) {
        return $this->composeResponse(
            ResponseStatus::Error,
            $code,
            $data,
            $message,
        );
    }
}
