<?php

namespace App\Enums;

class ValidationError
{
    const Required = 'required';

    const AlreadyExists = 'already_exists';

    const StringType = 'string_type';

    const TooLong = 'too_long';

    const TooShort = 'too_short';

    const NotConfirmed = 'not_confirmed';

    const InvalidFormat = 'invalid_format';
}
