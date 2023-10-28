<?php

namespace App\Http\Controllers\User;

use App\Enums\ResponseMessage;
use App\Events\UserDeletedEvent;
use App\Http\Controllers\Controller;
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
}
