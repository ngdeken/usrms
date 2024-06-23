<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Hostel;
use App\Models\Block;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\HostelResource;
use App\Http\Resources\BlockResource;
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
}
