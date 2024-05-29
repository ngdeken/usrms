<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'studentID',
        'userID',
        'matricID',
        'hostelID',
        'blockID',
        'roomID',
        'merit',
        'active',
        'firstRoomType',
        'firstRoomBlock',
        'firstRoomID',
        'secondRoomType',
        'secondRoomBlock',
        'secondRoomID',
        'thirdRoomType',
        'thirdRoomBlock',
        'thirdRoomID',
        'roommate'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }
}

