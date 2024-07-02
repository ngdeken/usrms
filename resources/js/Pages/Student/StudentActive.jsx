import React from 'react';
import Sidebar from '../../Components/StudentSidebar';
import { router, Link, useForm } from '@inertiajs/react';
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import '../../../css/StudentReport.css';

const FellowActive = ({ auth, events, actives, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("student.events.active"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("student.events.active"), queryParams);
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>Participation List</h1>
                </header>
                <table>
                    <thead>
                        <tr className="text-nowrap">
                            <TableHeading name="id" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>ID</TableHeading>
                            <TableHeading name="event" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Event</TableHeading>
                            <TableHeading name="student" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Student</TableHeading>
                            <TableHeading name="position" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Position</TableHeading>
                            <TableHeading name="merit" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>Merit</TableHeading>
                        </tr>
                    </thead>
                    <thead>
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-2 py-2">
                                <TextInput className="w-full" defaultValue={queryParams.eventName} placeholder="Event" onBlur={(e) => searchFieldChanged("eventName", e.target.value)} onKeyPress={(e) => onKeyPress("eventName", e)} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {actives.data.map((active) => (
                            <tr key={active.id}>
                                <td className='px-3 py-2'>{active.id}</td>
                                <td className='px-3 py-2'>{active.eventID ? active.eventID.eventName : 'N/A'}</td>
                                <td className='px-3 py-2'>{active.studentID ? (active.studentID.userID ? active.studentID.userID.name : 'N/A') : 'N/A'}</td>
                                <td className='px-3 py-2'>{active.position}</td>
                                <td className='px-3 py-2'>{active.merit}</td>
                                <td className="px-3 py-2 text-nowrap">
            
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={actives.meta.links} />
            </div>
        </div>
    );
};

export default FellowActive;
