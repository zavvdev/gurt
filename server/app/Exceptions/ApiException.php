<?php

namespace App\Exceptions;

use App\Enums\ResponseMessage;
use Exception;

class ApiException extends Exception
{
    public function __construct(int $code, ResponseMessage $message)
    {
        parent::__construct($message->value, $code);
    }
}
