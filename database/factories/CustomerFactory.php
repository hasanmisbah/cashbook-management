<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'name'        => $this->faker->name,
            'address'     => $this->faker->address,
            'phone'       => $this->faker->e164PhoneNumber,
            'email'       => $this->faker->safeEmail,
            'type'        => $this->faker->randomElement([Customer::TYPE_CUSTOMER, Customer::TYPE_SUPPLIER]),
            'description' => $this->faker->words(5, true),
        ];
    }
}
