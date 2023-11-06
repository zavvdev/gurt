<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DeleteStorageFileEvent
{
    use Dispatchable, SerializesModels;

    public string $fileName;

    public int $userId;

    public function __construct(string $fileName, int $userId)
    {
        $this->fileName = $fileName;
        $this->userId = $userId;
    }
}
