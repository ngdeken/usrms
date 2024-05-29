<?php

namespace App\Http\Controllers\Student;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\StudentReport;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use PhpParser\Node\Stmt\Return_;

class StudentReportController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('StudentReport', [
            //'auth' => Auth::user()
        ]);
    }

    public function submit(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'studentID' => 'required|integer',
            'blockName' => 'required|string|max:255',
            'floor' => 'required|string|max:1',
            'roomID' => 'required|string|max:255',
            'reportStatus' => 'required|string|max:255',
            'reportDescription' => 'required|string|max:255',
            'reportCategory' => 'required|string|max:255',
            'agree' => 'required|boolean',
            'reportImage' => 'nullable|file|mimes:jpg,jpeg,png'
        ]);

        $filePath = null;
        if ($request->hasFile('reportImage')) {
            $filePath = $request->file('reportImage')->store('reportImage');
        }

        $report = new StudentReport;
        $report->userID = Auth::user()->id;
        $report->blockName = $validatedData['blockName'];
        $report->floor = $validatedData['floor'];
        $report->roomID = $validatedData['roomID'];
        $report->reportStatus = $validatedData['reportStatus'];
        $report->reportDescription = $validatedData['reportDescription'];
        $report->reportCategory = $validatedData['reportCategory'];
        $report->agree = $validatedData['agree'];
        $report->reportImage = $filePath;
        $report->save();
            
        return redirect()->route('student.report')->with('success', 'Report submitted successfully');
    }
}
