<?php

namespace App\Http\Requests;

use App\Enums\ValidationError;
use Spatie\LaravelData\Data;

class RequestData extends Data
{
    public static function messages()
    {
        return [
            'required' => ValidationError::Required,

            'max' => ValidationError::TooLong,

            'min' => ValidationError::TooShort,

            'string' => ValidationError::StringType,

            'unique' => ValidationError::AlreadyExists,

            'confirmed' => ValidationError::NotConfirmed,

            'regex' => ValidationError::InvalidFormat,

            'file' => ValidationError::FileType,
        ];
    }
}
