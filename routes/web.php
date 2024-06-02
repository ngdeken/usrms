<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Staff\StaffDashboardController;
use App\Http\Controllers\Fellow\FellowDashboardController;
use App\Http\Controllers\Student\StudentDashboardController;
use App\Http\Controllers\Student\StudentReportController;

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
    Route::get('admin/dashboard', [AdminDashboardController::class, 'index']);
});

Route::middleware(['auth', 'staff'])->group(function () {
    Route::get('staff/dashboard', [StaffDashboardController::class, 'index']);
});

Route::middleware(['auth', 'fellow'])->group(function () {
    Route::get('fellow/dashboard', [FellowDashboardController::class, 'index']);
});

Route::middleware(['auth', 'student'])->group(function () {
    Route::get('student/dashboard', [StudentDashboardController::class, 'index']);
    Route::get('student/report', [StudentReportController::class, 'index'])->name('student.report');
    Route::get('student/report/view', [StudentReportController::class, 'show'])->name('student.report.view');
    Route::post('student/report', [StudentReportController::class, 'submit'])->name('student.report.submit');
});
require __DIR__.'/auth.php';
