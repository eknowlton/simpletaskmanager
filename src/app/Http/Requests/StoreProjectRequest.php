<?php

namespace App\Http\Requests;

use Shared\ProjectStatus;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'status' => [
                'required',
                'string',
                Rule::in(array_map(fn($status) => $status->value, ProjectStatus::cases()))
            ],
            'color' => ['nullable', 'string', 'min:7', 'max:7'],
        ];
    }
}
