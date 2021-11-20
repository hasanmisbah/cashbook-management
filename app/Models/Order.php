<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public const STATUS_DUE = 0;
    public const STATUS_PENDING = 1;
    public const STATUS_PAID = 2;
    public const STATUS_CANCELLED = 3;

    protected $guarded = ['id'];
}
