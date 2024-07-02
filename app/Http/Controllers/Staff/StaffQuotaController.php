<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\Student;
use App\Models\Quota;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\QuotaResource;
use App\Http\Requests\UpdateQuotaRequest;
use Inertia\Response;
use PhpParser\Node\Stmt\Return_;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class StaffQuotaController extends Controller
{
    public function index(Request $request)
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

        
        return Inertia::render('Staff/StaffQuota', [
            "quotas" => QuotaResource::collection($quotas),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

}
