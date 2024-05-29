<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        return Inertia::render('AdminDashboard', [
        ]);
    }
}
