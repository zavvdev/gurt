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

    case EmailNotVerified = 'email_not_verified';

    case TooEarly = 'too_early';

    const RecordNotFound = 'record_not_found';

    const UserNotFound = 'user_not_found';

    const InvalidToken = 'invalid_token';

    const InvalidSignature = 'invalid_signature';

    // Success

    case AlreadySent = 'already_sent';

    case AlreadyLoggedIn = 'already_logged_in';
}
