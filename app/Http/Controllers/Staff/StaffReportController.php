<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\Student;
use App\Models\StudentReport;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\ReportResource;
use App\Http\Requests\UpdateReportRequest;
use Inertia\Response;
use PhpParser\Node\Stmt\Return_;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class StaffReportController extends Controller
{
    public function index(Request $request)
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
        return Inertia::render('Staff/StaffReport', [
            "reports" => ReportResource::collection($reports),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function edit(StudentReport $report)
    {
        return Inertia::render('Staff/StaffReportEdit', [
            'report' => new ReportResource($report),
        ]);
    }

    public function update(UpdateReportRequest $request, StudentReport $report)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($report->reportImage) {
                Storage::disk('public')->deleteDirectory(dirname($report->reportImage));
            }
            $data['reportImage'] = $image->store('report/' . Str::random(), 'public');
        }
        $report->update($data);

        return to_route('staff.report')
            ->with('success', "Report \"$report->reportStatus\" was updated");
    }


    public function destroy(StudentReport $report)
    {
        $reportID = $report->id;
        $report->delete();
        if ($report->reportImage) {
            Storage::disk('public')->deleteDirectory(dirname($report->reportImage));
        }
        return to_route('staff.report')
            ->with('success', "Report \"$reportID\" was deleted");
    }
}
