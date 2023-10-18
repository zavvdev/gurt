<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

class UserStorageService
{
    private static function makeRootPath(int $userId, bool $trailingSlash = false)
    {
        if (gettype($userId) == 'integer') {
            $remainder = $trailingSlash ? '/' : '';

            return Config::get('filesystems.user_root_folder_name') . '/' . $userId . $remainder;
        }
        throw new Exception('Invalid userId argument');
    }

    public static function createRootFolder(int $userId)
    {
        $path = self::makeRootPath($userId);
        if (!Storage::exists($path)) {
            Storage::makeDirectory($path);
        }
    }

    public static function drop(int $userId)
    {
        $path = self::makeRootPath($userId);
        Storage::deleteDirectory($path);
    }
}
