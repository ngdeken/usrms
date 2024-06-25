<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quota extends Model
{
    use HasFactory;
    public $table = 'quotas';

    protected $fillable = [
        'userID',
        'active',
        'event',
        'firstRoomType',
        'firstRoomBlock',
        'firstRoomID',
        'secondRoomType',
        'secondRoomBlock',
        'secondRoomID',
        'thirdRoomType',
        'thirdRoomBlock',
        'thirdRoomID',
        'roommate',
        'roommateMatric',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }
    
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'userID');
    }
}
