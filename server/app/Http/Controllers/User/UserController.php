<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;

class UserController extends Controller
{
    public function getById(string $id)
    {
        $user = $this->user($id);

        return $this->successResponse(new UserResource($user));
    }

    public function getProfile(int $userId)
    {
        $user = $this->user($userId);

        if (!$user->profile) {
            $user->profile()->create();
        }

        return $this->successResponse($user->profile);
    }
}
