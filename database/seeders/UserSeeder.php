<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\ExpenseSource;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name'     => 'Super Admin',
            'email'    => 'admin@gmail.com',
            'phone'    => '01712345678',
            'password' => Hash::make('123456'),
        ]);

        Organization::factory()
            ->count(1)
            ->state(['user_id' => $user->id ])

            ->afterCreating(function($organization){

                ExpenseSource::factory()
                    ->count(50)
                    ->state([
                        'organization_id' => $organization->id
                    ])
                    ->afterCreating(function($expenseSource) use($organization){

                        Expense::factory()->count(30)->state([
                            'organization_id' => $organization->id,
                            'source_id' => $expenseSource->id
                        ])->create();
                    })

                    ->create()
                ;
            })
            ->create();

        User::factory()->count(3)->create();
    }
}
