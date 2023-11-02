<?php

namespace App\Http\Requests\User;

use App\Http\Requests\RequestData;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\Unique;

class UpdatePublicDataRequest extends RequestData
{
    public function __construct(
        #[Min(1), Max(36)]
        public ?string $name,

        #[
            Min(3),
            Max(16),
            Unique('users', 'username'),
            Regex("/^\w*$/")
        ]
        public ?string $username,
    ) {
    }
}
