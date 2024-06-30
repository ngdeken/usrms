<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Active extends Model
{
    use HasFactory;

    protected $fillable = ['studentID', 'position', 'merit', 'eventID', 'created_by', 'updated_by'];

    public function event()
    {
        return $this->belongsTo(Event::class, 'eventID');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'studentID');
    }
}
