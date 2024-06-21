<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Appliance;
use App\Models\Order;
use App\Http\Resources\ApplianceResource;
use App\Http\Resources\OrderResource;
use App\Http\Requests\UpdateApplianceRequest;

class StaffApplianceController extends Controller
{
    public function index(Request $request)
    {
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

        return Inertia::render('Staff/StaffAppliance', [
            "orders" => OrderResource::collection($orders),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function edit(Order $order)
    {
        return Inertia::render('Staff/StaffApplianceEdit', [
            'order' => new OrderResource($order),
        ]);
    }

    public function update(UpdateApplianceRequest $request, Order $order)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();
        $order->update($data);

        return to_route('staff.appliance')
            ->with('success', "Registration \"$order->status\" was updated");
    }


    public function destroy(Order $order)
    {
        $orderID = $order->id;
        $order->delete();
        
        return to_route('staff.appliance')
            ->with('success', "Appliance \"$orderID\" was deleted");
    }
}
