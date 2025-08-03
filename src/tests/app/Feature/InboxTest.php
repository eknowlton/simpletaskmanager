<?php

namespace Tests\App\Feature;

use Shared\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/inbox')->assertRedirect('/login');
});

test('authenticated users can visit the inbox', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/inbox')->assertOk();
});

test('inbox returns inertia component inbox', function () {
    $this->actingAs($user = User::factory()->create());

    $response = $this->get('/inbox');

    $response->assertInertia(fn ($page) => $page
        ->component('inbox')
        ->has('inbox')
        ->has('twoMinute')
    );
});