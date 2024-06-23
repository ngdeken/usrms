<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
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
            'matricID' => ['required', 'string', 'max:255'],
            'hostelID' => ['required', 'string', 'max:255'],
            'blockID' => ['required', 'string', 'max:255'],
            'roomID' => ['required', 'string', 'max:255'],
            'merit'=> ['required', 'integer'],
        ];
    }
}
