import { queryParams, type QueryParams } from './../../../wayfinder'
import tasks from './tasks'
/**
* @see \Api\Http\Controllers\ProjectController::index
* @see api/Http/Controllers/ProjectController.php:18
* @route '/api/projects'
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
    url: '/api/projects',
}

/**
* @see \Api\Http\Controllers\ProjectController::index
* @see api/Http/Controllers/ProjectController.php:18
* @route '/api/projects'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Api\Http\Controllers\ProjectController::index
* @see api/Http/Controllers/ProjectController.php:18
* @route '/api/projects'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Api\Http\Controllers\ProjectController::index
* @see api/Http/Controllers/ProjectController.php:18
* @route '/api/projects'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Api\Http\Controllers\ProjectController::show
* @see api/Http/Controllers/ProjectController.php:32
* @route '/api/projects/{project}'
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
    url: '/api/projects/{project}',
}

/**
* @see \Api\Http\Controllers\ProjectController::show
* @see api/Http/Controllers/ProjectController.php:32
* @route '/api/projects/{project}'
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
* @see \Api\Http\Controllers\ProjectController::show
* @see api/Http/Controllers/ProjectController.php:32
* @route '/api/projects/{project}'
*/
show.get = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Api\Http\Controllers\ProjectController::show
* @see api/Http/Controllers/ProjectController.php:32
* @route '/api/projects/{project}'
*/
show.head = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Api\Http\Controllers\ProjectController::store
* @see api/Http/Controllers/ProjectController.php:43
* @route '/api/projects'
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
    url: '/api/projects',
}

/**
* @see \Api\Http\Controllers\ProjectController::store
* @see api/Http/Controllers/ProjectController.php:43
* @route '/api/projects'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Api\Http\Controllers\ProjectController::store
* @see api/Http/Controllers/ProjectController.php:43
* @route '/api/projects'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Api\Http\Controllers\ProjectController::update
* @see api/Http/Controllers/ProjectController.php:59
* @route '/api/projects/{project}'
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
    url: '/api/projects/{project}',
}

/**
* @see \Api\Http\Controllers\ProjectController::update
* @see api/Http/Controllers/ProjectController.php:59
* @route '/api/projects/{project}'
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
* @see \Api\Http\Controllers\ProjectController::update
* @see api/Http/Controllers/ProjectController.php:59
* @route '/api/projects/{project}'
*/
update.put = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Api\Http\Controllers\ProjectController::destroy
* @see api/Http/Controllers/ProjectController.php:0
* @route '/api/projects/{project}'
*/
export const destroy = (args: { project: string | number } | [project: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/api/projects/{project}',
}

/**
* @see \Api\Http\Controllers\ProjectController::destroy
* @see api/Http/Controllers/ProjectController.php:0
* @route '/api/projects/{project}'
*/
destroy.url = (args: { project: string | number } | [project: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    if (Array.isArray(args)) {
        args = {
            project: args[0],
        }
    }

    const parsedArgs = {
        project: args.project,
    }

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Api\Http\Controllers\ProjectController::destroy
* @see api/Http/Controllers/ProjectController.php:0
* @route '/api/projects/{project}'
*/
destroy.delete = (args: { project: string | number } | [project: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const projects = {
    index,
    show,
    store,
    update,
    destroy,
    tasks,
}

export default projects