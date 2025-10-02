import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \LaraBug\Http\Controllers\LaraBugReportController::report
* @see vendor/larabug/larabug/src/Http/Controllers/LaraBugReportController.php:13
* @route '/larabug-api/javascript-report'
*/
export const report = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: report.url(options),
    method: 'post',
})

report.definition = {
    methods: ['post'],
    url: '/larabug-api/javascript-report',
}

/**
* @see \LaraBug\Http\Controllers\LaraBugReportController::report
* @see vendor/larabug/larabug/src/Http/Controllers/LaraBugReportController.php:13
* @route '/larabug-api/javascript-report'
*/
report.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return report.definition.url + queryParams(options)
}

/**
* @see \LaraBug\Http\Controllers\LaraBugReportController::report
* @see vendor/larabug/larabug/src/Http/Controllers/LaraBugReportController.php:13
* @route '/larabug-api/javascript-report'
*/
report.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: report.url(options),
    method: 'post',
})

const LaraBugReportController = { report }

export default LaraBugReportController