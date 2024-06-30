<?php

namespace App\Http\Controllers\Fellow;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Active;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\EventResource;
use App\Http\Resources\ActiveResource;
use App\Http\Requests\UpdateEventRequest;
use Inertia\Inertia;

class FellowActiveController extends Controller
{
    public function index()
{
    $query = Active::with(['event', 'student.user']);

    $sortField = request("sort_field", 'created_at');
    $sortDirection = request("sort_direction", "desc");

    if (request("eventName")) {
        $query->whereHas('event', function ($q) {
            $q->where("name", "like", "%" . request("eventName") . "%");
        });
    }
    
    if (request("eventDate")) {
        $query->whereHas('event', function ($q) {
            $q->where("date", "like", "%" . request("eventDate") . "%");
        });
    }

    $actives = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();

    return Inertia::render('Fellow/FellowActive', [
        "actives" => ActiveResource::collection($actives),
        'queryParams' => request()->query() ?: null,
        'success' => session('success'),
    ]);
}
    public function create(Request $request, Event $events, Student $students)
    {
        $events = Event::all();
        $students = Student::with('user')->get();
        return Inertia::render('Fellow/FellowActiveCreate', ['events' => $events, 'students' => $students,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'position' => 'required|string|max:255',
            'merit' => 'required|integer',
            'studentID' => 'required|integer',
            'eventID' => 'required|integer',
        ]);

        $active = Active::create([
            'position' => $request->position,
            'merit' => $request->merit,
            'studentID' => $request->studentID,
            'eventID' => $request->eventID,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        $student = Student::find($request->studentID);
        $student->increment('merit', $request->merit);

        return to_route('fellow.actives.index')->with('success', 'Participation added successfully');
    }

    public function edit(Event $event)
    {
        
        return Inertia::render('Fellow/FellowEventEdit', [
            'event' => new EventResource($event),
            
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();
        $event->update($data);

        return to_route('fellow.events.index')->with('success', 'Event edited successfully');
    }
}
