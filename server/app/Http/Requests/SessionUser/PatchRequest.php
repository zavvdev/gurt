<?php

namespace App\Http\Requests\SessionUser;

use App\Http\Requests\RequestData;
use App\Http\ValidationRules\User\UserNameRule;
use App\Http\ValidationRules\User\UserUsernameRule;
use DateTime;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Optional;

class Profile extends RequestData
{
    public function __construct(
        #[Max(500)]
        public string|Optional $bio,

        #[WithCast(DateTimeInterfaceCast::class)]
        public DateTime|Optional $date_of_birth,

        #[Max(2)]
        public string|Optional $country,
    ) {
    }
}

class PatchRequest extends RequestData
{
    public function __construct(
        #[UserNameRule]
        public string|Optional $name,

        #[UserUsernameRule]
        public string|Optional $username,

        public Profile|Optional $profile,
    ) {
    }
}
