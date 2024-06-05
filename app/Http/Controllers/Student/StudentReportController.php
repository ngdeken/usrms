<?php

namespace App\Http\Controllers\Student;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\Student;
use App\Models\StudentReport;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\ReportResource;
use App\Http\Requests\SubmitReportRequest;
use Inertia\Response;
use PhpParser\Node\Stmt\Return_;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class StudentReportController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Student/StudentReport', [
        ]);
    }

    public function submit(SubmitReportRequest $request): RedirectResponse
    {
        $report = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $report['reportImage'] ?? null;
        $report['userID'] = Auth::id();
        $report['updated_by'] = Auth::id();
        if ($image) {
            $report['reportImage'] = $image->store('report/' . Str::random(), 'public');
        }
        StudentReport::create($report);
            
        return to_route('student.report.view')->with('success', 'Report submitted successfully');
    }

    public function show(Request $request)
    {
        $query = StudentReport::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("blockName")) {
            $query->where("blockName", "like", "%" . request("blockName") . "%");
        }
        if (request("reportStatus")) {
            $query->where("reportStatus", request("reportStatus"));
        }

        $reports = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();

        
        return Inertia::render('Student/StudentReportView', [
            "reports" => ReportResource::collection($reports),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
