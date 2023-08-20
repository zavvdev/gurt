<?php

namespace App\Enums\Api;

enum ApiResponseErrorKey: string
{
    case NotAllowed = 'not_allowed';

    case NotFound = 'not_found';

    case Unexpected = 'unexpected_error';
}
