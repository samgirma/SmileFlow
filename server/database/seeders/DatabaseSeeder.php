<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default users for different roles
        $users = [
            [
                'name' => 'Dr. Admin',
                'email' => 'admin@smileflow.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Dr. Smith',
                'email' => 'dentist@smileflow.com',
                'password' => Hash::make('dentist123'),
                'role' => 'dentist',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Jane Doe',
                'email' => 'reception@smileflow.com',
                'password' => Hash::make('reception123'),
                'role' => 'receptionist',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'John Patient',
                'email' => 'patient@smileflow.com',
                'password' => Hash::make('patient123'),
                'role' => 'patient',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($users as $user) {
            User::firstOrCreate(
                ['email' => $user['email']],
                $user
            );
        }

        $this->command->info('Default users created successfully!');
        $this->command->info('Admin: admin@smileflow.com / admin123');
        $this->command->info('Dentist: dentist@smileflow.com / dentist123');
        $this->command->info('Receptionist: reception@smileflow.com / reception123');
        $this->command->info('Patient: patient@smileflow.com / patient123');
    }
}
