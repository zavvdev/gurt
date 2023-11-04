<?php

namespace App\Services\StorageService\Requests;

use Spatie\LaravelData\Data;

class DeleteFileRequest extends Data
{
    public function __construct(
        public string $fileName,
        public int $userId,
    ) {
    }
}
