<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class OrderResource extends JsonResource
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
            'userID' => new UserResource($this->createdBy),
            'applianceID' => new ApplianceResource($this->order),
            'block' => $this->block,
            'room' => $this->room,
            'status' => $this->status,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'updated_by' => new UserResource($this->updatedBy),
        ];
    }
}
