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

class StudentQuotaController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Student/StudentQuota', [
        ]);
    }
}
