<?php

namespace App\Http\Controllers\Student;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\Student;
use App\Models\Quota;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\QuotaResource;
use App\Http\Requests\StoreQuotaRequest;
use Inertia\Response;
use PhpParser\Node\Stmt\Return_;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class StudentQuotaController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Student/StudentQuota', [
        ]);
    }

    public function store(StoreQuotaRequest $request)
    {
        $quota = $request->validated();
        $file = $quota['event'] ?? null;
        $quota['userID'] = Auth::id();
        $quota['updated_by'] = Auth::id();

        if ($file) {
            $quota['event'] = $file->store('reports/' . Str::random(), 'public');
        }

        Quota::create($quota);

        return to_route('student.quota.show')->with('success', 'Quota submitted successfully');
    }

    public function show(Request $request)
    {
        $query = Quota::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("firstRoomBlock")) {
            $query->where("firstRoomBlock", "like", "%" . request("firstRoomBlock") . "%");
        }
        if (request("active")) {
            $query->where("active", request("active"));
        }

        $quotas = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();

        
        return Inertia::render('Student/StudentQuotaView', [
            "quotas" => QuotaResource::collection($quotas),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
