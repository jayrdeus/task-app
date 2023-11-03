<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subtask extends Model {
    use HasFactory;
    protected $fillable = [ 
        'id','title','description', 'due_date','is_deleted','status_id','task_id'
    ];
}
