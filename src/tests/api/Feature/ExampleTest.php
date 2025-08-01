<?php

namespace Tests\Api\Feature;

it('returns a successful response', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
