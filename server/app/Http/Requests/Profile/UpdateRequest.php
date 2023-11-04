<?php

namespace App\Http\Requests\Profile;

use App\Http\Requests\RequestData;
use DateTime;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\File;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;

class UpdateRequest extends RequestData
{
    public function __construct(
        #[File]
        public ?UploadedFile $image,

        #[File]
        public ?UploadedFile $background_image,

        #[Max(500)]
        public ?string $bio,

        #[WithCast(DateTimeInterfaceCast::class)]
        public ?DateTime $date_of_birth,

        #[Max(2)]
        public ?string $country,
    ) {
    }
}
