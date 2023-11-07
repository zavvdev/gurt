<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'image_url' => $this->image_url,
            'background_image_url' => $this->background_image_url,
            'bio' => $this->bio,
            'date_of_birth' => $this->date_of_birth,
            'country' => $this->country,
        ];
    }
}
