<?php

namespace App\Http\Controllers;

use App\Models\Status;
use App\Models\Subtask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class SubtaskContoller extends Controller {
    public function getSubtasks() { 
        $tasks = Subtask::where('is_deleted', false)->paginate(15);
        return response()->json([
            'success' => true,
            'data' => $tasks
        ]);
    }
    public function createSubtask(Request $req){
        $validator = $this->validateRequest($req,true);
        if ($validator) { 
            return response()->json($validator);
        }

        $subtask = Subtask::create($req->all());
        return response()->json([
            'success' => true,
            'message' => 'Subtask successfully created',
            'data' => $subtask
        ]);
    }
    public function updateSubtask(Request $req){
        $validator = $this->validateRequest($req);
        if ($validator) { 
            return response()->json($validator);
        }
        $subtask = Subtask::find($req->id);
       $subtask->update($req->all());
        return response()->json([
            'success' => true,
            'message' => 'Subtask successfully updated',
            'data' => $subtask
        ]); 
    }
    public function removeSubtask(Request $req){
        //soft remove task
        $validator = $this->validateRequest($req);
        if ($validator) { 
            return response()->json($validator);
        }
        $subtask = Subtask::find($req->id);
        $subtask->update(['is_deleted' => true]);
        return response()->json([
            'success' => true,
            'message' => 'Task successfully removed',
            'data' => $subtask
        ]);
    }
    private function validateRequest($req, $create = false) { 
        $to_validate =  [
            'task_id' => 'required|numeric',
            'title' => 'required',
            'description' => 'required',
            'due_date' => 'required|date',
            'status_id' => 'required',
        ];
        if (!$create) { 
            $to_validate['id'] = 'required';
        }
        $validator = Validator::make($req->all(),$to_validate);
        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Validation error',
                'data' => $validator->errors()
            ];
        }
        $status = Status::where('id', $req->status_id)->first();
        if (!$status) { 
            return [
                'success' => false,
                'message' => 'Status is not exists'
            ];
        }
        if ($create) { 
            $task = Task::where('id', $req->task_id)->first();
            if (!$task || $task->is_deleted) { 
                $msg = $task && $task->is_deleted ? 'Task is currently removed' : 'Task is not existing';
                return [
                    'success' => false,
                    'message' => $msg
                ];
            }
        }
    }
}
