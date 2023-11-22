<?php

namespace App\Exceptions;

use App\Enums\ResponseMessage;
use App\Traits\ApiResponser;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Routing\Exceptions\InvalidSignatureException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    use ApiResponser;

    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    private function getResponseMessage(string $message): ResponseMessage|string
    {
        switch ($message) {
            case 'Too Many Attempts.':
                return ResponseMessage::TooEarly;
            default:
                if (config('app.debug')) {
                    return $message;
                }

                return ResponseMessage::Unexpected;
        }
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        try {
            $response = $this->handleException($request, $exception);

            return $response;
        } catch (Throwable $_) {
            if (config('app.debug')) {
                return parent::render($request, $exception);
            }

            return $this->errorResponse(
                Response::HTTP_INTERNAL_SERVER_ERROR,
                ResponseMessage::Unexpected,
            );
        }
    }

    public function handleException($request, Exception $exception)
    {
        if ($exception instanceof ValidationException) {
            return $this->errorResponse(
                Response::HTTP_UNPROCESSABLE_ENTITY,
                ResponseMessage::ValidationError,
                $exception->errors(),
            );
        }

        if ($exception instanceof AuthenticationException) {
            return $this->errorResponse(
                Response::HTTP_UNAUTHORIZED,
                ResponseMessage::Unauthorized,
            );
        }

        if ($exception instanceof MethodNotAllowedHttpException) {
            return $this->errorResponse(
                Response::HTTP_METHOD_NOT_ALLOWED,
                ResponseMessage::NotAllowed,
            );
        }

        if ($exception instanceof NotFoundHttpException) {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::NotFound,
            );
        }

        if ($exception instanceof ApiException) {
            return $this->errorResponse(
                $exception->getCode(),
                $exception->getMessage(),
            );
        }

        if ($exception instanceof InvalidSignatureException) {
            return $this->errorResponse(
                Response::HTTP_CONFLICT,
                ResponseMessage::InvalidSignature,
            );
        }

        if ($exception instanceof HttpException) {
            return $this->errorResponse(
                $exception->getStatusCode(),
                $this->getResponseMessage($exception->getMessage()),
            );
        }

        if ($exception instanceof StorageException) {
            return $this->errorResponse(
                Response::HTTP_CONFLICT,
                ResponseMessage::StorageError,
            );
        }

        if (config('app.debug')) {
            return parent::render($request, $exception);
        }

        return $this->errorResponse(
            Response::HTTP_INTERNAL_SERVER_ERROR,
            ResponseMessage::Unexpected,
        );
    }
}
