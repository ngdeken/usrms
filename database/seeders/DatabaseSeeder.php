<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\DB;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
            User::factory()->createMany([
                [
                    'name' => 'Ken',
                    'email' => 'deken0923@gmail.com',
                    'password' => bcrypt('password'),
                    'role' => '1',
                    'gender' => 'M',
                ],
                [
                    'name' => 'Develop',
                    'email' => 'developing923@gmail.com',
                    'password' => bcrypt('password'),
                    'role' => '2',
                    'gender' => 'M',
                ],
                [
                    'name' => 'Woon',
                    'email' => 'woon@gmail.com',
                    'password' => bcrypt('password'),
                    'role' => '3',
                    'gender' => 'M',
                ],
                [
                    'name' => 'Tan',
                    'email' => 'tan@gmail.com',
                    'password' => bcrypt('password'),
                    'role' => '4',
                    'gender' => 'F',
                ],
                // Add more names here
            ]);
            
            DB::table('students')->insert([
                'studentID' => '1',
                'userID' => '4',
                'matricID' => 'A20EC0001',
                'merit' => '0',
                'active' => '0',
            ]);
    }
}
