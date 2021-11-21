<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'type'   => $this->faker->randomElement([Transaction::TYPE_OUT, Transaction::TYPE_IN]),
            'amount' => $this->faker->numberBetween(100, 999),
        ];
    }
}
