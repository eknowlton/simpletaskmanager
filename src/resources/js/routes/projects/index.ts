import { queryParams, type QueryParams } from './../../wayfinder'
import board from './board'
/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:17
* @route '/projects'
*/
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/projects',
}

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:17
* @route '/projects'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:17
* @route '/projects'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:17
* @route '/projects'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:30
* @route '/projects/create'
*/
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/projects/create',
}

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:30
* @route '/projects/create'
*/
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:30
* @route '/projects/create'
*/
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:30
* @route '/projects/create'
*/
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:35
* @route '/projects/create'
*/
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: store.url(options),
    method: 'put',
})

store.definition = {
    methods: ['put'],
    url: '/projects/create',
}

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:35
* @route '/projects/create'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:35
* @route '/projects/create'
*/
store.put = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: store.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectController::update
* @see app/Http/Controllers/ProjectController.php:66
* @route '/projects/{project}'
*/
export const update = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/projects/{project}',
}

/**
* @see \App\Http\Controllers\ProjectController::update
* @see app/Http/Controllers/ProjectController.php:66
* @route '/projects/{project}'
*/
update.url = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project: args[0],
        }
    }

    const parsedArgs = {
        project: typeof args.project === 'object'
        ? args.project.id
        : args.project,
    }

    return update.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::update
* @see app/Http/Controllers/ProjectController.php:66
* @route '/projects/{project}'
*/
update.put = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:58
* @route '/projects/{project}'
*/
export const show = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/projects/{project}',
}

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:58
* @route '/projects/{project}'
*/
show.url = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project: args[0],
        }
    }

    const parsedArgs = {
        project: typeof args.project === 'object'
        ? args.project.id
        : args.project,
    }

    return show.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:58
* @route '/projects/{project}'
*/
show.get = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:58
* @route '/projects/{project}'
*/
show.head = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectController::destroy
* @see app/Http/Controllers/ProjectController.php:80
* @route '/projects/{project}'
*/
export const destroy = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/projects/{project}',
}

/**
* @see \App\Http\Controllers\ProjectController::destroy
* @see app/Http/Controllers/ProjectController.php:80
* @route '/projects/{project}'
*/
destroy.url = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project: args[0],
        }
    }

    const parsedArgs = {
        project: typeof args.project === 'object'
        ? args.project.id
        : args.project,
    }

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::destroy
* @see app/Http/Controllers/ProjectController.php:80
* @route '/projects/{project}'
*/
destroy.delete = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Projects\BoardController::board
* @see app/Http/Controllers/Projects/BoardController.php:20
* @route '/projects/{project}/board'
*/
export const board = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: board.url(args, options),
    method: 'get',
})

board.definition = {
    methods: ['get','head'],
    url: '/projects/{project}/board',
}

/**
* @see \App\Http\Controllers\Projects\BoardController::board
* @see app/Http/Controllers/Projects/BoardController.php:20
* @route '/projects/{project}/board'
*/
board.url = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project: args[0],
        }
    }

    const parsedArgs = {
        project: typeof args.project === 'object'
        ? args.project.id
        : args.project,
    }

    return board.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Projects\BoardController::board
* @see app/Http/Controllers/Projects/BoardController.php:20
* @route '/projects/{project}/board'
*/
board.get = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: board.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Projects\BoardController::board
* @see app/Http/Controllers/Projects/BoardController.php:20
* @route '/projects/{project}/board'
*/
board.head = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: board.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Projects\CalendarController::calendar
* @see app/Http/Controllers/Projects/CalendarController.php:14
* @route '/projects/{project}/calendar'
*/
export const calendar = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: calendar.url(args, options),
    method: 'get',
})

calendar.definition = {
    methods: ['get','head'],
    url: '/projects/{project}/calendar',
}

/**
* @see \App\Http\Controllers\Projects\CalendarController::calendar
* @see app/Http/Controllers/Projects/CalendarController.php:14
* @route '/projects/{project}/calendar'
*/
calendar.url = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project: args[0],
        }
    }

    const parsedArgs = {
        project: typeof args.project === 'object'
        ? args.project.id
        : args.project,
    }

    return calendar.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Projects\CalendarController::calendar
* @see app/Http/Controllers/Projects/CalendarController.php:14
* @route '/projects/{project}/calendar'
*/
calendar.get = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: calendar.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Projects\CalendarController::calendar
* @see app/Http/Controllers/Projects/CalendarController.php:14
* @route '/projects/{project}/calendar'
*/
calendar.head = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: calendar.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Projects\InboxController::inbox
* @see app/Http/Controllers/Projects/InboxController.php:13
* @route '/projects/{project}/inbox'
*/
export const inbox = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: inbox.url(args, options),
    method: 'get',
})

inbox.definition = {
    methods: ['get','head'],
    url: '/projects/{project}/inbox',
}

/**
* @see \App\Http\Controllers\Projects\InboxController::inbox
* @see app/Http/Controllers/Projects/InboxController.php:13
* @route '/projects/{project}/inbox'
*/
inbox.url = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project: args[0],
        }
    }

    const parsedArgs = {
        project: typeof args.project === 'object'
        ? args.project.id
        : args.project,
    }

    return inbox.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Projects\InboxController::inbox
* @see app/Http/Controllers/Projects/InboxController.php:13
* @route '/projects/{project}/inbox'
*/
inbox.get = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: inbox.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Projects\InboxController::inbox
* @see app/Http/Controllers/Projects/InboxController.php:13
* @route '/projects/{project}/inbox'
*/
inbox.head = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: inbox.url(args, options),
    method: 'head',
})

const projects = {
    index,
    create,
    store,
    update,
    show,
    destroy,
    board,
    calendar,
    inbox,
}

export default projects