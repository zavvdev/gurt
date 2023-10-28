<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Auth\Events\Verified;

class UserVerifiedListener
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
    public function handle(Verified $event): void
    {
        if ($event->user instanceof User) {
            if (!$event->user->profile) {
                $event->user->profile()->create();
            }
        }
    }
}
