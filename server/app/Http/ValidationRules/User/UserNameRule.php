<?php

namespace App\Http\ValidationRules\User;

use Attribute;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Support\Validation\ValidationRule;

#[Attribute(Attribute::TARGET_PROPERTY)]
class UserNameRule extends ValidationRule
{
    public function getRules(): array
    {
        return [new Min(1), new Max(36)];
    }
}
