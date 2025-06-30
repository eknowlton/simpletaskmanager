<?php

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTruncation;
use Inertia\Testing\AssertableInertia as Assert;

uses(DatabaseTruncation::class);

test('login component renders', function () {
    User::factory()->create([
        'email' => 'test@diedump.run',
        'password' => bcrypt('password123'),
    ]);

    $this->get('/login')
        ->assertInertia(function (Assert $page) {
            $page->component('auth/login');
        });
});
