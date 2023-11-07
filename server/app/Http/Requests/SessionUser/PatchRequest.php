<?php

namespace App\Http\Requests\SessionUser;

use DateTime;
use App\Http\Requests\RequestData;
use App\Http\ValidationRules\User\UserNameRule;
use App\Http\ValidationRules\User\UserUsernameRule;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\WithCast;

class PatchRequest extends RequestData
{
    public function __construct(
        #[UserNameRule]
        public ?string $name,

        #[UserUsernameRule]
        public ?string $username,

        #[Max(500)]
        public ?string $bio,

        #[WithCast(DateTimeInterfaceCast::class)]
        public ?DateTime $date_of_birth,

        #[Max(2)]
        public ?string $country,
    ) {
    }
}
