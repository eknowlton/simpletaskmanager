import { queryParams, type QueryParams } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Inbox\CalendarController::show
* @see app/Http/Controllers/Inbox/CalendarController.php:14
* @route '/inbox/calendar'
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
    url: '/inbox/calendar',
}

/**
* @see \App\Http\Controllers\Inbox\CalendarController::show
* @see app/Http/Controllers/Inbox/CalendarController.php:14
* @route '/inbox/calendar'
*/
show.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Inbox\CalendarController::show
* @see app/Http/Controllers/Inbox/CalendarController.php:14
* @route '/inbox/calendar'
*/
show.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Inbox\CalendarController::show
* @see app/Http/Controllers/Inbox/CalendarController.php:14
* @route '/inbox/calendar'
*/
show.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(options),
    method: 'head',
})

const CalendarController = { show }

export default CalendarController