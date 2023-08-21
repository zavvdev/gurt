<?php

namespace App\Traits;

use App\Enums\ApiResponseErrorKey;
use App\Enums\ApiResponseStatus;
use App\Enums\ApiResponseSuccessKey;
use Illuminate\Http\Response;

trait ApiResponser
{
    private function composeResponse(
        ApiResponseStatus $status,
        int $code,
        mixed $data = null,
        ApiResponseSuccessKey
        |ApiResponseErrorKey
        |string $message = null,
    ) {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    protected function successResponse(
        mixed $data = null,
        ApiResponseSuccessKey|string $message = null,
        int $code = Response::HTTP_OK,
    ) {
        return $this->composeResponse(
            ApiResponseStatus::Success,
            $code,
            $data,
            $message,
        );
    }

    protected function errorResponse(
        int $code,
        ApiResponseErrorKey|string $message = null,
        mixed $data = null,
    ) {
        return $this->composeResponse(
            ApiResponseStatus::Error,
            $code,
            $data,
            $message,
        );
    }
}
