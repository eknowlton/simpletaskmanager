import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Inbox\BoardController::update
* @see app/Http/Controllers/Inbox/BoardController.php:37
* @route '/inbox/board/task/{task}/update'
*/
export const update = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '/inbox/board/task/{task}/update',
}

/**
* @see \App\Http\Controllers\Inbox\BoardController::update
* @see app/Http/Controllers/Inbox/BoardController.php:37
* @route '/inbox/board/task/{task}/update'
*/
update.url = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Inbox\BoardController::update
* @see app/Http/Controllers/Inbox/BoardController.php:37
* @route '/inbox/board/task/{task}/update'
*/
update.post = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

const task = {
    update,
}

export default task