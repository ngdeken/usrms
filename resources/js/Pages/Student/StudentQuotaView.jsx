import React, { useState } from 'react';
import Sidebar from '../../Components/StudentSidebar';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Pagination from "@/Components/Pagination";
import {
    QUOTA_STATUS_CLASS_MAP,
    QUOTA_STATUS_TEXT_MAP,
  } from "@/constants.jsx";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import '../../../css/StudentReport.css';

const StudentQuotaView = ({ auth, quotas, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
        queryParams[name] = value;
        } else {
        delete queryParams[name];
        }

        router.get(route("student.quota.show"), queryParams);
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
      router.get(route("student.quota.show"), queryParams);
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>View Active Quota Application</h1>
                    <a href="http://127.0.0.1:8000/student/quota/" className="view-report-link">Apply Active Quota</a>
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
                            name="event"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Document
                        </TableHeading>
                        <TableHeading
                            name="firstRoomBlock"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            First Room Choice
                        </TableHeading>
                        <TableHeading
                            name="secondRoomBlock"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Second Room Choice
                        </TableHeading>
                        <TableHeading
                            name="thirdRoomBlock"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Third Room Choice
                        </TableHeading>
                        <TableHeading
                            name="roommate"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Roommate
                        </TableHeading>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <thead>
                    <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.blockName}
                          placeholder="Block"
                          onBlur={(e) =>
                            searchFieldChanged("firstRoomBlock", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("firstRoomBlock", e)}
                        />
                        </th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3">
                            <SelectInput
                            className="w-full"
                            defaultValue={queryParams.active}
                            onChange={(e) =>
                                searchFieldChanged("active", e.target.value)
                            }
                            >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="inactive">Inactive</option>
                            <option value="active">Active</option>
                            </SelectInput>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotas.data.map((quota) => (
                            <tr key={quota.id}>
                                <td className='px-3 py-2'>{quota.id}</td>
                                <td className='px-4 py-4'>{new Date(quota.created_at).toLocaleString()}</td>
                                <td className='px-3 py-2'>{quota.userID.name}</td>
                                <td className='px-3 py-2'>{quota.event}</td>
                                <td className='px-3 py-2'>{quota.firstRoomType} {quota.firstRoomBlock} {quota.firstRoomID}</td>
                                <td className='px-3 py-2'>{quota.secondRoomType} {quota.secondRoomBlock} {quota.secondRoomID}</td>
                                <td className='px-3 py-2'>{quota.thirdRoomType} {quota.thirdRoomBlock} {quota.thirdRoomID}</td>
                                <td className='px-3 py-2'>{quota.roommate} {quota.roommateMatric}</td>
                                <td className='px-3 py-2'>
                                    <span
                                        className={
                                        "px-2 py-1 rounded text-white " +
                                        QUOTA_STATUS_CLASS_MAP[quota.active]
                                        }
                                    >
                                        {QUOTA_STATUS_TEXT_MAP[quota.active]}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={quotas.meta.links} />
            </div>
        </div>
    );
};

export default StudentQuotaView;
