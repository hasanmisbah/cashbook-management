<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cashbook extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public const TYPE_IN = 0;
    public const TYPE_OUT = 1;

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }
}
