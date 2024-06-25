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

const StudentReportView = ({ auth, students, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
        queryParams[name] = value;
        } else {
        delete queryParams[name];
        }

        router.get(route("staff.students.index"), queryParams);
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
      router.get(route("staff.students.index"), queryParams);
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>Student List</h1>
                    <a href="http://127.0.0.1:8000/staff/rooms" className="view-report-link">View Rooms</a>
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
                            name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Name
                        </TableHeading>
                        <TableHeading
                            name="matricID"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Matric Number
                        </TableHeading>
                        <TableHeading
                            name="block"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Block
                        </TableHeading>
                        <TableHeading
                            name="room"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Room
                        </TableHeading>
                        <TableHeading
                            name="merit"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Merit
                        </TableHeading>
                        </tr>
                    </thead>
                    <thead>
                    <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        
                        <th className="px-2 py-2"></th>
                        
                        <th className="px-2 py-2"></th>
                        <th className="px-2 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.roomID}
                          placeholder="Room"
                          onBlur={(e) =>
                            searchFieldChanged("roomID", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("roomID", e)}
                        />
                        </th>
                        <th className="px-2 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.roomID}
                          placeholder="Room"
                          onBlur={(e) =>
                            searchFieldChanged("roomID", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("roomID", e)}
                        />
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.data.map((student) => (
                            <tr key={student.id}>
                                <td className='px-3 py-2'>{student.id}</td>
                                <td className='px-3 py-2'>{student.userID.name}</td>
                                <td className='px-3 py-2'>{student.matricID}</td>
                                <td className='px-3 py-2'>{student.blockID?.blockName ?? 'N/A'}</td>
                                <td className='px-3 py-2'>{student.roomID?.roomID ?? 'N/A'}</td>
                                <td className='px-3 py-2'>{student.merit}</td>
                                <td className="px-3 py-2 text-nowrap">
                                
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={students.meta.links} />
            </div>
        </div>
    );
};

export default StudentReportView;
