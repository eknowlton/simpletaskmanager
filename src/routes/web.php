<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\InboxController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\Projects\TaskController as ProjectTaskController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Inbox\BoardController as InboxBoardController;
use App\Http\Controllers\Inbox\CalendarController as InboxCalendarController;
use App\Http\Controllers\Projects\BoardController as ProjectsBoardController;
use App\Http\Controllers\Projects\CalendarController as ProjectsCalendarController;
use App\Http\Controllers\Projects\InboxController as ProjectsInboxController;
use Illuminate\Support\Facades\Route;

Route::get('/', IndexController::class)->name('index');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::put('/chat', [ChatController::class, 'message'])->name('chat.message');
    Route::post('/chat', [ChatController::class, 'store'])->name('chat.store');

    Route::prefix('inbox')->name('inbox.')->group(function () {
        Route::get('/', InboxController::class)->name('index');

        Route::get('/board', [InboxBoardController::class, 'show'])->name('board');
        Route::post(
            '/board/task/{task}/update',
            [InboxBoardController::class, 'store']
        )->name('board.task.update');

        Route::get('/calendar', [InboxCalendarController::class, 'show'])->name('calendar');
    });

    Route::prefix('tasks')->name('tasks.')->group(function () {
        Route::get('/', [TaskController::class, 'index'])->name('index');
        Route::post('/', [TaskController::class, 'store'])->name('store');
        Route::put('/{task}', [TaskController::class, 'update'])->name('update');
    });

    Route::prefix('projects')->name('projects.')->group(function () {
        Route::get('/', [ProjectController::class, 'index'])->name('index');
        Route::get('/create', [ProjectController::class, 'create'])->name('create');
        Route::put('/create', [ProjectController::class, 'store'])->name('store');
        Route::put('/{project}', [ProjectController::class, 'update'])->name('update');
        Route::get('/{project}', [ProjectController::class, 'show'])->name('show');
        Route::get('/{project}/board', [ProjectsBoardController::class, 'show'])->name('board');
        Route::post(
            '/{project}/board/{task}/update',
            [ProjectsBoardController::class, 'store']
        )->name('board.task.update');

        Route::get('/{project}/calendar', [ProjectsCalendarController::class, 'show'])
            ->name('calendar');
        Route::post('/{project}/tasks/create', [ProjectTaskController::class, 'store'])
            ->name('tasks.store');
        Route::get('/{project}/inbox', ProjectsInboxController::class)->name('inbox');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
