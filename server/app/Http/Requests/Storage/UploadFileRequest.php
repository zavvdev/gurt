<?php

namespace App\Http\Requests\Storage;

use App\Http\Requests\RequestData;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\File;

class UploadFileRequest extends RequestData
{
    public function __construct(
        #[File]
        public UploadedFile $file,
    ) {
    }
}
