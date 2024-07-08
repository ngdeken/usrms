<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Hostel;
use App\Models\Block;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\HostelResource;
use App\Http\Resources\BlockResource;
use App\Http\Requests\UpdateHostelRequest;
use Inertia\Inertia;

class StaffHostelController extends Controller
{
    public function index()
    {
        $query = Hostel::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("hostelName")) {
            $query->where("hostelName", "like", "%" . request("hostelName") . "%");
        }
        

        $hostels = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();
        return Inertia::render('Staff/StaffHostel', [
            "hostels" => HostelResource::collection($hostels),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Staff/StaffHostelCreate', [
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'hostelName' => 'required|string|max:255',
            
        ]);

        Hostel::create([
            'hostelName' => $request->hostelName,
            
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return to_route('staff.hostels.index')->with('success', 'Hostel added successfully');
    }

    public function edit(Block $block, Request $request)
    {
          $query = Block::query();
       // $query = Block::query()->where('hostelID', $request->hostelID);
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("blockName")) {
            $query->where("blockName", "like", "%" . request("blockName") . "%");
        }
    
        $blocks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();
        return Inertia::render('Staff/StaffBlock', [
            "blocks" => BlockResource::collection($blocks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function edithostel(Hostel $hostel)
    {
        return Inertia::render('Staff/StaffHostelEdit', [
            'hostel' => new HostelResource($hostel),
        ]);
    }

    public function update(UpdateHostelRequest $request, Hostel $hostel)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();
        $hostel->update($data);

        return redirect()->route('staff.hostels.index')->with('success', 'Hostel edited successfully.');
    }

    public function destroy(Hostel $hostel)
    {
        $hostelID = $hostel->id;
        $hostel->delete();
        
        return to_route('staff.hostels.index')
            ->with('success', "Report \"$hostelID\" was deleted");
    }
    
}
