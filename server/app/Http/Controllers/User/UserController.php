<?php

namespace App\Http\Controllers\User;

use App\Enums\ResponseMessage;
use App\Events\UserDeletedEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdatePublicDataRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function getFromSession(Request $request)
    {
        return $this->successResponse($request->user());
    }

    public function deleteFromSession(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $user->delete();
            UserDeletedEvent::dispatch($user);

            return $this->successResponse();
        } else {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }
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

    public function updatePublicData(UpdatePublicDataRequest $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }

        $patch_data = array_filter([
            'name' => $request->name,
            'username' => $request->username,
        ], function ($v) {
            return !is_null($v);
        });

        if (count($patch_data) == 0) {
            return $this->errorResponse(
                Response::HTTP_BAD_REQUEST,
                ResponseMessage::InvalidRequest,
            );
        }

        $user->update($patch_data);

        return $this->successResponse();
    }
}
