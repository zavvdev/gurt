<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\PublicUserResource;

class UserController extends Controller
{
    public function getById(string $id)
    {
        $user = $this->user($id);

        if (!$user->profile) {
            $user->profile()->create();
        }

        return $this->successResponse(
            new PublicUserResource(
                $user->with('profile')->first(),
            ),
        );
    }
}
