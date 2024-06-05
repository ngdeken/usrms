<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Staff\StaffDashboardController;
use App\Http\Controllers\Staff\StaffReportController;
use App\Http\Controllers\Fellow\FellowDashboardController;
use App\Http\Controllers\Student\StudentApplianceController;
use App\Http\Controllers\Student\StudentDashboardController;
use App\Http\Controllers\Student\StudentReportController;
use App\Http\Controllers\Student\StudentQuotaController;

/*Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});*/

Route::redirect('/', '/dashboard');

//Route::middleware('auth')->get('/dashboard', [DashboardController::class, 'index']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.index');
    Route::get('admin/user', [AdminUserController::class, 'index'])->name('admin.user');
    Route::get('admin/create', [AdminUserController::class, 'create'])->name('admin.create');
    Route::post('admin/create', [AdminUserController::class, 'store'])->name('admin.create.store');
    Route::get('admin/user/{user}', [AdminUserController::class, 'edit'])->name('admin.user.edit');
    Route::put('admin/user/{user}', [AdminUserController::class, 'update'])->name('admin.user.update');
    Route::delete('admin/user/{user}', [AdminUserController::class, 'destroy'])->name('admin.user.destroy');
    //Route::resource('admin/user', AdminUserController::class);
});

Route::middleware(['auth', 'staff'])->group(function () {
    Route::get('staff/dashboard', [StaffDashboardController::class, 'index']);
    Route::get('staff/report', [StaffReportController::class, 'index'])->name('staff.report');
    Route::get('staff/report/{report}', [StaffReportController::class, 'edit'])->name('staff.report.edit');
    Route::put('staff/report/{report}', [StaffReportController::class, 'update'])->name('staff.report.update');
    Route::delete('staff/report/{report}', [StaffReportController::class, 'destroy'])->name('staff.report.destroy');
});

Route::middleware(['auth', 'fellow'])->group(function () {
    Route::get('fellow/dashboard', [FellowDashboardController::class, 'index'])->name('fellow.index');
});

Route::middleware(['auth', 'student'])->group(function () {
    Route::get('student/dashboard', [StudentDashboardController::class, 'index']);
    Route::get('student/report', [StudentReportController::class, 'index'])->name('student.report');
    Route::get('student/report/view', [StudentReportController::class, 'show'])->name('student.report.view');
    Route::get('student/quota', [StudentQuotaController::class, 'index'])->name('student.quota');
    Route::get('student/appliance', [StudentApplianceController::class, 'index'])->name('student.appliance');
    Route::get('student/appliance/create', [StudentApplianceController::class, 'create'])->name('student.appliance.create');
    Route::post('student/report', [StudentReportController::class, 'submit'])->name('student.report.submit');
});
require __DIR__.'/auth.php';
