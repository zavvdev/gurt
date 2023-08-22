<?php

namespace App\Http\Requests\Auth\Web;

use App\Http\Requests\RequestData;
use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\Required;

class ResetPasswordRequest extends RequestData
{
    public function __construct(
        #[Required]
        public string $token,

        #[Required, Email]
        public string $email,

        #[Required, Confirmed, Password]
        public string $password,
    ) {
    }
}
