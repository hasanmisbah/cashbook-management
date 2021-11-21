<?php

namespace Database\Factories;

use App\Models\Cashbook;
use Illuminate\Database\Eloquent\Factories\Factory;

class CashbookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'type'   => $this->faker->randomElement([Cashbook::TYPE_IN, Cashbook::TYPE_OUT]),
            'amount' => $this->faker->numberBetween(100, 999),
        ];
    }
}
