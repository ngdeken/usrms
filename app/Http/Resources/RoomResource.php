<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "roomID" => $this->roomID,
            "blockID" => new BlockResource($this->block),
            "floor" => $this->floor,
            "roomType" => $this->roomType,
            "vacancy" => $this->vacancy,
        ];
    }
}
