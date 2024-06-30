<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'userID',
        'matricID',
        'blockID',
        'roomID',
        'merit',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function block()
    {
        return $this->belongsTo(Block::class, 'blockID');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'roomID');
    }
}

