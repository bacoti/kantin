<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // LANGKAH 1: Bersihkan data yang tidak valid.
        // Ubah semua role yang bukan 'user' atau 'admin' menjadi 'user'.
        DB::table('users')
            ->whereNotIn('role', ['customer', 'admin'])
            ->update(['role' => 'customer']);

        // LANGKAH 2: Setelah data bersih, ubah struktur kolom.
        DB::statement("ALTER TABLE users CHANGE COLUMN role role ENUM('customer', 'admin', 'manager') NOT NULL DEFAULT 'customer'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Mengembalikan kolom 'role' ke kondisi semula jika di-rollback
        DB::statement("ALTER TABLE users CHANGE COLUMN role role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer'");
    }
};