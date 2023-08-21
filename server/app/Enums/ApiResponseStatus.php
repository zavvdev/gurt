<?php

namespace App\Enums;

enum ApiResponseStatus: string
{
    case Success = 'success';

    case Error = 'error';
}
