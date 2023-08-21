<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;

class TestController extends Controller
{
    public function greet()
    {
        return $this->successResponse('Hello!');
    }
}
