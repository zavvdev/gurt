<?php

namespace App\Http\Requests\SessionUser;

use App\Enums\UserMediaType;
use App\Http\Requests\RequestData;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Attributes\Validation\Rule;

class DeleteMediaRequest extends RequestData
{
    public function __construct(
        #[Rule('storage_url')]
        public string $url,

        #[Enum(UserMediaType::class)]
        public string $type,
    ) {
    }
}
