<?php

namespace App\Services\StorageService\Requests;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Data;

class UploadFileRequest extends Data
{
    public function __construct(
        public UploadedFile $file,
        public int $userId,
    ) {
    }
}
