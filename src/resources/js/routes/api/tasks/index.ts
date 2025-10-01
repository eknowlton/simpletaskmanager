import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \Api\Http\Controllers\TaskController::index
* @see api/Http/Controllers/TaskController.php:14
* @route '/api/tasks'
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
    url: '/api/tasks',
}

/**
* @see \Api\Http\Controllers\TaskController::index
* @see api/Http/Controllers/TaskController.php:14
* @route '/api/tasks'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Api\Http\Controllers\TaskController::index
* @see api/Http/Controllers/TaskController.php:14
* @route '/api/tasks'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Api\Http\Controllers\TaskController::index
* @see api/Http/Controllers/TaskController.php:14
* @route '/api/tasks'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Api\Http\Controllers\TaskController::show
* @see api/Http/Controllers/TaskController.php:21
* @route '/api/tasks/{task}'
*/
export const show = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/api/tasks/{task}',
}

/**
* @see \Api\Http\Controllers\TaskController::show
* @see api/Http/Controllers/TaskController.php:21
* @route '/api/tasks/{task}'
*/
show.url = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Api\Http\Controllers\TaskController::show
* @see api/Http/Controllers/TaskController.php:21
* @route '/api/tasks/{task}'
*/
show.get = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Api\Http\Controllers\TaskController::show
* @see api/Http/Controllers/TaskController.php:21
* @route '/api/tasks/{task}'
*/
show.head = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Api\Http\Controllers\TaskController::store
* @see api/Http/Controllers/TaskController.php:28
* @route '/api/tasks'
*/
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/api/tasks',
}

/**
* @see \Api\Http\Controllers\TaskController::store
* @see api/Http/Controllers/TaskController.php:28
* @route '/api/tasks'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Api\Http\Controllers\TaskController::store
* @see api/Http/Controllers/TaskController.php:28
* @route '/api/tasks'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Api\Http\Controllers\TaskController::update
* @see api/Http/Controllers/TaskController.php:40
* @route '/api/tasks/{task}'
*/
export const update = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/api/tasks/{task}',
}

/**
* @see \Api\Http\Controllers\TaskController::update
* @see api/Http/Controllers/TaskController.php:40
* @route '/api/tasks/{task}'
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
* @see \Api\Http\Controllers\TaskController::update
* @see api/Http/Controllers/TaskController.php:40
* @route '/api/tasks/{task}'
*/
update.put = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Api\Http\Controllers\TaskController::destroy
* @see api/Http/Controllers/TaskController.php:50
* @route '/api/tasks/{task}'
*/
export const destroy = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/api/tasks/{task}',
}

/**
* @see \Api\Http\Controllers\TaskController::destroy
* @see api/Http/Controllers/TaskController.php:50
* @route '/api/tasks/{task}'
*/
destroy.url = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Api\Http\Controllers\TaskController::destroy
* @see api/Http/Controllers/TaskController.php:50
* @route '/api/tasks/{task}'
*/
destroy.delete = (args: { task: string | { id: string } } | [task: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const tasks = {
    index,
    show,
    store,
    update,
    destroy,
}

export default tasks