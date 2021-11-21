<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LoanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'amount'      => $this->faker->numberBetween(0,999),
            'description' => $this->faker->words(5, true),
        ];
    }
}
