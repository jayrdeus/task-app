<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller {
    public function getStatus() { 
        $status = Status::where('active',true)->get();
        return response()->json([
            'success' => true,
            'data' => $status
        ]);
    }
}
