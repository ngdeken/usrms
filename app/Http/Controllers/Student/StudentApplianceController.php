<?php

namespace App\Http\Controllers\Student;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class StudentApplianceController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        return Inertia::render('Student/StudentAppliance', [
        ]);
    }

    public function create()
    {
        return Inertia::render('Student/StudentApplianceCreate', [
        ]);
    }
}
