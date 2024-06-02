<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentReport extends Model
{
    use HasFactory;
    public $table = 'reports';
    protected $fillable = [
        'blockName',
        'userID',
        'floor',
        'roomID',
        'reportStatus',
        'reportDescription',
        'reportCategory',
        'description',
        'agree',
        'reportImage',
        'updated_by',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'userID');
    }
}
