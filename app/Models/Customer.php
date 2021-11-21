<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Customer extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public const TYPE_CUSTOMER = 1;
    public const TYPE_SUPPLIER = 1;

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }
}
