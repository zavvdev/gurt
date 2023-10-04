<?php

namespace App\Http\Controllers\User;

use App\Enums\ResponseMessage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function getFromSession(Request $request)
    {
        return $this->successResponse($request->user());
    }

    public function delete(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $user->delete();

            return $this->successResponse();
        } else {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }
    }
}
