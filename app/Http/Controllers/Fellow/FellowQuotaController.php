<?php

namespace App\Http\Controllers\Fellow;

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

class FellowQuotaController extends Controller
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

        
        return Inertia::render('Fellow/FellowQuota', [
            "quotas" => QuotaResource::collection($quotas),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function edit(Quota $quota)
    {
        return Inertia::render('Fellow/FellowQuotaEdit', [
            'quota' => new QuotaResource($quota),
        ]);
    }

    public function update(UpdateQuotaRequest $request, Quota $quota)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($quota->event) {
                Storage::disk('public')->deleteDirectory(dirname($quota->event));
            }
            $data['event'] = $image->store('report/' . Str::random(), 'public');
        }
        $quota->update($data);

        return to_route('fellow.quota')
            ->with('success', "Report \"$quota->active\" was updated");
    }


    public function destroy(Quota $quota)
    {
        $quotaID = $quota->id;
        $quota->delete();
        if ($quota->event) {
            Storage::disk('public')->deleteDirectory(dirname($quota->event));
        }
        return to_route('fellow.quota')
            ->with('success', "Quota \"$quotaID\" was deleted");
    }
}
