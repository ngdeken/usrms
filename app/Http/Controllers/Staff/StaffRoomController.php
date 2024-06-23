<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Block;
use App\Models\Room;
use App\Models\Student;
use App\Http\Resources\BlockResource;
use App\Http\Resources\RoomResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateRoomRequest;
use Inertia\Inertia;

class StaffRoomController extends Controller
{
    public function index()
    {
        $query = Room::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("hostelName")) {
            $query->where("hostelName", "like", "%" . request("hostelName") . "%");
        }
        

        $rooms = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();
        return Inertia::render('Staff/StaffRoom', [
            "rooms" => RoomResource::collection($rooms),
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

    public function allocate(Room $room, Student $students)
    {
        //$students = Student::all();
        $students = Student::with('user')->get();
        return Inertia::render('Staff/StaffAllocate', [
            'room' => new RoomResource($room),
            'students' => $students,
        ]);
    }

    public function allocateStudent(Request $request)
    {
        $request->validate([
            'studentID' => 'required|exists:students,id',
            'roomID' => 'required|exists:rooms,id',
        ]);

        $room = Room::findOrFail($request->roomID);
        if ($room->vacancy <= 0) {
            return redirect()->back()->with('error', 'Room is full');
        }

        $student = Student::findOrFail($request->studentID);
        $student->roomID = $room->id;
        $student->blockID = $room->blockID;
        $student->save();

        $room->vacancy -= 1;
        $room->save();

        return redirect()->route('staff.rooms.index')->with('success', 'Student allocated to the room successfully.');
    }
}
