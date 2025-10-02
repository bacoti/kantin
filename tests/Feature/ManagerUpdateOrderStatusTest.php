<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ManagerUpdateOrderStatusTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_update_order_status()
    {
        // buat user manager
        $manager = User::factory()->create(['role' => 'manager']);

        // buat user customer dan order
        $customer = User::factory()->create();
        $order = Order::factory()->create([
            'user_id' => $customer->id,
            'status' => 'pending',
        ]);

        // acting as manager
        $response = $this->actingAs($manager)->put(
            route('manager.orders.updateStatus', ['order' => $order->id]),
            ['status' => 'completed'],
            ['X-Requested-With' => 'XMLHttpRequest']
        );

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'completed',
        ]);
    }
}
