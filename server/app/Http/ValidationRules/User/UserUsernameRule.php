<?php

namespace App\Http\ValidationRules\User;

use Attribute;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Support\Validation\ValidationRule;

#[Attribute(Attribute::TARGET_PROPERTY)]
class UserUsernameRule extends ValidationRule
{
    public function getRules(): array
    {
        return [
            new Min(3),
            new Max(16),
            new Unique('users', 'username'),
            new Regex("/^\w*$/"),
        ];
    }
}
