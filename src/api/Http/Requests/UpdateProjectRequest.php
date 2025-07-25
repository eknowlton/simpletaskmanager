<?php

namespace Api\Http\Requests;

use Shared\ProjectStatus;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'status' => [
                'required',
                'string',
                Rule::in(collect(ProjectStatus::cases())
                    ->map(fn($status) => $status->value))
            ],
            'color' => ['nullable', 'string', 'max:7'],
        ];
    }
}
