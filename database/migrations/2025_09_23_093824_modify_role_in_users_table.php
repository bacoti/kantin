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
        // Beberapa driver (sqlite) tidak mendukung ALTER TABLE CHANGE COLUMN dengan sintaks ini.
        // Jadi jalankan statement hanya untuk driver yang mendukungnya (mis. mysql).
        $driver = Schema::getConnection()->getDriverName();
        if ($driver !== 'sqlite') {
            DB::statement("ALTER TABLE users CHANGE COLUMN role role ENUM('customer', 'admin', 'manager') NOT NULL DEFAULT 'customer'");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Mengembalikan kolom 'role' ke kondisi semula jika di-rollback
        $driver = Schema::getConnection()->getDriverName();
        if ($driver !== 'sqlite') {
            DB::statement("ALTER TABLE users CHANGE COLUMN role role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer'");
        }
    }
};
