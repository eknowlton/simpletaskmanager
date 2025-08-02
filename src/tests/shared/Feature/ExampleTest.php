<?php

namespace Tests\Shared\Feature;

it('returns a successful response', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
