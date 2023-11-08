<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DeleteUnusedProfileMedia extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-unused-profile-media';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete unused profile media files from Storage service';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        echo 'works!';
    }
}
