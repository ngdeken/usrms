<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\Student;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\UserCrudResource;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateReportRequest;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", request("email"));
        }

        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();

        return Inertia::render('Admin/AdminUser', [
            "users" => UserCrudResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminCreate', [
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        User::create($data);

        return to_route('admin.index')->with('success', 'User was created');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/AdminUserEdit', [
            'user' => new UserCrudResource($user),
        ]);
    }
}
