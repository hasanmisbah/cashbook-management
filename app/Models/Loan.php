<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    public const STATUS_DUE = 0;
    public const STATUS_PAID = 1;

    protected $guarded = ['id'];
}
