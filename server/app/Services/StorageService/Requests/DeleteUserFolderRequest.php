<?php

namespace App\Services\StorageService\Requests;

use Spatie\LaravelData\Data;

class DeleteUserFolderRequest extends Data
{
    public function __construct(
        public int $userId,
    ) {
    }
}
