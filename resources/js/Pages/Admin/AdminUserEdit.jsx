import React, { useState } from 'react';
import Sidebar from '../../Components/AdminSidebar';
import { Link,  router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";

const AdminUserEdit = ({ auth, user }) => {
    const { data, setData, post, errors, reset } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
        gender: user.gender || "",
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.user.update", user.id));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
        <div className="damage-report-form-container">
            <header className="form-header">
                <h1>Edit User</h1>
                <a href={route('admin.user')} className="view-report-link">Manage User</a>
            </header>
            <form className="damage-report-form" onSubmit={handleSubmit}>
   
                <label>
                1. User Name
                    <input type="text" name="name" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                </label>
                <label>
                    2. Email
                    <input type="text" name="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
                </label>
                <label>
                    3. Password
                    <input type="password" name="password" value={data.password} onChange={(e) => setData("password", e.target.value)} />
                </label>
                <label>
                    4. Role
                    <input type="text" name="role" value={data.role} onChange={(e) => setData("role", e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default AdminUserEdit;
