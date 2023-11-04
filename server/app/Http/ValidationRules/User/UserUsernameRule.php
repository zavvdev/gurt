<?php

namespace App\Http\ValidationRules\User;

use Attribute;
use Spatie\LaravelData\Attributes\Validation\CustomValidationAttribute;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Support\Validation\ValidationPath;

#[Attribute(Attribute::TARGET_PROPERTY)]
class UserUsernameRule extends CustomValidationAttribute
{
    public function getRules(ValidationPath $path): array|object|string
    {
        return [
            new Min(3),
            new Max(16),
            new Unique('users', 'username'),
            new Regex("/^\w*$/"),
        ];
    }
}
