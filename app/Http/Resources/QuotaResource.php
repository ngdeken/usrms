<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class QuotaResource extends JsonResource
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
            'id' => $this->id,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d H:i:s'),
            'blockName' => $this->blockName,
            'userID' => new UserResource($this->createdBy),
            'event' => $this->event ? Storage::url($this->event) : null,
            'firstRoomType' => $this->firstRoomType,
            'firstRoomBlock' => $this->firstRoomBlock,
            'firstRoomID' => $this->firstRoomID,
            'secondRoomType' => $this->secondRoomType,
            'secondRoomBlock' => $this->secondRoomBlock,
            'secondRoomID' => $this->secondRoomID,
            'thirdRoomType' => $this->thirdRoomType,
            'thirdRoomBlock' => $this->thirdRoomBlock,
            'thirdRoomID' => $this->thirdRoomID,
            'roommate' => $this->roommate,
            'roommateMatric' => $this->roommateMatric,
            'updated_by' => new UserResource($this->updatedBy),
        ];
    }
}
