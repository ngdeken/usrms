<?php

namespace App\Http\Controllers\Student;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\Student;
use App\Models\StudentReport;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\SubmitReportRequest;
use Inertia\Response;
use PhpParser\Node\Stmt\Return_;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class StudentReportController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('StudentReport', [
        ]);
    }

    public function submit(SubmitReportRequest $request): RedirectResponse
    {
        $report = $request->validated();
        $image = $request['reportImage'] ?? null;
        $report['userID'] = Auth::id();
        if ($image) {
            $report['reportImage'] = $image->store('report/' . Str::random(), 'public');
        }
        StudentReport::create($report);
            
        return to_route('student.report')->with('success', 'Report submitted successfully');
    }
}
