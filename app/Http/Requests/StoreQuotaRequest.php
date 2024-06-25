<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuotaRequest extends FormRequest
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
            'active' => ['required', 'string', 'max:255'],
            'event' => ['nullable', 'file'],
            'firstRoomType' => ['nullable', 'string', 'max:255'],
            'firstRoomBlock' => ['nullable', 'string', 'max:255'],
            'firstRoomID' => ['nullable', 'string', 'max:255'],
            'secondRoomType' => ['nullable', 'string', 'max:255'],
            'secondRoomBlock' => ['nullable', 'string', 'max:255'],
            'secondRoomID' => ['nullable', 'string', 'max:255'],
            'thirdRoomType' => ['nullable', 'string', 'max:255'],
            'thirdRoomBlock' => ['nullable', 'string', 'max:255'],
            'thirdRoomID' => ['nullable', 'string', 'max:255'],
            'roommate' => ['nullable', 'string', 'max:255'],
            'roommateMatric' => ['nullable', 'string', 'max:255'],
        ];
    }
}
