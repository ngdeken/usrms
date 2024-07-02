<?php

namespace App\Http\Controllers\Student;

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

class StudentEventController extends Controller
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
        return Inertia::render('Student/StudentEvent', [
            "events" => EventResource::collection($events),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function active()
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

    return Inertia::render('Student/StudentActive', [
        "actives" => ActiveResource::collection($actives),
        'queryParams' => request()->query() ?: null,
        'success' => session('success'),
    ]);
}
}
