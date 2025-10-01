import { queryParams, type QueryParams } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Projects\InboxController::__invoke
* @see app/Http/Controllers/Projects/InboxController.php:13
* @route '/projects/{project}/inbox'
*/
const InboxController = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: InboxController.url(args, options),
    method: 'get',
})

InboxController.definition = {
    methods: ['get','head'],
    url: '/projects/{project}/inbox',
}

/**
* @see \App\Http\Controllers\Projects\InboxController::__invoke
* @see app/Http/Controllers/Projects/InboxController.php:13
* @route '/projects/{project}/inbox'
*/
InboxController.url = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return InboxController.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Projects\InboxController::__invoke
* @see app/Http/Controllers/Projects/InboxController.php:13
* @route '/projects/{project}/inbox'
*/
InboxController.get = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: InboxController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Projects\InboxController::__invoke
* @see app/Http/Controllers/Projects/InboxController.php:13
* @route '/projects/{project}/inbox'
*/
InboxController.head = (args: { project: string | { id: string } } | [project: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: InboxController.url(args, options),
    method: 'head',
})

export default InboxController