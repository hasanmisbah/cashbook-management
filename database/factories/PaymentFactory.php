<?php

namespace Database\Factories;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $paymentsType = [Payment::TYPE_IN, Payment::TYPE_OUT];
        $selectedType = $this->faker->randomElement($paymentsType);

        return [
            'amount' => $this->faker->numberBetween(100, 999),
            'type'   => $selectedType,
        ];
    }
}
