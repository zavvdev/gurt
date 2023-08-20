<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\ApiController;

class TestController extends ApiController
{
    public function greet()
    {
        return $this->successResponse('Hello!');
    }
}
