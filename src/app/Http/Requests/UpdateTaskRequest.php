<?php

namespace App\Http\Requests;

use Shared\TaskStatus;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('task'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255', 'min:3'],
            'description' => ['required', 'string'],
            'due_date' => [
                'nullable',
                'date'
            ],
            'status' => [
                'required',
                Rule::in(array_map(fn($status) => $status->value, TaskStatus::cases()))
            ],
            'priority' => [
                'nullable'
            ],
            'tags' => [
                'nullable',
                'array'
            ],
            'tags.*' => [
                'nullable'
            ],
            'tags.*.value' => [
                'string',
                'required'
            ],
            'tags.*.label' => [
                'string',
                'required'
            ],
            'project_id' => [
                'nullable',
                Rule::exists('projects', 'id')->where(function ($query) {
                    $query->where('user_id', $this->user()->id);
                })
            ],
        ];
    }
}
