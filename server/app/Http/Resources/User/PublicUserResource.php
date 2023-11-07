<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class PublicUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $userData = Arr::except(new UserResource($this), ['email']);

        if ($this->profile) {
            $userData['profile'] = new ProfileResource($this->profile);
        }

        return $userData;
    }
}
