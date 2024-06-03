import React, { useState } from 'react';
import Sidebar from '../../Components/StaffSidebar';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Pagination from "@/Components/Pagination";
import {
    REPORT_STATUS_CLASS_MAP,
    REPORT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import '../../../css/StudentReport.css';
import axios from 'axios';

const StaffReport = ({ auth, reports, queryParams = null, success }) => {
    const [editingReportId, setEditingReportId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("student.report.view"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("student.report.view"), queryParams);
    };

    const deleteReport = (report) => {
        if (!window.confirm("Are you sure you want to delete the report?")) {
            return;
        }
        router.delete(route("staff.report.destroy", report.reportID));
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const updateReportStatus = async (report) => {
        try {
            await axios.patch(`/reports/${report.reportID}`, {
                reportStatus: selectedStatus,
            });
            setEditingReportId(null);
            // Optionally, you can refetch the reports to update the table
            // fetchReports();
        } catch (error) {
            console.error('Error updating the report status:', error);
        }
    };

    return (
        <div className="app-container">
            <Sidebar />
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>View Damage Report</h1>
                    <a href="http://127.0.0.1:8000/student/report/" className="view-report-link">Make Damage Report</a>
                </header>
                <table>
                    <thead>
                        <tr className="text-nowrap">
                            <TableHeading
                                name="reportID"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <TableHeading
                                name="created_at"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Date/Time
                            </TableHeading>
                            <TableHeading
                                name="userID"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Student
                            </TableHeading>
                            <TableHeading
                                name="blockName"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Block
                            </TableHeading>
                            <TableHeading
                                name="floor"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Floor
                            </TableHeading>
                            <TableHeading
                                name="roomID"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Room
                            </TableHeading>
                            <TableHeading
                                name="reportCategory"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Category
                            </TableHeading>
                            <TableHeading
                                name="reportDescription"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Description
                            </TableHeading>
                            <th>Photos</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.data.map((report) => (
                            <tr key={report.reportID}>
                                <td className='px-3 py-2'>{report.reportID}</td>
                                <td className='px-4 py-4'>{new Date(report.created_at).toLocaleString()}</td>
                                <td className='px-3 py-2'>{report.userID.name}</td>
                                <td className='px-3 py-2'>{report.blockName}</td>
                                <td className='px-3 py-2'>{report.floor}</td>
                                <td className='px-3 py-2'>{report.roomID}</td>
                                <td className='px-3 py-2'>{report.reportCategory}</td>
                                <td className='px-4 py-4'>{report.reportDescription}</td>
                                <td className='px-4 py-4'>
                                    {report.reportImage && (
                                        <img src={report.reportImage} style={{ width: 100 }} />
                                    )}
                                </td>
                                <td className='px-3 py-2'>
                                    {editingReportId === report.reportID ? (
                                        <select
                                            value={selectedStatus}
                                            onChange={handleStatusChange}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={
                                                "px-2 py-1 rounded text-white " +
                                                REPORT_STATUS_CLASS_MAP[report.reportStatus]
                                            }
                                        >
                                            {REPORT_STATUS_TEXT_MAP[report.reportStatus]}
                                        </span>
                                    )}
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                    {editingReportId === report.reportID ? (
                                        <>
                                            <button
                                                onClick={() => updateReportStatus(report)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingReportId(null)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setEditingReportId(report.reportID)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) => deleteReport(report)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={reports.meta.links} />
            </div>
        </div>
    );
};

export default StaffReport;
