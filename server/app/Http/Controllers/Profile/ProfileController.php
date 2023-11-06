<?php

namespace App\Http\Controllers\Profile;

use App\Enums\ResponseMessage;
use App\Enums\UserMediaType;
use App\Events\DeleteStorageFileEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\CreateMyMediaRequest;
use App\Http\Requests\Profile\DeleteMyMediaRequest;
use App\Http\Requests\Profile\PatchMeRequest;
use App\Services\StorageService\StorageService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function getByUserId(int $id)
    {
        $user = $this->user($id);

        if (!$user->profile) {
            $user->profile()->create();
        }

        return $this->successResponse($user->profile);
    }

    public function patchMe(PatchMeRequest $request)
    {
        $user = $this->user();

        $updateData = array_filter([
            'bio' => $request->bio,
            'date_of_birth' => $request->date_of_birth,
            'country' => $request->country,
        ], function ($v) {
            return !is_null($v);
        });

        if (count($updateData) == 0) {
            return $this->errorResponse(
                Response::HTTP_BAD_REQUEST,
                ResponseMessage::InvalidRequest,
            );
        }

        $user->profile()->update($updateData);

        return $this->successResponse();
    }

    public function createMyMedia(CreateMyMediaRequest $request)
    {
        $user = $this->user();

        $mediaTypeMap = [
            UserMediaType::Image => 'image_url',
            UserMediaType::Background => 'background_image_url',
        ];

        $url = StorageService::uploadFile($request->file, $user->id);

        try {
            $user->profile()->update([
                $mediaTypeMap[$request->type] => $url,
            ]);
        } catch (\Exception $e) {
            DeleteStorageFileEvent::dispatch(basename($url), $user->id);
            throw $e;
        }

        return $this->successResponse();
    }

    public function deleteMyMedia(Request $request)
    {
        $request = DeleteMyMediaRequest::from([
            'url' => $request->query('url'),
            'type' => $request->query('type'),
        ]);

        $user = $this->user();

        $mediaTypeMap = [
            UserMediaType::Image => 'image_url',
            UserMediaType::Background => 'background_image_url',
        ];

        DB::transaction(function () use ($request, $user, $mediaTypeMap): void {
            $user->profile()->update([
                $mediaTypeMap[$request->type] => null,
            ]);
            StorageService::deleteFile(basename($request->url), $user->id);
        });

        return $this->successResponse();
    }
}
