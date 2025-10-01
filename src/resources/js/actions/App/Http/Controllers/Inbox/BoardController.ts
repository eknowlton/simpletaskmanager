import { queryParams, type QueryParams } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Inbox\BoardController::show
* @see app/Http/Controllers/Inbox/BoardController.php:20
* @route '/inbox/board'
*/
export const show = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/inbox/board',
}

/**
* @see \App\Http\Controllers\Inbox\BoardController::show
* @see app/Http/Controllers/Inbox/BoardController.php:20
* @route '/inbox/board'
*/
show.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Inbox\BoardController::show
* @see app/Http/Controllers/Inbox/BoardController.php:20
* @route '/inbox/board'
*/
show.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Inbox\BoardController::show
* @see app/Http/Controllers/Inbox/BoardController.php:20
* @route '/inbox/board'
*/
show.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Inbox\BoardController::store
* @see app/Http/Controllers/Inbox/BoardController.php:37
* @route '/inbox/board/task/{task}/update'
*/
export const store = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/inbox/board/task/{task}/update',
}

/**
* @see \App\Http\Controllers\Inbox\BoardController::store
* @see app/Http/Controllers/Inbox/BoardController.php:37
* @route '/inbox/board/task/{task}/update'
*/
store.url = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { task: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { task: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            task: args[0],
        }
    }

    const parsedArgs = {
        task: typeof args.task === 'object'
        ? args.task.id
        : args.task,
    }

    return store.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Inbox\BoardController::store
* @see app/Http/Controllers/Inbox/BoardController.php:37
* @route '/inbox/board/task/{task}/update'
*/
store.post = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

const BoardController = { show, store }

export default BoardController