<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller {
    public function register(Request $req) {
        $validator = Validator::make($req->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'data' => $validator->errors()
            ]);
        }
        $input = $req->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $output['token'] = $user->createToken('task-app')->plainTextToken;
        $output['name'] = $user->name;
        return response()->json([
            'success' => true,
            'data' => $output,
            'message' => 'User registration success'
        ]);
    }
    public function login(Request $req) {
        $validator = Validator::make($req->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'data' => $validator->errors()
            ]);
        }
        if (!Auth::attempt($req->only(['email','password']))) { 
            return response()->json([
                'success' => false,
                'message' => 'Incorrect username or password. Please try again',
            ]);
        }
        $user = User::where('email',$req->email)->first();
        $output['name'] = $user->name;
        $output['token'] = $user->createToken('task-app')->plainTextToken;
        return response()->json([
            'success' => true,
            'data' => $output
        ]);
    }
}
