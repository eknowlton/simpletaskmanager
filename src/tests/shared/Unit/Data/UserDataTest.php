<?php

namespace Tests\Unit\Data;

use Shared\Data\UserData;
use Shared\Models\User;

it('can create a UserData from a User', function () {
    $user = User::factory()->create();

    $userData = UserData::from($user);

    expect($userData)
        ->toBeInstanceOf(UserData::class);
});