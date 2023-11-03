<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Task extends Model {
    use HasFactory;
    
    protected $fillable = [ 
        'id','title','description', 'due_date','is_deleted','status_id'
    ];
    public function Status() { 
        return $this->belongsTo(Status::class,'status_id','id');
    }
}
