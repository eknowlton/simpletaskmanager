import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \Api\Http\Controllers\Projects\TaskController::index
* @see api/Http/Controllers/Projects/TaskController.php:17
* @route '/api/projects/{project}/tasks'
*/
export const index = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/api/projects/{project}/tasks',
}

/**
* @see \Api\Http\Controllers\Projects\TaskController::index
* @see api/Http/Controllers/Projects/TaskController.php:17
* @route '/api/projects/{project}/tasks'
*/
index.url = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return index.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Api\Http\Controllers\Projects\TaskController::index
* @see api/Http/Controllers/Projects/TaskController.php:17
* @route '/api/projects/{project}/tasks'
*/
index.get = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \Api\Http\Controllers\Projects\TaskController::index
* @see api/Http/Controllers/Projects/TaskController.php:17
* @route '/api/projects/{project}/tasks'
*/
index.head = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

const tasks = {
    index,
}

export default tasks