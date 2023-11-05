<?php

namespace App\Http\Requests\Profile;

use App\Http\Requests\RequestData;
use DateTime;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;

class UpdateRequest extends RequestData
{
    public function __construct(
        #[Rule('file_or_storage_url')]
        public UploadedFile|string|null $image,

        #[Rule('file_or_storage_url')]
        public UploadedFile|string|null $background_image,

        #[Max(500), Nullable]
        public ?string $bio,

        #[WithCast(DateTimeInterfaceCast::class), Nullable]
        public ?DateTime $date_of_birth,

        #[Max(2), Nullable]
        public ?string $country,
    ) {
    }
}
