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

const StudentReportView = ({ auth, hostels, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
        queryParams[name] = value;
        } else {
        delete queryParams[name];
        }

        router.get(route("staff.hostels.index"), queryParams);
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
      router.get(route("staff.hostels.index"), queryParams);
    };

    const deleteReport = (hostel) => {
        if (!window.confirm("Are you sure you want to delete the hostel?")) {
          return;
        }
        router.delete(route("staff.hostels.destroy", hostel.id));
      };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>Hostel Management</h1>
                    <a href={route("staff.hostels.create")} className="view-report-link">Add Hostel</a>
                </header>
                <table>
                    <thead>
                        <tr className="text-nowrap">
                        <TableHeading
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                        ID
                        </TableHeading>
                        <TableHeading
                            name="hostel"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Hostel
                        </TableHeading>
                        </tr>
                    </thead>
                    <thead>
                    <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        
                        <th className="px-2 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.hostelName}
                          placeholder="Hostel"
                          onBlur={(e) =>
                            searchFieldChanged("hostelName", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("hostelName", e)}
                        />
                        </th>
                

                        </tr>
                    </thead>
                    <tbody>
                        {hostels.data.map((hostel) => (
                            <tr key={hostel.id}>
                                <td className='px-3 py-2'>{hostel.id}</td>
                                <td className='px-3 py-2'>{hostel.hostelName}</td>
                                <td className="px-3 py-2 text-nowrap">
                                <Link
                                    href={route("staff.hostels.edit", hostel.id)}
                                    className="font-medium text-green-600 dark:text-green-500 hover:underline mx-1"
                                >
                                    View Block
                                </Link>
                                <Link
                                    href={route("staff.hostels.edithostel", hostel.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Edit
                                </Link>
                                
                                <button
                                    onClick={(e) => deleteReport(hostel)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={hostels.meta.links} />
            </div>
        </div>
    );
};

export default StudentReportView;
