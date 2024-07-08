<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Staff\StaffDashboardController;
use App\Http\Controllers\Staff\StaffReportController;
use App\Http\Controllers\Staff\StaffApplianceController;
use App\Http\Controllers\Staff\StaffAllocateController;
use App\Http\Controllers\Staff\StaffHostelController;
use App\Http\Controllers\Staff\StaffBlockController;
use App\Http\Controllers\Staff\StaffRoomController;
use App\Http\Controllers\Staff\StaffQuotaController;
use App\Http\Controllers\Fellow\FellowDashboardController;
use App\Http\Controllers\Fellow\FellowActiveController;
use App\Http\Controllers\Fellow\FellowEventController;
use App\Http\Controllers\Fellow\FellowQuotaController;
use App\Http\Controllers\Student\StudentApplianceController;
use App\Http\Controllers\Student\StudentDashboardController;
use App\Http\Controllers\Student\StudentEventController;
use App\Http\Controllers\Student\StudentMatricController;
use App\Http\Controllers\Student\StudentReportController;
use App\Http\Controllers\Student\StudentRoomController;
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
});

Route::middleware(['auth', 'staff'])->group(function () {
    Route::get('staff/dashboard', [StaffDashboardController::class, 'index'])->name('staff.index');
    Route::get('staff/report', [StaffReportController::class, 'index'])->name('staff.report');
    Route::get('staff/report/{report}', [StaffReportController::class, 'edit'])->name('staff.report.edit');
    Route::get('staff/appliance', [StaffApplianceController::class, 'index'])->name('staff.appliance');
    Route::get('staff/appliance/{order}', [StaffApplianceController::class, 'edit'])->name('staff.appliance.edit');
    Route::get('staff/hostels', [StaffHostelController::class, 'index'])->name('staff.hostels.index');
    Route::get('staff/hostels/create', [StaffHostelController::class, 'create'])->name('staff.hostels.create');
    Route::get('staff/hostels/edit/{hostel}', [StaffHostelController::class, 'edithostel'])->name('staff.hostels.edithostel');
    Route::get('staff/hostels/{hostel}', [StaffHostelController::class, 'edit'])->name('staff.hostels.edit');
    Route::get('staff/blocks/create', [StaffBlockController::class, 'create'])->name('staff.blocks.create');
    Route::get('staff/rooms', [StaffRoomController::class, 'index'])->name('staff.rooms.index');
    Route::get('staff/rooms/create', [StaffRoomController::class, 'create'])->name('staff.rooms.create');
    Route::get('staff/rooms/{room}', [StaffRoomController::class, 'edit'])->name('staff.rooms.edit');
    Route::get('staff/rooms/{room}/allocate', [StaffRoomController::class, 'allocate'])->name('staff.rooms.allocate');
    Route::get('staff/rooms/{room}/deallocate', [StaffRoomController::class, 'deallocate'])->name('staff.rooms.deallocate');
    Route::get('staff/students', [StaffAllocateController::class, 'index'])->name('staff.allocate.index');
    Route::get('staff/quotas', [StaffQuotaController::class, 'index'])->name('staff.quota');
    Route::post('staff/hostels/create', [StaffHostelController::class, 'store'])->name('staff.hostels.store');
    Route::post('staff/blocks/create', [StaffBlockController::class, 'store'])->name('staff.blocks.store');
    Route::post('staff/rooms/create', [StaffRoomController::class, 'store'])->name('staff.rooms.store');
    Route::get('staff/blocks/{block}', [StaffBlockController::class, 'edit'])->name('staff.blocks.edit');
    Route::put('staff/hostels/edit/{hostel}', [StaffHostelController::class, 'update'])->name('staff.hostels.update');
    Route::put('staff/rooms/{room}/allocate', [StaffRoomController::class, 'allocateStudent'])->name('staff.rooms.allocateStudent');
    Route::put('staff/rooms/{room}/deallocate', [StaffRoomController::class, 'deallocateStudent'])->name('staff.rooms.deallocateStudent');
    Route::put('staff/report/{report}', [StaffReportController::class, 'update'])->name('staff.report.update');
    Route::delete('staff/report/{report}', [StaffReportController::class, 'destroy'])->name('staff.report.destroy');
    Route::put('staff/appliance/{order}', [StaffApplianceController::class, 'update'])->name('staff.appliance.update');
    Route::delete('staff/appliance/{order}', [StaffApplianceController::class, 'destroy'])->name('staff.appliance.destroy');
    Route::put('staff/blocks/{block}', [StaffBlockController::class, 'update'])->name('staff.blocks.update');
    Route::delete('staff/blocks/{block}', [StaffBlockController::class, 'destroy'])->name('staff.blocks.destroy');
    Route::delete('staff/rooms/{room}', [StaffRoomController::class, 'destroy'])->name('staff.rooms.destroy');
    Route::put('staff/rooms/{room}', [StaffRoomController::class, 'update'])->name('staff.rooms.update');
});

