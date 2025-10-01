import { queryParams, type QueryParams } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Projects\BoardController::show
* @see app/Http/Controllers/Projects/BoardController.php:20
* @route '/projects/{project}/board'
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
    url: '/projects/{project}/board',
}

/**
* @see \App\Http\Controllers\Projects\BoardController::show
* @see app/Http/Controllers/Projects/BoardController.php:20
* @route '/projects/{project}/board'
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
* @see \App\Http\Controllers\Projects\BoardController::show
* @see app/Http/Controllers/Projects/BoardController.php:20
* @route '/projects/{project}/board'
*/
show.get = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Projects\BoardController::show
* @see app/Http/Controllers/Projects/BoardController.php:20
* @route '/projects/{project}/board'
*/
show.head = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Projects\BoardController::store
* @see app/Http/Controllers/Projects/BoardController.php:40
* @route '/projects/{project}/board/{task}/update'
*/
export const store = (args: { project: string | { id: string }, task: string | { id: string } } | [project: string | { id: string }, task: string | { id: string } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/projects/{project}/board/{task}/update',
}

/**
* @see \App\Http\Controllers\Projects\BoardController::store
* @see app/Http/Controllers/Projects/BoardController.php:40
* @route '/projects/{project}/board/{task}/update'
*/
store.url = (args: { project: string | { id: string }, task: string | { id: string } } | [project: string | { id: string }, task: string | { id: string } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            project: args[0],
            task: args[1],
        }
    }

    const parsedArgs = {
        project: typeof args.project === 'object'
        ? args.project.id
        : args.project,
        task: typeof args.task === 'object'
        ? args.task.id
        : args.task,
    }

    return store.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Projects\BoardController::store
* @see app/Http/Controllers/Projects/BoardController.php:40
* @route '/projects/{project}/board/{task}/update'
*/
store.post = (args: { project: string | { id: string }, task: string | { id: string } } | [project: string | { id: string }, task: string | { id: string } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

const BoardController = { show, store }

export default BoardController