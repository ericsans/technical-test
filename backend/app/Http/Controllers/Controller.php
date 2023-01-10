<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
	
	protected $viewVars = [];
	
	protected $httpStatus = Response::HTTP_OK;

	protected function addViewVar($key, $data) {
		if ($data) {
			$this->viewVars[$key] = $data;
		}
		
		return $this;
	}

	protected function respondAccepted($message = 'Accepted') {
		return $this->setHttpStatus(Response::HTTP_ACCEPTED)->serialize(['status' => Response::HTTP_ACCEPTED, 'message' => $message]);
	}

	protected function respondBadRequest($message = 'Bad Request') {
		return $this->setHttpStatus(Response::HTTP_BAD_REQUEST)->serialize(['status' => Response::HTTP_BAD_REQUEST, 'message' => $message]);
	}

	protected function respondInternalServerError($message = 'Internal Server Error') {
		return $this->setHttpStatus(Response::HTTP_INTERNAL_SERVER_ERROR)->serialize(['status' => Response::HTTP_INTERNAL_SERVER_ERROR, 'message' => $message]);
	}

	protected function respondCreated($message = 'Created') {
		return $this->setHttpStatus(Response::HTTP_CREATED)->serialize(['status' => Response::HTTP_CREATED, 'message' => $message]);
	}

	protected function respondOk($message = 'OK') {
		return $this->setHttpStatus(Response::HTTP_OK)->serialize(['status' => Response::HTTP_OK, 'message' => $message]);
	}

	protected function respondNotAuthorized($message = 'Not Authorized') {
		return $this->setHttpStatus(Response::HTTP_UNAUTHORIZED)->serialize(['status' => Response::HTTP_UNAUTHORIZED, 'message' => $message]);
	}

	protected function respondNotFound($message = 'Data Not Found') {
		return $this->setHttpStatus(Response::HTTP_NOT_FOUND)->serialize(['status' => Response::HTTP_NOT_FOUND, 'message' => $message]);
	}

	protected function getHttpStatus() {
		return $this->httpStatus;
	}

	protected function setHttpStatus($httpStatus) {
		$this->httpStatus = $httpStatus;
		return $this;
	}

	private function serialize($viewVars) {
		return response()->json(array_merge($viewVars, $this->viewVars), $this->getHttpStatus());
	}
}
