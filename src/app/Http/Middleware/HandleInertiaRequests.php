<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Shared\Data\ProjectData;
use Shared\Data\ProjectStatusData;
use Shared\Data\TaskStatusData;
use Shared\Data\UserData;
use Shared\Models\Project;
use Shared\ProjectStatus;
use Shared\TaskStatus;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $sidebar_open =
            !$request->hasCookie('sidebar_state')
            || $request->cookie('sidebar_state') === 'true';

        $user = $request->user();

        return [
            ...parent::share($request),

            'name' => config('app.name'),
            'auth' => [
                'user' => $user ? UserData::from($user) : null,
            ],

            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],

            'flash' => session('flash'),

            'sidebar_pen' => $sidebar_open,

            ...($request->user() ? [

                'task_statuses' => TaskStatusData::collect(TaskStatus::cases()),
                'project_statuses' => ProjectStatusData::collect(ProjectStatus::cases()),

                'projects' => ProjectData::collect(Project::forUser($user)->get())
            ] : [])
        ];
    }
}
