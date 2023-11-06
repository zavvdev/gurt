<?php

namespace App\Services\ErrorReporterService;

use App\Services\ErrorReporterService\Enums\ErrorReporterMessage;

class ErrorReporterService
{
    public static function report(ErrorReporterMessage|string $message, array $meta = [])
    {
        // Report an error to an external service
    }
}
