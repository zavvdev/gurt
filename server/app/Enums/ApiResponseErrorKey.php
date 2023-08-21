<?php

namespace App\Enums;

enum ApiResponseErrorKey: string
{
    case NotAllowed = 'not_allowed';

    case NotFound = 'not_found';

    case Unauthorized = 'unauthorized';

    case Unexpected = 'unexpected_error';
}
