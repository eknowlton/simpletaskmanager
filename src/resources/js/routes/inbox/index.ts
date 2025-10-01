import { queryParams, type QueryParams } from './../../wayfinder'
import board from './board'
/**
* @see \App\Http\Controllers\InboxController::index
* @see app/Http/Controllers/InboxController.php:12
* @route '/inbox'
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
    url: '/inbox',
}

/**
* @see \App\Http\Controllers\InboxController::index
* @see app/Http/Controllers/InboxController.php:12
* @route '/inbox'
*/
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InboxController::index
* @see app/Http/Controllers/InboxController.php:12
* @route '/inbox'
*/
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InboxController::index
* @see app/Http/Controllers/InboxController.php:12
* @route '/inbox'
*/
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Inbox\BoardController::board
* @see app/Http/Controllers/Inbox/BoardController.php:20
* @route '/inbox/board'
*/
export const board = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: board.url(options),
    method: 'get',
})

board.definition = {
    methods: ['get','head'],
    url: '/inbox/board',
}

/**
* @see \App\Http\Controllers\Inbox\BoardController::board
* @see app/Http/Controllers/Inbox/BoardController.php:20
* @route '/inbox/board'
*/
board.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return board.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Inbox\BoardController::board
* @see app/Http/Controllers/Inbox/BoardController.php:20
* @route '/inbox/board'
*/
board.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: board.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Inbox\BoardController::board
* @see app/Http/Controllers/Inbox/BoardController.php:20
* @route '/inbox/board'
*/
board.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: board.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Inbox\CalendarController::calendar
* @see app/Http/Controllers/Inbox/CalendarController.php:14
* @route '/inbox/calendar'
*/
export const calendar = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: calendar.url(options),
    method: 'get',
})

calendar.definition = {
    methods: ['get','head'],
    url: '/inbox/calendar',
}

/**
* @see \App\Http\Controllers\Inbox\CalendarController::calendar
* @see app/Http/Controllers/Inbox/CalendarController.php:14
* @route '/inbox/calendar'
*/
calendar.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return calendar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Inbox\CalendarController::calendar
* @see app/Http/Controllers/Inbox/CalendarController.php:14
* @route '/inbox/calendar'
*/
calendar.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: calendar.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Inbox\CalendarController::calendar
* @see app/Http/Controllers/Inbox/CalendarController.php:14
* @route '/inbox/calendar'
*/
calendar.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: calendar.url(options),
    method: 'head',
})

const inbox = {
    index,
    board,
    calendar,
}

export default inbox