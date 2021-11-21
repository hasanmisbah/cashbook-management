<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    public const STATUS_DUE = 0;
    public const STATUS_PENDING = 1;
    public const STATUS_PAID = 2;
    public const STATUS_CANCELLED = 3;

    public const TYPE_IN = 0;
    public const TYPE_OUT = 1;

    public const REF_PURCHASES = 0;
    public const REF_ORDERS = 1;
    public const REF_LOANS = 2;

    protected $guarded = ['id'];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }
}
