<?php

namespace App\Http\Controllers\Student;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class StudentDashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        return Inertia::render('StudentDashboard', [
        ]);
    }
}
