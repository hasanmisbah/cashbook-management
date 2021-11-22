<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrganizationFactory extends Factory
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
            'description' => $this->faker->words(5, true),
        ];
    }
}
