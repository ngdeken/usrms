<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'matricID' => $this->matricID,
            'hostelID' => $this->hostelID,
            'userID' => new UserResource($this->user),
            'blockID' => $this->blockID,
            'roomID' => $this->roomID,
            'updated_by' => new UserResource($this->updatedBy),
        ];
    }
}
