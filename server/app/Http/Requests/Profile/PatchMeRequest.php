<?php

namespace App\Http\Requests\Profile;

use App\Http\Requests\RequestData;
use DateTime;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;

class PatchMeRequest extends RequestData
{
    public function __construct(
        #[Max(500)]
        public ?string $bio,

        #[WithCast(DateTimeInterfaceCast::class)]
        public ?DateTime $date_of_birth,

        #[Max(2)]
        public ?string $country,
    ) {
    }
}
