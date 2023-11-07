<?php

namespace App\Http\Requests\SessionUser;

use App\Enums\UserMediaType;
use App\Http\Requests\RequestData;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Attributes\Validation\File;

class CreateMediaRequest extends RequestData
{
    public function __construct(
        #[File]
        public UploadedFile $file,

        #[Enum(UserMediaType::class)]
        public string $type,
    ) {
    }
}
