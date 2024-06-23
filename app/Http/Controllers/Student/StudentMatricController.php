<?php

namespace App\Http\Controllers\Student;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Appliance;
use App\Models\Order;
use App\Models\Student;
use App\Http\Resources\StudentResource;
use App\Http\Resources\OrderResource;

class StudentMatricController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Student/StudentMatric', [
        ]);
    }


    public function edit(Student $matric)
    {
        return Inertia::render('Student/StudentMatric', [
            'order' => new OrderResource($matric),
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

}
