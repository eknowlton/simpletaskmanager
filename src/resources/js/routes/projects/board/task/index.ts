import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Projects\BoardController::update
* @see app/Http/Controllers/Projects/BoardController.php:40
* @route '/projects/{project}/board/{task}/update'
*/
export const update = (args: { project: string | { id: string }, task: string | { id: string } } | [project: string | { id: string }, task: string | { id: string } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '/projects/{project}/board/{task}/update',
}

/**
* @see \App\Http\Controllers\Projects\BoardController::update
* @see app/Http/Controllers/Projects/BoardController.php:40
* @route '/projects/{project}/board/{task}/update'
*/
update.url = (args: { project: string | { id: string }, task: string | { id: string } } | [project: string | { id: string }, task: string | { id: string } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Projects\BoardController::update
* @see app/Http/Controllers/Projects/BoardController.php:40
* @route '/projects/{project}/board/{task}/update'
*/
update.post = (args: { project: string | { id: string }, task: string | { id: string } } | [project: string | { id: string }, task: string | { id: string } ], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
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