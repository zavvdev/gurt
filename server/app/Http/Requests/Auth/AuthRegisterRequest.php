<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\RequestData;
use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Unique;

class AuthRegisterRequest extends RequestData
{
    public function __construct(
        #[Required, Max(25)]
        public string $first_name,

        #[Required, Max(25)]
        public string $last_name,

        #[Required, Max(16), Unique('users', 'username')]
        public string $username,

        #[Required, Unique('users', 'email')]
        public string $email,

        #[Required, Confirmed]
        public string $password,
    ) {
    }
}
