<?php

namespace App\Http\Requests\SessionUser;

use App\Http\Requests\RequestData;
use App\Http\ValidationRules\User\UserNameRule;
use App\Http\ValidationRules\User\UserUsernameRule;
use DateTime;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Optional;

class Profile extends RequestData
{
    public function __construct(
        #[Rule('storage_url')]
        public string|Optional|null $image_url,

        #[Rule('storage_url')]
        public string|Optional|null $background_image_url,

        #[Max(500)]
        public string|Optional|null $bio,

        #[WithCast(DateTimeInterfaceCast::class)]
        public DateTime|Optional|null $date_of_birth,

        #[Max(2)]
        public string|Optional|null $country,
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
