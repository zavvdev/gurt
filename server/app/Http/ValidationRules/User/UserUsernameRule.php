<?php

namespace App\Http\ValidationRules\User;

use Attribute;
use Spatie\LaravelData\Attributes\Validation\CustomValidationAttribute;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Support\Validation\ValidationPath;

#[Attribute(Attribute::TARGET_PROPERTY)]
class UserUsernameRule extends CustomValidationAttribute
{
    public function getRules(ValidationPath $path): array
    {
        return [
            new StringType(),
            new Min(3),
            new Max(16),
            new Regex("/^\w*$/"),
        ];
    }
}