Route::middleware(['auth', 'fellow'])->group(function () {
    Route::get('fellow/dashboard', [FellowDashboardController::class, 'index'])->name('fellow.index');
    Route::get('fellow/quota', [FellowQuotaController::class, 'index'])->name('fellow.quota');
    Route::get('fellow/quota/{quota}', [FellowQuotaController::class, 'edit'])->name('fellow.quota.edit');
    Route::get('fellow/events', [FellowEventController::class, 'index'])->name('fellow.events.index');
    Route::get('fellow/events/create', [FellowEventController::class, 'create'])->name('fellow.events.create');
    Route::get('fellow/events/{event}', [FellowEventController::class, 'edit'])->name('fellow.events.edit');
    Route::get('fellow/actives', [FellowActiveController::class, 'index'])->name('fellow.actives.index');
    Route::get('fellow/actives/create', [FellowActiveController::class, 'create'])->name('fellow.actives.create');
    Route::get('fellow/actives/{active}', [FellowActiveController::class, 'edit'])->name('fellow.actives.edit');
    Route::post('fellow/actives/create', [FellowActiveController::class, 'store'])->name('fellow.actives.store');
    Route::post('fellow/events/create', [FellowEventController::class, 'store'])->name('fellow.events.store');
    Route::put('fellow/actives/{active}', [FellowActiveController::class, 'update'])->name('fellow.actives.update');
    Route::put('fellow/events/{event}', [FellowEventController::class, 'update'])->name('fellow.events.update');
    Route::put('fellow/quota/{quota}', [FellowQuotaController::class, 'update'])->name('fellow.quota.update');
    Route::delete('fellow/quota/{quota}', [FellowQuotaController::class, 'destroy'])->name('fellow.quota.destroy');
    Route::delete('fellow/actives/{active}', [FellowActiveController::class, 'destroy'])->name('fellow.actives.destroy');
    Route::delete('fellow/events/{event}', [FellowEventController::class, 'destroy'])->name('fellow.events.destroy');
});

Route::middleware(['auth', 'student'])->group(function () {
    Route::get('student/dashboard', [StudentDashboardController::class, 'index'])->name('student.index');
    Route::get('student/report', [StudentReportController::class, 'index'])->name('student.report');
    Route::get('student/report/view', [StudentReportController::class, 'show'])->name('student.report.view');
    Route::get('student/quota', [StudentQuotaController::class, 'index'])->name('student.quota');
    Route::get('student/quota/view', [StudentQuotaController::class, 'show'])->name('student.quota.show');
    Route::get('student/appliance', [StudentApplianceController::class, 'index'])->name('student.appliance');
    Route::get('student/matric', [StudentMatricController::class, 'index'])->name('student.matric');
    Route::get('student/events', [StudentEventController::class, 'index'])->name('student.events.index');
    Route::get('student/rooms', [StudentRoomController::class, 'index'])->name('student.rooms.index');
    Route::get('student/events/{event}', [StudentEventController::class, 'active'])->name('student.events.active');
    Route::get('student/appliance/create', [StudentApplianceController::class, 'create'])->name('student.appliance.create');
    Route::post('student/appliance/create', [StudentApplianceController::class, 'store'])->name('student.appliance.store');
    Route::post('student/report', [StudentReportController::class, 'submit'])->name('student.report.submit');
    Route::post('student/quota', [StudentQuotaController::class, 'store'])->name('student.quota.store');
    Route::put('student/matric', [StudentMatricController::class, 'update'])->name('student.matric.update');
});
require __DIR__.'/auth.php';

