<?php

namespace App\Http\Controllers\User;

use App\Enums\ResponseMessage;
use App\Enums\ValidationError;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\PatchMyPublicDataRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use App\Services\StorageService\StorageService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getById(string $id)
    {
        $user = $this->user($id);

        return $this->successResponse(new UserResource($user));
    }

    public function getMe()
    {
        $user = $this->user();

        return $this->successResponse($user);
    }

    public function deleteMe()
    {
        $user = $this->user();

        DB::transaction(function () use ($user): void {
            $user->delete();
            StorageService::deleteUserFolder($user->id);
        });

        return $this->successResponse();
    }

    public function patchMyPublicData(PatchMyPublicDataRequest $request)
    {
        $user = $this->user();

        $updateData = array_filter([
            'name' => $request->name,
            'username' => $request->username,
        ], function ($v) {
            return !is_null($v);
        });

        if (count($updateData) == 0) {
            return $this->errorResponse(
                Response::HTTP_BAD_REQUEST,
                ResponseMessage::InvalidRequest,
            );
        }

        if (isset($updateData['username'])) {
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

        $user->update($updateData);

        return $this->successResponse();
    }
}
