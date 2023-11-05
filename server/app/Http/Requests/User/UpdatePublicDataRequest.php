<?php

namespace App\Http\Requests\User;

use App\Http\Requests\RequestData;
use App\Http\ValidationRules\User\UserNameRule;
use App\Http\ValidationRules\User\UserUsernameRule;

class UpdatePublicDataRequest extends RequestData
{
    public function __construct(
        #[UserNameRule]
        public string $name,

        #[UserUsernameRule]
        public string $username,
    ) {
    }
}
