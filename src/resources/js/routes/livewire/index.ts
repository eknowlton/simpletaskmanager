import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \Livewire\Mechanisms\HandleRequests\HandleRequests::update
* @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
* @route '/livewire/update'
*/
export const update = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '/livewire/update',
}

/**
* @see \Livewire\Mechanisms\HandleRequests\HandleRequests::update
* @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
* @route '/livewire/update'
*/
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Livewire\Mechanisms\HandleRequests\HandleRequests::update
* @see vendor/livewire/livewire/src/Mechanisms/HandleRequests/HandleRequests.php:79
* @route '/livewire/update'
*/
update.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \Livewire\Features\SupportFileUploads\FileUploadController::uploadFile
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FileUploadController.php:22
* @route '/livewire/upload-file'
*/
export const uploadFile = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: uploadFile.url(options),
    method: 'post',
})

uploadFile.definition = {
    methods: ['post'],
    url: '/livewire/upload-file',
}

/**
* @see \Livewire\Features\SupportFileUploads\FileUploadController::uploadFile
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FileUploadController.php:22
* @route '/livewire/upload-file'
*/
uploadFile.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return uploadFile.definition.url + queryParams(options)
}

/**
* @see \Livewire\Features\SupportFileUploads\FileUploadController::uploadFile
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FileUploadController.php:22
* @route '/livewire/upload-file'
*/
uploadFile.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: uploadFile.url(options),
    method: 'post',
})

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::previewFile
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
export const previewFile = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: previewFile.url(args, options),
    method: 'get',
})

previewFile.definition = {
    methods: ['get','head'],
    url: '/livewire/preview-file/{filename}',
}

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::previewFile
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
previewFile.url = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { filename: args }
    }

    if (Array.isArray(args)) {
        args = {
            filename: args[0],
        }
    }

    const parsedArgs = {
        filename: args.filename,
    }

    return previewFile.definition.url
            .replace('{filename}', parsedArgs.filename.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::previewFile
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
previewFile.get = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: previewFile.url(args, options),
    method: 'get',
})

/**
* @see \Livewire\Features\SupportFileUploads\FilePreviewController::previewFile
* @see vendor/livewire/livewire/src/Features/SupportFileUploads/FilePreviewController.php:18
* @route '/livewire/preview-file/{filename}'
*/
previewFile.head = (args: { filename: string | number } | [filename: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: previewFile.url(args, options),
    method: 'head',
})

const livewire = {
    update,
    uploadFile,
    previewFile,
}

export default livewire