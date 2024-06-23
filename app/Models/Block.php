<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    use HasFactory;

    protected $fillable = ['hostelID', 'blockName', 'roomAmount', 'gender', 'vacancy', 'created_by', 'updated_by'];

    public function hostel()
    {
        return $this->belongsTo(Hostel::class, 'hostelID');
    }

    public function rooms()
    {
        return $this->hasMany(Room::class, 'blockID');
    }
}
