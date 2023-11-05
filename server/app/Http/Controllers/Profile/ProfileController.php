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

        $patchData = [
            'bio' => $request->bio,
            'date_of_birth' => $request->date_of_birth,
            'country' => $request->country,
        ];

        $imagesData = [
            'image' => $request->image,
            'background_image' => $request->background_image,
        ];

        // TODO: Rewrite logic to separate calls for delete/upload media files

        DB::transaction(function () use ($imagesData, $patchData, $user) {
            $user->profile()->update($patchData);

            $imageUrl = is_file($imagesData['image'])
                ? StorageService::uploadFile($imagesData['image'], $user->id)
                : $imagesData['image'];

            $backgroundImageUrl = is_file($imagesData['background_image'])
                ? StorageService::uploadFile($imagesData['background_image'], $user->id)
                : $imagesData['background_image'];

            if (isset($imageUrl)) {
                $user->profile()->update([
                    'image_url' => $imageUrl,
                ]);
            }

            if (isset($backgroundImageUrl)) {
                $user->profile()->update([
                    'background_image_url' => $backgroundImageUrl,
                ]);
            }
        });

        return $this->successResponse();
    }
}
