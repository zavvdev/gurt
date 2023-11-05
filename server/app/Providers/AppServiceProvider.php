<?php

namespace App\Providers;

use App\Enums\ValidationError;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend('file_or_storage_url', function ($_, $value) {
            $storagePath = Config::get('app.frontend_url') . Config::get('app.frontend_storage_path');
            $isFile = is_file($value);
            $isUrl = (bool) filter_var($value, FILTER_VALIDATE_URL);
            $isStorageUrl = $isUrl ? str_starts_with($value, $storagePath) : false;

            return $isFile || $isStorageUrl;
        }, ValidationError::FileOrStorageUrl);
    }
}
