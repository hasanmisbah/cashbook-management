<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function source(): BelongsTo
    {
        return $this->belongsTo(ExpenseSource::class);
    }

    public function getAmountAttribute($value)
    {
        return ($value / 100);
    }

    public function setAmountAttribute($value)
    {
        $this->attributes['amount'] = ($value * 100);
    }

}
