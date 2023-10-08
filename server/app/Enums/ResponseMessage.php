<?php

namespace App\Enums;

enum ResponseMessage: string
{
    case NotAllowed = 'not_allowed';

    case NotFound = 'not_found';

    case Unauthorized = 'unauthorized';

    case Unexpected = 'unexpected_error';

    case ValidationError = 'validation_error';

    case EmailNotVerified = 'email_not_verified';

    case TooEarly = 'too_early';

    case RecordNotFound = 'record_not_found';

    case UserNotFound = 'user_not_found';

    case InvalidToken = 'invalid_token';

    case InvalidSignature = 'invalid_signature';

    case SamePassword = 'same_password';

    case AlreadySent = 'already_sent';

    case AlreadyLoggedIn = 'already_logged_in';
}
