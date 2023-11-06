<?php

namespace App\Traits;

use App\Enums\ResponseMessage;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

trait UserExtractor
{
    protected function user(int|string $id = null): User
    {
        $user = User::find($id || Auth::user()->id);

        // TODO: Throw exception instead return
        if (!$user) {
            return $this->errorResponse(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }

        return $user;
    }
}
