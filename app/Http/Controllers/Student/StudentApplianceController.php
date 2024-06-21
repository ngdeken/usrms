<?php

namespace App\Http\Controllers\Student;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Appliance;
use App\Models\Order;
use App\Http\Resources\ApplianceResource;
use App\Http\Resources\OrderResource;

class StudentApplianceController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Order::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("block")) {
            $query->where("block", "like", "%" . request("block") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $orders = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();

        return Inertia::render('Student/StudentAppliance', [
            "orders" => OrderResource::collection($orders),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        $appliances = Appliance::all();
        return Inertia::render('Student/StudentApplianceCreate', ['appliances' => $appliances]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $quantities = $request->input('quantities', []);

        // Validate the input
        $request->validate([
            'quantities' => 'required|array',
            'quantities.*' => 'integer|min:0',
            'block' => 'required|string|max:255',
            'room' => 'required|string|max:255',
        ]);

        $totalCost = 0;

        foreach ($quantities as $applianceId => $quantity) {
            if ($quantity > 0) {
                $appliance = Appliance::find($applianceId);
                if ($appliance) {
                    // Calculate the total cost for this appliance
                    $cost = $appliance->price * $quantity;
                    $totalCost += $cost;

                    // Store the appliance registration
                    Order::create([
                        'userID' => $user->id,
                        'applianceID' => $applianceId,
                        'quantity' => $quantity,
                        'price' => $cost,
                        'block' => $request->input('block'),
                        'room' => $request->input('room'),
                        'status' => $request->input('status'),
                    ]);
                }
            }
        }

        return redirect()->route('student.appliance')->with('success', 'Appliance registrations submitted successfully.');
    }
}
