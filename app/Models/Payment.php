<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    public const TYPE_IN = 0;
    public const TYPE_OUT = 1;

    protected $guarded = ['id'];
}
