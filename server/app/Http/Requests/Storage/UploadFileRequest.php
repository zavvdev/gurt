<?php

namespace App\Http\Requests\Storage;

use App\Http\Requests\RequestData;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\Rule;

class UploadFileRequest extends RequestData
{
    public function __construct(
        #[Rule('mimes:jpg,jpeg,png')]
        public UploadedFile $file,
    ) {
    }
}
