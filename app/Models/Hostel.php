<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hostel extends Model
{
    use HasFactory;

    protected $fillable = ['hostelName', 'created_by', 'updated_by'];

    public function blocks()
    {
        return $this->hasMany(Block::class, 'hostelID');
    }
}
