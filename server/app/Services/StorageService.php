<?php

namespace App\Services;

use Illuminate\Http\File;

class StorageService
{
    public static function uploadFile(File $file, int $userId)
    {
        echo 'upload ' . $file . $userId;
    }

    public static function deleteFile(string $fileName, int $userId)
    {
        echo 'delete file ' . $fileName . $userId;
    }

    public static function deleteUserFolder(int $userId)
    {
        echo 'drop folder ' . $userId;
    }
}
