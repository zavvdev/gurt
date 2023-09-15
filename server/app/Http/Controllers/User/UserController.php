<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getSessionUser(Request $request)
    {
        return $this->successResponse($request->user());
    }
}
