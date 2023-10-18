<?php

namespace App\Listeners;

use App\Events\UserDeletedEvent;
use App\Models\User;
use App\Services\UserStorageService;

class UserDeletedListener
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
    public function handle(UserDeletedEvent $event): void
    {
        if ($event->user instanceof User) {
            UserStorageService::drop($event->user->id);
        }
    }
}
