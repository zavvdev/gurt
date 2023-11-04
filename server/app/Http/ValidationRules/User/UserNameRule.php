<?php

namespace App\Http\ValidationRules\User;

use Attribute;
use Spatie\LaravelData\Attributes\Validation\CustomValidationAttribute;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Support\Validation\ValidationPath;

#[Attribute(Attribute::TARGET_PROPERTY)]
class UserNameRule extends CustomValidationAttribute
{
    public function getRules(ValidationPath $path): array|object|string
    {
        return [new Min(1), new Max(36)];
    }
}
