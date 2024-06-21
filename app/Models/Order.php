<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'applianceID',
        'quantity',
        'price',
        'block',
        'room',
        'userID',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }

    public function order()
    {
        return $this->belongsTo(Appliance::class, 'applianceID', 'id');
    }
}

