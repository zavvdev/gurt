<?php

namespace App\Http\Requests\Auth\Web;

use App\Http\Requests\RequestData;
use App\Http\ValidationRules\User\UserNameRule;
use App\Http\ValidationRules\User\UserUsernameRule;
use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Unique;

class RegisterRequest extends RequestData
{
    public function __construct(
        #[Required, UserNameRule]
        public string $name,

        #[Required, Email, Unique('users', 'email')]
        public string $email,

        #[Required, UserUsernameRule]
        public string $username,

        #[Required, Confirmed, Password]
        public string $password,
    ) {
    }
}
