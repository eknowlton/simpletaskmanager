import { queryParams, type QueryParams } from './../../wayfinder';
/**
 * @see \App\Http\Controllers\TaskController::index
 * @see app/Http/Controllers/TaskController.php:14
 * @route '/tasks'
 */
export const index = (options?: {
    query?: QueryParams;
    mergeQuery?: QueryParams;
}): {
    url: string;
    method: 'get';
} => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/tasks',
};

/**
 * @see \App\Http\Controllers\TaskController::index
 * @see app/Http/Controllers/TaskController.php:14
 * @route '/tasks'
 */
index.url = (options?: { query?: QueryParams; mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\TaskController::index
 * @see app/Http/Controllers/TaskController.php:14
 * @route '/tasks'
 */
index.get = (options?: {
    query?: QueryParams;
    mergeQuery?: QueryParams;
}): {
    url: string;
    method: 'get';
} => ({
    url: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\TaskController::index
 * @see app/Http/Controllers/TaskController.php:14
 * @route '/tasks'
 */
index.head = (options?: {
    query?: QueryParams;
    mergeQuery?: QueryParams;
}): {
    url: string;
    method: 'head';
} => ({
    url: index.url(options),
    method: 'head',
});

const tasks = {
    index,
};

export default tasks;
