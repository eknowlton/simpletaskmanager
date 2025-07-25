<?php

use Api\Http\Controllers\TaskController;
use Api\Http\Controllers\ProjectController;

use Illuminate\Support\Facades\Route;

Route::name('api.')->group(function () {

    Route::prefix('tasks')->name('tasks.')->group(function () {

        Route::get('/', [TaskController::class, 'index'])->name('index');
        Route::get('/{task}', [TaskController::class, 'show'])->name('show');
        Route::post('/', [TaskController::class, 'store'])->name('store');
        Route::put('/{task}', [TaskController::class, 'update'])->name('update');
        Route::delete('/{task}', [TaskController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('projects')->name('projects.')->group(function () {

        Route::get('/', [ProjectController::class, 'index'])->name('index');
        Route::get('/{project}', [ProjectController::class, 'show'])->name('show');
        Route::post('/', [ProjectController::class, 'store'])->name('store');
        Route::put('/{project}', [ProjectController::class, 'update'])->name('update');
        Route::delete('/{project}', [ProjectController::class, 'destory'])->name('destroy');

        Route::prefix('/{project}/tasks')->name('tasks.')->group(function () {

            Route::get('/', [Api\Http\Controllers\Projects\TaskController::class, 'index'])->name('index');
            Route::get('/{task}', [Api\Http\Controllers\Projects\TaskController::class, 'show'])->name('show');
            Route::post('/', [Api\Http\Controllers\Projects\TaskController::class, 'store'])->name('store');
            Route::put('/{task}', [Api\Http\Controllers\Projects\TaskController::class, 'update'])->name('update');
            Route::delete('/{task}', [Api\Http\Controllers\Projects\TaskController::class, 'destroy'])->name('destroy');
        });
    });
});
