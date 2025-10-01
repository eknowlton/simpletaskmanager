import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\InboxController::__invoke
* @see app/Http/Controllers/InboxController.php:12
* @route '/inbox'
*/
const InboxController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: InboxController.url(options),
    method: 'get',
})

InboxController.definition = {
    methods: ['get','head'],
    url: '/inbox',
}

/**
* @see \App\Http\Controllers\InboxController::__invoke
* @see app/Http/Controllers/InboxController.php:12
* @route '/inbox'
*/
InboxController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return InboxController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InboxController::__invoke
* @see app/Http/Controllers/InboxController.php:12
* @route '/inbox'
*/
InboxController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: InboxController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InboxController::__invoke
* @see app/Http/Controllers/InboxController.php:12
* @route '/inbox'
*/
InboxController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: InboxController.url(options),
    method: 'head',
})

export default InboxController