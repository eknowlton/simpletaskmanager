<?php

namespace Tests\App\Feature;

use Shared\Models\Task;

it('shows the inertia component tasks.index component', function () {
    $this->actingAs($user = \Shared\Models\User::factory()->create());

    $response = $this->get(route('tasks.index'));

    $response->assertInertia(fn ($page) => $page
        ->component('tasks/index')
        ->has('tasks')
        ->has('projects')
    );
});