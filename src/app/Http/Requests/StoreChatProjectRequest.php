<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Shared\ProjectStatus;
use Shared\TaskStatus;

class StoreChatProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'project.title' => ['required', 'string', 'max:255'],
            'project.description' => ['nullable', 'string'],
            'project.color' => ['nullable', 'string', 'min:7', 'max:7'],

            'tasks.*.title' => ['required', 'string', 'max:255'],
            'tasks.*.description' => ['required', 'string'],
            'tasks.*.due_date' => [
                'nullable',
                'date'
            ],
            'tasks.*.status' => [
                'required',
                Rule::in(array_map(fn($status) => $status->value, TaskStatus::cases()))
            ],
            'tasks.*.priority' => [
                'nullable'
            ],
            'tasks.*.tags' => ['array'],
            'tasks.*.project_id' => [
                'nullable',
                Rule::exists('projects', 'id')->where(function ($query) {
                    $query->where('user_id', $this->user()->id);
                })
            ]
        ];
    }
}
