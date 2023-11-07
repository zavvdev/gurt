<?php

namespace App\Http\Controllers\SessionUser;

use App\Enums\ResponseMessage;
use App\Enums\UserMediaType;
use App\Enums\ValidationError;
use App\Events\DeleteStorageFileEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\SessionUser\CreateMediaRequest;
use App\Http\Requests\SessionUser\DeleteMediaRequest;
use App\Http\Requests\SessionUser\PatchRequest;
use App\Models\User;
use App\Services\StorageService\StorageService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class SessionUserController extends Controller
{
    public function get()
    {
        $user = $this->user();
        return $this->successResponse($user);
    }

    public function delete()
    {
        $user = $this->user();

        DB::transaction(function () use ($user): void {
            $user->delete();
            StorageService::deleteUserFolder($user->id);
        });

        return $this->successResponse();
    }

    public function patch(PatchRequest $request)
    {
        $user = $this->user();

        $userPatchData = array_filter([
            'name' => $request->name,
            'username' => $request->username,
        ], function ($v) {
            return !is_null($v);
        });

        $profilePatchData = array_filter([
            'bio' => $request->bio,
            'date_of_birth' => $request->date_of_birth,
            'country' => $request->country,
        ], function ($v) {
            return !is_null($v);
        });

        if (count($userPatchData) == 0 && count($profilePatchData) == 0) {
            return $this->errorResponse(
                Response::HTTP_BAD_REQUEST,
                ResponseMessage::InvalidRequest,
            );
        }

        if (isset($userPatchData['username'])) {
            $userWithSameUsername = User::where(
                'username',
                $request->username,
            )->where('id', '!=', $user->id)->first();

            if ($userWithSameUsername) {
                return $this->errorResponse(
                    Response::HTTP_BAD_REQUEST,
                    ResponseMessage::ValidationError,
                    [
                        'username' => [ValidationError::AlreadyExists],
                    ],
                );
            }
        }

        DB::transaction(function () use ($user, $userPatchData, $profilePatchData): void {
            $user->update($userPatchData);
            $user->profile()->update($profilePatchData);
        });

        return $this->successResponse();
    }

    public function createMedia(CreateMediaRequest $request)
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

    public function deleteMedia(Request $request)
    {
        $request = DeleteMediaRequest::from([
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
