<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    public const STATUS_DUE = 0;
    public const STATUS_PENDING = 1;
    public const STATUS_PAID = 2;
    public const STATUS_CANCELLED = 3;

    public const TYPE_IN = 0;
    public const TYPE_OUT = 1;

    protected $guarded = ['id'];
}
