<?php

namespace App\Enums;

enum ResponseMessage: string
{
    // Error

    case NotAllowed = 'not_allowed';

    case NotFound = 'not_found';

    case Unauthorized = 'unauthorized';

    case Unexpected = 'unexpected_error';

    case ValidationError = 'validation_error';

    // Success

    case AlreadySent = 'already_sent';

    case AlreadyLoggedIn = 'already_logged_in';
}
