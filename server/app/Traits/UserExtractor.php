<?php

namespace App\Traits;

use App\Enums\ResponseMessage;
use App\Exceptions\ApiException;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

trait UserExtractor
{
    protected function user(int|string $id = null): User
    {
        if (isset($id)) {
            $user = User::find($id);
        } else {
            $user = User::find(Auth::user()->id);
        }

        if (!$user) {
            throw new ApiException(
                Response::HTTP_NOT_FOUND,
                ResponseMessage::UserNotFound,
            );
        }

        return $user;
    }
}
