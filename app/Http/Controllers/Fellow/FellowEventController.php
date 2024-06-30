<?php

namespace App\Http\Controllers\Fellow;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Hostel;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\EventResource;
use App\Http\Resources\HostelResource;
use App\Http\Requests\UpdateEventRequest;
use Inertia\Inertia;

class FellowEventController extends Controller
{
    public function index()
    {
        $query = Event::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("eventName")) {
            $query->where("eventName", "like", "%" . request("eventName") . "%");
        }
        
        if (request("eventDate")) {
            $query->where("eventDate", "like", "%" . request("eventDate") . "%");
        }

        $events = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();
        return Inertia::render('Fellow/FellowEvent', [
            "events" => EventResource::collection($events),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create(Request $request, Hostel $hostels)
    {
        $hostels = Hostel::all();
        return Inertia::render('Fellow/FellowEventCreate', ['hostels' => $hostels,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'eventName' => 'required|string|max:255',
            'eventDate' => 'required|date',
            'hostelID' => 'required|integer',
        ]);

        Event::create([
            'eventName' => $request->eventName,
            'eventDate' => $request->eventDate,
            'hostelID' => $request->hostelID,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return to_route('fellow.events.index')->with('success', 'Event added successfully');
    }

    public function edit(Event $event, Hostel $hostels)
    {
        $hostels = Hostel::all();
        return Inertia::render('Fellow/FellowEventEdit', [
            'event' => new EventResource($event),
            'hostels' => $hostels,
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
