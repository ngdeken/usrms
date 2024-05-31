<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitReportRequest extends FormRequest
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
            'blockName' => ['required', 'string', 'max:255'],
            'floor' => ['required', 'string', 'max:255'],
            'roomID' => ['required', 'string', 'max:255'],
            'reportStatus'=> ['required', 'string', 'max:255'],
            'reportDescription' => ['required', 'string', 'max:255'],
            'reportCategory' => ['required', 'string', 'max:255'],
            'agree' => ['required', 'boolean'],
            'reportImage' => ['nullable', 'image'],
        ];
    }
}
