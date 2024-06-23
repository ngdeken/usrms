<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['roomID', 'blockID', 'floor', 'roomType', 'roomPerson', 'vacancy', 'created_by', 'updated_by'];

    public function block()
    {
        return $this->belongsTo(Block::class, 'blockID');
    }
}
