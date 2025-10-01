import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IndexController::__invoke
* @see app/Http/Controllers/IndexController.php:7
* @route '/'
*/
const IndexController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: IndexController.url(options),
    method: 'get',
})

IndexController.definition = {
    methods: ['get','head'],
    url: '/',
}

/**
* @see \App\Http\Controllers\IndexController::__invoke
* @see app/Http/Controllers/IndexController.php:7
* @route '/'
*/
IndexController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return IndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IndexController::__invoke
* @see app/Http/Controllers/IndexController.php:7
* @route '/'
*/
IndexController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: IndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IndexController::__invoke
* @see app/Http/Controllers/IndexController.php:7
* @route '/'
*/
IndexController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: IndexController.url(options),
    method: 'head',
})

export default IndexController