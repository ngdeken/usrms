import React, { useState } from 'react';
import Sidebar from '../../Components/AdminSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';

const AdminCreate = ({ auth }) => {
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
        gender: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.create.store"));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
        <div className="damage-report-form-container">
            <header className="form-header">
                <h1>Create User</h1>
                <a href="http://127.0.0.1:8000/admin/user/" className="view-report-link">Manage User</a>
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

export default AdminCreate;
