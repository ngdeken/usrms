<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ApplianceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('appliances')->insert([
            [
                'name' => 'Iron',
                'price' => '10',
            ],
            [
                'name' => 'Electric Kettle',
                'price' => '10',
            ],
            [
                'name' => 'Package (Iron + Electric kettle)',
                'price' => '15',
            ],
            [
                'name' => 'Toaster',
                'price' => '10',
            ],
            [
                'name' => 'Table fan',
                'price' => '10',
            ],
            [
                'name' => 'Hairdryer',
                'price' => '5',
            ],
            [
                'name' => 'Radio',
                'price' => '5',
            ],
            [
                'name' => 'Phone Charger',
                'price' => '0',
            ],
            [
                'name' => 'Laptop',
                'price' => '0',
            ],
        ]);
    }
}
