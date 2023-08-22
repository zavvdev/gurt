<?php

namespace App\Http\Requests\Auth\Web;

use App\Http\Requests\RequestData;
use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Unique;

class RegisterRequest extends RequestData
{
    public function __construct(
        #[Required, Max(25)]
        public string $first_name,

        #[Required, Max(25)]
        public string $last_name,

        #[Required, Email, Unique('users', 'email')]
        public string $email,

        #[Required, Confirmed, Password]
        public string $password,
    ) {
    }
}
