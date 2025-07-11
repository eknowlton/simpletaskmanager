<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/inbox')->assertRedirect('/login');
});

test('authenticated users can visit the inbox', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/inbox')->assertOk();
});