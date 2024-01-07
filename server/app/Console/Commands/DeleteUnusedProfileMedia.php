<?php

namespace App\Console\Commands;

use App\Services\StorageService\StorageService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

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

        $profiles = DB::table('profiles')->select([
            'user_id',
            'image_url',
            'background_image_url',
        ])->get()->toArray();

        $userFilesById = [];

        foreach ($profiles as $object) {
            $profile = json_decode(json_encode($object), true);
            $userFilesById[$profile['user_id']] = [
                basename($profile['image_url']),
                basename($profile['background_image_url']),
            ];
        }

        $userEmptyFolders = array_keys(array_filter(
            $storageListing,
            fn ($folder) => count($folder) === 0,
        ));

        if (count($userEmptyFolders) > 0) {
            foreach ($userEmptyFolders as $userId) {
                StorageService::deleteUserFolder($userId);
            }
        }

        $userOrphanFolders = array_filter(
            array_keys($storageListing),
            fn ($userId) => !array_key_exists($userId, $userFilesById),
        );

        if (count($userOrphanFolders) > 0) {
            foreach ($userOrphanFolders as $userId) {
                StorageService::deleteUserFolder($userId);
            }
        }

        if (count($storageListing) > 0) {
            foreach ($storageListing as $userId => $files) {
                foreach ($files as $file) {
                    if (array_key_exists($userId, $userFilesById) && !in_array($file, $userFilesById[$userId])) {
                        StorageService::deleteFile($file, $userId);
                    }
                }
            }
        }

        return 0;
    }
}
