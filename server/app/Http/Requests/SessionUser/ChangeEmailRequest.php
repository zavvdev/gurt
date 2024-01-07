<?php

namespace App\Http\Requests\SessionUser;

use App\Http\Requests\RequestData;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Unique;

class ChangeEmailRequest extends RequestData
{
    public function __construct(
        #[Required]
        public string $password,

        #[Required, Email, Unique('users', 'email')]
        public string $new_email,
    ) {
    }
}
