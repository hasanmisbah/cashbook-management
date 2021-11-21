<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'amount'      => $this->faker->numberBetween(100, 999),
            'discount'    => 0,
            'description' => $this->faker->words(5, true),
        ];
    }
}
