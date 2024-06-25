<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Block;
use App\Models\Room;
use App\Models\Student;
use App\Http\Resources\BlockResource;
use App\Http\Resources\RoomResource;
use App\Http\Resources\StudentResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateRoomRequest;
use Inertia\Inertia;

class StaffAllocateController extends Controller
{
    public function index()
    {
        $query = Student::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("hostelName")) {
            $query->where("hostelName", "like", "%" . request("hostelName") . "%");
        }
        

        $students = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();
        return Inertia::render('Staff/StaffStudent', [
            "students" => StudentResource::collection($students),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create(Request $request, Block $blocks)
    {
        $blocks = Block::all();
        return Inertia::render('Staff/StaffRoomCreate', ['blocks' => $blocks,
        ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'blockID' => 'required|exists:blocks,id',
            'roomID' => 'required|string|max:255',
            'floor' => 'required|string|max:255',
            'roomType' => 'required|string|max:255',
            'vacancy' => 'required|integer',
        ]);

        Room::create([
            'blockID' => $request->blockID,
            'roomID' => $request->roomID,
            'floor' => $request->floor,
            'roomType' => $request->roomType,
            'vacancy' => $request->vacancy,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return redirect()->route('staff.rooms.index', ['block' => $request->blockID])->with('success', 'Room added successfully.');
    }

    public function edit(Room $room, Block $blocks)
    {
        $blocks = Block::all();
        return Inertia::render('Staff/StaffRoomEdit', [
            'room' => new RoomResource($room),
            'blocks' => $blocks,
        ]);
    }

    public function update(UpdateRoomRequest $request, Room $room)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();
        $room->update($data);

        return redirect()->route('staff.rooms.index', ['room' => $request->id])->with('success', 'Room edited successfully.');
    }


    
}
