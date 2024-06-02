<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class StaffDashboardController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Staff/StaffDashboard', [
        ]);
    }
    //
}
