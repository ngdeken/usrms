<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Hostel;
use App\Models\Block;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\BlockResource;
use App\Http\Resources\HostelResource;
use App\Http\Requests\UpdateBlockRequest;
use Inertia\Inertia;

class StaffBlockController extends Controller
{
    public function index()
    {
        $query = Block::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("blockName")) {
            $query->where("blockName", "like", "%" . request("blockName") . "%");
        }
        

        $blocks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();
        return Inertia::render('Staff/StaffHostel', [
            "blocks" => BlockResource::collection($blocks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create(Request $request, Hostel $hostels)
    {
        $hostels = Hostel::all();
        return Inertia::render('Staff/StaffBlockCreate', ['hostels' => $hostels,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'hostelID' => 'required|exists:hostels,id',
            'blockName' => 'required|string|max:255',
            'gender' => 'required|in:M,F',
        ]);

        Block::create([
            'hostelID' => $request->hostelID,
            'blockName' => $request->blockName,
            'gender' => $request->gender,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return redirect()->route('staff.hostels.edit', ['hostel' => $request->hostelID])->with('success', 'Block added successfully.');
    }

    public function edit(Block $block, Hostel $hostels)
    {
        $hostels = Hostel::all();
        return Inertia::render('Staff/StaffBlockEdit', [
            'block' => new BlockResource($block),
            'hostels' => $hostels,
        ]);
    }

    public function update(UpdateBlockRequest $request, Block $block)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();
        $block->update($data);

        return redirect()->route('staff.hostels.edit', ['hostel' => $request->hostelID])->with('success', 'Block edited successfully.');
    }

    public function destroy(Block $block)
    {
        $blockID = $block->id;
        $block->delete();
        
        return to_route('staff.hostels.edit')
            ->with('success', "Block \"$blockID\" was deleted");
    }
}
