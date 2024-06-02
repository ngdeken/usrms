<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'reportID' => $this->reportID,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d H:i:s'),
            'blockName' => $this->blockName,
            'userID' => new UserResource($this->createdBy),
            'floor' => $this->floor,
            'roomID' => $this->roomID,
            'reportStatus' => $this->reportStatus,
            'reportDescription' => $this->reportDescription,
            'reportCategory' => $this->reportCategory,
            'agree' => $this->agree,
            'reportImage' => $this->reportImage && !(str_starts_with($this->reportImage, 'http')) ?
                Storage::url($this->reportImage) : $this->reportImage,
            'updated_by' => new UserResource($this->updatedBy),
        ];
    }
}
