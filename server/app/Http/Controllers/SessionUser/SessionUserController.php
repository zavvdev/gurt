<?php

namespace App\Http\Controllers\SessionUser;

use App\Enums\ResponseMessage;
use App\Enums\ValidationError;
use App\Http\Controllers\Controller;
use App\Http\Requests\SessionUser\ChangeEmailRequest;
use App\Http\Requests\SessionUser\ChangePasswordRequest;
use App\Http\Requests\SessionUser\PatchRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use App\Services\StorageService\StorageService;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SessionUserController extends Controller
{
    public function get()
    {
        $user = $this->user();

        if (!$user->profile) {
            $user->profile()->create();
        }

        return $this->successResponse(
            new UserResource(
                $user->with('profile')->first(),
            ),
        );
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

        if (count($request->toArray()) == 0) {
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

        DB::transaction(function () use ($user, $request): void {
            if (count($request->profile?->toArray()) > 0) {
                $user->profile()->update(
                    $request->profile->toArray(),
                );
            }
            $user->update(
                Arr::except($request->toArray(), ['profile']),
            );
        });

        return $this->successResponse();
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $user = $this->user();

        if (!Hash::check($request->old_password, $user->password)) {
            return $this->errorResponse(
                Response::HTTP_BAD_REQUEST,
                ResponseMessage::InvalidCurrentPassword,
            );
        }

        if (Hash::check($request->new_password, $user->password)) {
            return $this->errorResponse(
                Response::HTTP_CONFLICT,
                ResponseMessage::SamePassword,
            );
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return $this->successResponse();
    }

    public function changeEmail(ChangeEmailRequest $request)
    {
        $user = $this->user();

        if (!Hash::check($request->password, $user->password)) {
            return $this->errorResponse(
                Response::HTTP_BAD_REQUEST,
                ResponseMessage::InvalidCurrentPassword,
            );
        }

        if ($request->new_email === $user->email) {
            return $this->errorResponse(
                Response::HTTP_CONFLICT,
                ResponseMessage::SameEmail,
            );
        }

        $user->forceFill([
            'email' => $request->new_email,
            'email_verified_at' => null,
        ])->save();

        $user->sendEmailVerificationNotification();

        return $this->successResponse();
    }
}
