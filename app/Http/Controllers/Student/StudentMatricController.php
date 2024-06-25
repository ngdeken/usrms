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
use App\Http\Requests\UpdateMatricRequest;

class StudentMatricController extends Controller
{
    public function index(Student $student)
    {
        $student = Auth::user()->student;

        return Inertia::render('Student/StudentMatric', [
            
            'student' => new StudentResource($student),
        ]);
    }

    public function update(UpdateMatricRequest $request, Student $student)
    {
        $student = Auth::user()->student;
        $data = $request->validated();
        $student->update($data);

        return to_route('student.matric', $student->id)
            ->with('success', "Registration \"$student->status\" was updated");
    }

}
