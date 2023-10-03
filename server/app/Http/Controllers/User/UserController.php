<?php

namespace App\Http\Controllers\User;

use App\Enums\ResponseMessage;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function session(Request $request)
    {
        return $this->successResponse($request->user());
    }

    public function delete(int $id)
    {
        $user = User::find($id);

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
