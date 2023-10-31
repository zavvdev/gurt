<?php

namespace App\Http\Requests\Auth\Web;

use App\Http\Requests\RequestData;
use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Unique;

class RegisterRequest extends RequestData
{
    public function __construct(
        #[Required, Min(1), Max(36)]
        public string $name,

        #[Required, Email, Unique('users', 'email')]
        public string $email,

        #[
            Required,
            Min(3),
            Max(16),
            Unique('users', 'username'),
            Regex("/^\w*$/")
        ]
        public string $username,

        #[Required, Confirmed, Password]
        public string $password,
    ) {
    }
}
