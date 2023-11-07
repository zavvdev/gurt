<?php

namespace App\Listeners;

use App\Events\DeleteStorageFileEvent;
use App\Services\ErrorReporterService\Enums\ErrorReporterMessage;
use App\Services\ErrorReporterService\ErrorReporterService;
use App\Services\StorageService\StorageService;

class DeleteStorageFileListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(DeleteStorageFileEvent $event): void
    {
        if (isset($event->fileName) && isset($event->userId)) {
            try {
                StorageService::deleteFile($event->fileName, $event->userId);
            } catch (\Exception $e) {
                ErrorReporterService::report(ErrorReporterMessage::DeleteStorageFile, [
                    'fileName' => $event->fileName,
                    'userId' => $event->userId,
                    'exception' => $e,
                ]);
            }
        }
    }
}
