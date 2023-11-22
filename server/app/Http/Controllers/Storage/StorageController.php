<?php

namespace App\Http\Controllers\Storage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Storage\UploadFileRequest;
use App\Services\StorageService\StorageService;

class StorageController extends Controller
{
    public function uploadFile(UploadFileRequest $request)
    {
        $user = $this->user();

        $url = StorageService::uploadFile(
            $request->file,
            $user->id,
        );

        return $this->successResponse($url);
    }
}
