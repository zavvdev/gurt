<?php

namespace App\Http\Requests\Auth\Web;

use App\Http\Requests\RequestData;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Required;

class ForgotPasswordRequest extends RequestData
{
    public function __construct(
        #[Required, Email]
        public string $email,
    ) {
    }
}
