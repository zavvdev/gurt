<?php

namespace App\Http\Requests\SessionUser;

use App\Http\Requests\RequestData;
use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\Required;

class ChangePasswordRequest extends RequestData
{
    public function __construct(
        #[Required]
        public string $old_password,

        #[Required, Confirmed, Password]
        public string $new_password,
    ) {
    }
}
