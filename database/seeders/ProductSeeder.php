<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product; // <-- Jangan lupa import

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Nasi Goreng Spesial',
            'description' => 'Nasi goreng komplit dengan telur mata sapi, ayam suwir, dan sosis.',
            'price' => 18000,
            'image_url' => 'https://images.unsplash.com/photo-1512058564366-185109023977?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
        ]);

        Product::create([
            'name' => 'Mie Ayam Bakso',
            'description' => 'Mie ayam klasik dengan topping ayam cincang dan dua bakso sapi.',
            'price' => 15000,
            'image_url' => 'https://images.unsplash.com/photo-1626728051105-zw08d8f038f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
        ]);

        Product::create([
            'name' => 'Es Teh Manis',
            'description' => 'Minuman teh manis dingin yang menyegarkan.',
            'price' => 5000,
            'image_url' => 'https://images.unsplash.com/photo-1556679343-c7306c1926AE?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
        ]);
    }
}
