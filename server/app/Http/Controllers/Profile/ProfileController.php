<?php

namespace App\Http\Controllers\Profile;

use App\Enums\ResponseMessage;
use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateRequest;
use App\Models\User;
use App\Services\StorageService\StorageService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function getByUserId(int $id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }

        if (!$user->profile) {
            $user->profile()->create();
        }

        return $this->successResponse($user->profile);
    }

    public function updateFromSession(UpdateRequest $request)
    {
        $user = User::find(Auth::user()->id);

        if (!$user) {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }

        $patchData = array_filter([
            'bio' => $request->bio,
            'date_of_birth' => $request->date_of_birth,
            'country' => $request->country,
        ], function ($v) {
            return !is_null($v);
        });

        $imagesData = array_filter([
            'image' => $request->image,
            'background_image' => $request->background_image,
        ], function ($v) {
            return !is_null($v);
        });

        if (count($patchData) == 0 && count($imagesData) == 0) {
            return $this->errorResponse(
                Response::HTTP_BAD_REQUEST,
                ResponseMessage::InvalidRequest,
            );
        }

        DB::transaction(function () use ($imagesData, $patchData, $user) {
            $user->profile()->update($patchData);

            if (isset($imagesData['image'])) {
                $imageUrl = StorageService::uploadFile($imagesData['image'], $user->id);
                $user->profile()->update([
                    'image_url' => $imageUrl,
                ]);
            }

            if (isset($imagesData['background_image'])) {
                $backgroundImageUrl = StorageService::uploadFile(
                    $imagesData['background_image'],
                    $user->id,
                );
                $user->profile()->update([
                    'background_image_url' => $backgroundImageUrl,
                ]);
            }
        });

        return $this->successResponse();
    }
}
