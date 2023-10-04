<?php

namespace App\Http\Controllers\Profile;

use App\Enums\ResponseMessage;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Response;

class ProfileController extends Controller
{
    public function getByUserId(int $id)
    {
        $user = User::find($id);

        if (!$user) {
            $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }

        if (!$user->profile) {
            $user->profile()->create();
        }

        return $this->successResponse($user->profile);
    }
}
