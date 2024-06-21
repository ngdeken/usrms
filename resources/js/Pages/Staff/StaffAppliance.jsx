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

const StudentReportView = ({ auth, orders, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
        queryParams[name] = value;
        } else {
        delete queryParams[name];
        }

        router.get(route("staff.appliance"), queryParams);
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
      router.get(route("staff.appliance"), queryParams);
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>Manage Appliances Registration</h1>
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
                            name="applianceID"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Appliance
                        </TableHeading>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <thead>
                    <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-2 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.block}
                          placeholder="Block"
                          onBlur={(e) =>
                            searchFieldChanged("block", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("block", e)}
                        />
                        </th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3">
                            <SelectInput
                            className="w-full"
                            defaultValue={queryParams.status}
                            onChange={(e) =>
                                searchFieldChanged("status", e.target.value)
                            }
                            >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            </SelectInput>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data.map((order) => (
                            <tr key={order.id}>
                                <td className='px-3 py-2'>{order.id}</td>
                                <td className='px-4 py-4'>{new Date(order.created_at).toLocaleString()}</td>
                                <td className='px-3 py-2'>{order.userID.name}</td>
                                <td className='px-2 py-2'>{order.block}</td>
                                <td className='px-3 py-2'>{order.room}</td>
                                <td className='px-3 py-2'>{order.applianceID.name}</td>
                                <td className='px-4 py-4'>{order.quantity}</td>
                                <td className='px-4 py-4'>{order.price}</td>
                                <td className='px-3 py-2'>
                                    <span
                                        className={
                                        "px-2 py-1 rounded text-white " +
                                        REPORT_STATUS_CLASS_MAP[order.status]
                                        }
                                    >
                                        {REPORT_STATUS_TEXT_MAP[order.status]}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                <Link
                                    href={route("staff.appliance.edit", order.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Edit
                                </Link>
                                
                                <button
                                    onClick={(e) => deleteReport(report)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={orders.meta.links} />
            </div>
        </div>
    );
};

export default StudentReportView;
