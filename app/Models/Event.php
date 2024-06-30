<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['eventName', 'eventDate', 'hostelID', 'created_by', 'updated_by'];

    public function hostel()
    {
        return $this->belongsTo(Hostel::class, 'hostelID');
    }
}
