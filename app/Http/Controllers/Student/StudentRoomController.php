<?php

namespace App\Http\Controllers\Student;

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

class StudentRoomController extends Controller
{
    public function index()
    {
        $query = Room::query();
        
        $students = Student::with('user')->get();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("hostelName")) {
            $query->where("hostelName", "like", "%" . request("hostelName") . "%");
        }
        

        $rooms = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();
        return Inertia::render('Student/StudentRoom', [
            "rooms" => RoomResource::collection($rooms),
            'students' => $students,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    
}
