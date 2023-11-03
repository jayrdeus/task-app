<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() { 
        Status::create([
            'name' => 'Todo',
            'active' => true
        ]);
        Status::create([
            'name' => 'In Progress',
            'active' => true
        ]);
        Status::create([
            'name' => 'Completed',
            'active' => true
        ]);
    }
}
