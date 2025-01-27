<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActiveResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "position" => $this->position,
            "merit" => $this->merit,
            'eventID' => new EventResource($this->event),
            'studentID' => new StudentResource($this->student),
        ];
    }
}
