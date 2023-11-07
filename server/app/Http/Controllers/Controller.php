<?php

namespace App\Http\Controllers;

use App\Enums\ResponseMessage;
use App\Traits\ApiResponser;
use App\Traits\UserExtractor;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Controller extends BaseController
{
    use ApiResponser, AuthorizesRequests, UserExtractor, ValidatesRequests;

    protected function checkResourceOwnerById(Request $request, int $id)
    {
        if ($request->user()->id !== $id) {
            throw new HttpException(
                Response::HTTP_FORBIDDEN,
                (string) ResponseMessage::NotAllowed,
            );
        }
    }
}
