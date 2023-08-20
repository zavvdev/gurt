<?php

namespace App\Enums\Api;

enum ApiResponseStatus: string
{
    case Success = 'success';

    case Error = 'error';
}
