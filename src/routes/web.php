<?php

use App\Http\Controllers\InboxController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\Projects\TaskController as ProjectTaskController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Inbox\BoardController as InboxBoardController;
use App\Http\Controllers\Inbox\CalendarController as InboxCalendarController;
use App\Http\Controllers\Projects\BoardController as ProjectsBoardController;
use App\Http\Controllers\Projects\CalendarController as ProjectsCalendarController;
use Illuminate\Support\Facades\Route;

Route::get('/', IndexController::class)->name('index');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('inbox')->name('inbox.')->group(function () {
        Route::get('/', InboxController::class)->name('index');
        Route::get('/board', [InboxBoardController::class, 'show'])->name('board');
        Route::post('/board/task/{task}/update', [InboxBoardController::class, 'store'])->name('board.task.update');
        Route::get('/calendar', [InboxCalendarController::class, 'show'])->name('calendar');
    });

    Route::prefix('tasks')->name('tasks.')->group(function () {
        Route::get('/', [TaskController::class, 'index'])->name('index');
        Route::get('/create', [TaskController::class, 'create'])->name('create');
        Route::post('/create', [TaskController::class, 'store'])->name('store');
        Route::get('/{task}', [TaskController::class, 'show'])->name('show');
    });

    Route::prefix('projects')->name('projects.')->group(function () {
        Route::get('/', [ProjectController::class, 'index'])->name('index');
        Route::get('/create', [ProjectController::class, 'create'])->name('create');
        Route::post('/create', [ProjectController::class, 'store'])->name('store');

        Route::get('/{project}/board', [ProjectsBoardController::class, 'show'])->name('board');
        Route::get('/{project}/calendar', [ProjectsCalendarController::class, 'show'])->name('calendar');
        Route::get('/{project}/tasks/create', [ProjectTaskController::class, 'create'])
            ->name('tasks.create');
        Route::post('/{project}/tasks/create', [ProjectTaskController::class, 'store'])
            ->name('tasks.store');
        Route::get('/{project}', [ProjectController::class, 'show'])->name('show');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
