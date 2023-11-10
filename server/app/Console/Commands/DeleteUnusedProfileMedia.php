<?php

namespace App\Console\Commands;

use App\Models\Profile;
use App\Services\StorageService\StorageService;
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
        $storageListing = StorageService::list();

        $profiles = Profile::query()
            ->select('user_id', 'image_url', 'background_image_url');

        var_dump($storageListing);
        var_dump($profiles);
    }
}
