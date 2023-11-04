<?php

namespace App\Http\Controllers\User;

use App\Enums\ResponseMessage;
use App\Enums\ValidationError;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdatePublicDataRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use App\Services\StorageService\StorageService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getFromSession(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }

        return $this->successResponse($user);
    }

    public function deleteFromSession(Request $request)
    {
        $user = $request->user();

        if ($user) {
            DB::transaction(function () use ($user): void {
                $user->delete();
                StorageService::deleteUserFolder($user->id);
            });

            return $this->successResponse();
        } else {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }
    }

    public function updatePublicDataFromSession(UpdatePublicDataRequest $request)
    {
        $user = User::find(Auth::user()->id);

        if (!$user) {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }

        $patchData = array_filter([
            'name' => $request->name,
            'username' => $request->username,
        ], function ($v) {
            return !is_null($v);
        });

        if (count($patchData) == 0) {
            return $this->errorResponse(
                Response::HTTP_BAD_REQUEST,
                ResponseMessage::InvalidRequest,
            );
        }

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

        $user->update($patchData);

        return $this->successResponse();
    }

    public function getById(int $id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }

        return $this->successResponse(new UserResource($user));
    }
}
