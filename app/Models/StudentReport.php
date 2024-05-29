<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'studentID',
        'blockName',
        'floor',
        'roomID',
        'reportStatus',
        'reportDescription',
        'reportCategory',
        'description',
        'agree',
        'reportImage',
    ];
}
