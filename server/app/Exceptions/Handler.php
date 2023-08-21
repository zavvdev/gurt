<?php

namespace App\Exceptions;

use App\Enums\ApiResponseErrorKey;
use App\Traits\ApiResponser;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
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
                ApiResponseErrorKey::Unexpected,
            );
        }
    }

    public function handleException($request, Exception $exception)
    {
        if ($exception instanceof AuthenticationException) {
            return $this->errorResponse(
                Response::HTTP_UNAUTHORIZED,
                ApiResponseErrorKey::Unauthorized,
            );
        }

        if ($exception instanceof MethodNotAllowedHttpException) {
            return $this->errorResponse(
                Response::HTTP_METHOD_NOT_ALLOWED,
                ApiResponseErrorKey::NotAllowed,
            );
        }

        if ($exception instanceof NotFoundHttpException) {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ApiResponseErrorKey::NotFound,
            );
        }

        if ($exception instanceof HttpException) {
            return $this->errorResponse(
                $exception->getStatusCode(),
                $exception->getMessage(),
            );
        }

        if (config('app.debug')) {
            return parent::render($request, $exception);
        }

        return $this->errorResponse(
            Response::HTTP_INTERNAL_SERVER_ERROR,
            ApiResponseErrorKey::Unexpected,
        );
    }
}
