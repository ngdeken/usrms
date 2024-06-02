<?php

namespace App\Http\Controllers\Fellow;

use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
class FellowDashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        return Inertia::render('Fellow/FellowDashboard', [
        ]);
    }
}
