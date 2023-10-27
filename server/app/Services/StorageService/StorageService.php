<?php

namespace App\Services\StorageService;

use App\Exceptions\StorageException;
use App\Services\StorageService\Requests\DeleteFileRequest;
use App\Services\StorageService\Requests\DeleteUserFolderRequest;
use App\Services\StorageService\Requests\UploadFileRequest;
use GuzzleHttp\Client as Guzzle;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Config;
use Psr\Http\Message\ResponseInterface;

class StorageService
{
    private static function request(string $method, string $url, $params = []): ResponseInterface
    {
        try {
            $http = new Guzzle([
                'base_uri' => Config::get('app.storage_service_url'),
                'headers' => [
                    'secret' => Config::get('app.storage_service_secret'),
                ],
            ]);

            return $http->request($method, $url, $params);
        } catch (ClientException $e) {
            throw new StorageException($e->getMessage());
        }
    }

    public static function uploadFile(UploadedFile $file, int $userId): string
    {
        $req = UploadFileRequest::from([
            'file' => $file,
            'userId' => $userId,
        ]);

        // TODO: Make it work

        $response = self::request('POST', '/file', [
            'multipart' => [
                [
                    'name' => 'file',
                    'contents' => $req->file,
                ],
                [
                    'name' => 'userId',
                    'contents' => $req->userId,
                ],
            ],
        ]);

        return $response->getBody();
    }

    public static function deleteFile(string $fileName, int $userId)
    {
        $req = DeleteFileRequest::from([
            'fileName' => $fileName,
            'userId' => $userId,
        ]);
        self::request('DELETE', '/file/' . $req->userId . '/' . $req->fileName);
    }

    public static function deleteUserFolder(int $userId)
    {
        $req = DeleteUserFolderRequest::from([
            'userId' => $userId,
        ]);
        self::request('DELETE', '/folder/' . $req->userId);
    }
}
