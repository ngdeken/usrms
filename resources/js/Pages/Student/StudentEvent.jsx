import React, { useState } from 'react';
import Sidebar from '../../Components/StudentSidebar';
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

const FellowEvent = ({ auth, events, hostels, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
        queryParams[name] = value;
        } else {
        delete queryParams[name];
        }

        router.get(route("student.events.index"), queryParams);
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
      router.get(route("student.events.index"), queryParams);
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>Event List</h1>
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
                            name="event"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Event
                        </TableHeading>
                        <TableHeading
                            name="date"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Date
                        </TableHeading>
                        </tr>
                    </thead>
                    <thead>
                    <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        
                        <th className="px-2 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.eventName}
                          placeholder="Event"
                          onBlur={(e) =>
                            searchFieldChanged("eventName", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("eventName", e)}
                        />
                        </th>
                
                        <th className="px-2 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.eventDate}
                          placeholder="Date"
                          onBlur={(e) =>
                            searchFieldChanged("eventDate", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("eventDate", e)}
                        />
                        </th>

                        </tr>
                    </thead>
                    <tbody>
                        {events.data.map((event) => (
                            <tr key={event.id}>
                                <td className='px-3 py-2'>{event.id}</td>
                                <td className='px-3 py-2'>{event.eventName}</td>
                                <td className='px-3 py-2'>{event.eventDate}</td>
                                <td className='px-3 py-2'>{event.hostelID.hostelName}</td>
                                <td className="px-3 py-2 text-nowrap">
                                <Link
                                    href={route("student.events.active", event.id)}
                                    className="font-medium text-green-600 dark:text-green-500 hover:underline mx-1"
                                >
                                    View participation
                                </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={events.meta.links} />
            </div>
        </div>
    );
};

export default FellowEvent;
