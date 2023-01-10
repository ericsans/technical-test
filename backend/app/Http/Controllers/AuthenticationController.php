<?php
    namespace App\Http\Controllers;

    use App\Models\User;
    use Illuminate\Http\Request;

    class AuthenticationController extends Controller {

        public function login(Request $request) {
            $requestData = $request->validate([
                'email' => 'required|string',
                'password' => 'required|string'
            ]);
    
            $user = User::where('email', $requestData['email'])->first();
            if(!$user || $requestData['password'] !== $user->password) {
                return $this->respondBadRequest();
            }
    
            $token = $user->createToken('technical_test')->plainTextToken;
            return $this
                ->addViewVar('user', $user)
                ->addViewVar('token', $token)
                ->respondOk();
        }
        
        public function logout() {
            $user = User::find(auth()->user()->id);
            if(!$user) {
                return $this->respondBadRequest();
            }
            
            $user->tokens()->delete();
            return $this
                ->addViewVar('user', $user)
                ->respondOk();
        }
    }