<?php

namespace App\Http\Controllers;

use App\Models\Status;
use App\Models\Subtask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
class TaskContoller extends Controller {
    //
    public function getTasks() { 
        $tasks = Task::with('Status')->where('is_deleted', false)->orderBy('created_at','desc')->paginate(10);
        return response()->json([
            'success' => true,
            'data' => $tasks
        ]);
    }

    public function searchTask(Request $req) { 
        if ($req->title) { 
            $tasks = Task::with('Status')->where('title', 'like', "%{$req->title}%")->orderBy('created_at','desc')->paginate(10);
            return response()->json([
                'data' => $tasks
            ]);
        }
    }
    public function getTask($id) {
        $task = Task::where('id', $id)->first();
        if ($task) { 
            $encodedImages = [];
            $path = public_path('images/' . $task->id);
            if (File::isDirectory($path)) { 
                $images =  File::allFiles($path);
                foreach($images as $image) { 
                    $imagePath = $image->getRealPath();
                    $base64Image = base64_encode(file_get_contents($imagePath));
                    $encodedImages[] = 'data:image/jpeg;base64,' . $base64Image;
                }
            }
            return response()->json([
                'success' => true,
                'data' => ['task' => $task, 'images' => $encodedImages]
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Task not exists'
        ]);
    }
    public function createTask(Request $req){
        $validator = $this->validateRequest($req);
        if ($validator) { 
            return response()->json($validator);
        }
        $task = Task::create($req->all());
        if ($req->get('images')) { 
            $path = public_path('images/' . $task->id);
            if (!File::isDirectory($path)) { 
                File::makeDirectory($path, 0775, true);
            }
            $images = $req->get('images');
            $i = 1;
            foreach($images as $file) { 
                // $name = time() . '.' . explode('/', explode(':', substr($file, 0, strpos($file, ';')))[1])[1];
                // $image->storeAs('images/'.$req->id, $name);
                
                $image_parts = explode(";base64,", $file);
                
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $i++;
                // Image::make($req->file($file))->save($path.'/'.$name);
                file_put_contents($path.'/'.$i .'.'.$image_type ,$image_base64);
            }
        }
        return response()->json([
            'success' => true,
            'message' => 'Task successfully created',
            'data' => $task
        ]);
    }
    public function updateTask(Request $req){
        $validator = $this->validateRequest($req);
        if ($validator) { 
            return response()->json($validator);
        }
        $task = Task::find($req->id);
        $task->update($req->all());
        return response()->json([
            'success' => true,
            'message' => 'Task successfully updated',
            'data' => $task
        ]); 
    }
    public function removeTask(Request $req){
        //soft remove task
        $validator = $this->validateRequest($req);
        if ($validator) { 
            return response()->json($validator);
        }
        $task = Task::find($req->id);
        $task->update(['is_deleted' => true]);
        return response()->json([
            'success' => true,
            'message' => 'Task successfully removed',
            'data' => $task
        ]);
    }
    public function deleteTask(Request $req) {
        $task = Task::find($req->id);

        $subtask = Subtask::where('task_id', $task->id);
        $subtask->delete();
        $task->delete();
        return response()->json([
            'success' => true,
            'message' => 'Task permanently removed',
        ]);
    }
    private function validateRequest($req) { 
        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'description' => 'required',
            'due_date' => 'required|date',
            'status_id' => 'required',
        ]);
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
    }
}
