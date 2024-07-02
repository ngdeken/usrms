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

const StudentReportView = ({ auth, rooms, students, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
        queryParams[name] = value;
        } else {
        delete queryParams[name];
        }

        router.get(route("staff.rooms.index"), queryParams);
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
      router.get(route("staff.rooms.index"), queryParams);
    };

    const deleteReport = (room) => {
        if (!window.confirm("Are you sure you want to delete the room?")) {
          return;
        }
        router.delete(route("staff.rooms.destroy", room.id));
      };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>Room Management</h1>
                    <a href="http://127.0.0.1:8000/staff/rooms/create" className="view-report-link">Add Room</a>
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
                            name="floor"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Floor
                        </TableHeading>
                        <TableHeading
                            name="roomType"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Room Type
                        </TableHeading>
                        <TableHeading
                            name="vacancy"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Vacancy
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
                          placeholder="Block"
                          onBlur={(e) =>
                            searchFieldChanged("blockName", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("blockName", e)}
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
                        {rooms.data.map((room) => (
                            <tr key={room.id}>
                                <td className='px-3 py-2'>{room.id}</td>
                                <td className='px-3 py-2'>{room.blockID.blockName}</td>
                                <td className='px-3 py-2'>{room.roomID}</td>
                                <td className='px-3 py-2'>{room.floor}</td>
                                <td className='px-3 py-2'>{room.roomType}</td>
                                <td className='px-3 py-2'>{room.vacancy}</td>
                                
                                <td className="px-3 py-2 text-nowrap">
                                <Link
                                    href={route("staff.allocate.index")}
                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline mx-1"
                                >
                                    View Allocate List
                                </Link>
                                <Link
                                    href={route("staff.rooms.allocate", room.id)}
                                    className="font-medium text-green-600 dark:text-green-500 hover:underline mx-1"
                                >
                                    Allocate Student
                                </Link>
                                <Link
                                    href={route("staff.rooms.deallocate", room.id)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                    Deallocate Student
                                </Link>
                                <Link
                                    href={route("staff.rooms.edit", room.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={(e) => deleteReport(room)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={rooms.meta.links} />
            </div>
        </div>
    );
};

export default StudentReportView;
