<?php

namespace Tests\App\Browser;

use Shared\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('login component renders', function () {
    User::factory()->create([
        'email' => 'test@jobsho.works',
        'password' => bcrypt('password123'),
    ]);

    $this->get('/login')
        ->assertInertia(function (Assert $page) {
            $page->component('auth/login');
        });
});
