import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Sidebar from '../../Components/StudentSidebar';
import '../../../css/StudentAppliance.css';
import '../../../css/StudentApplianceCreate.css';
import '../../../css/StudentReport.css';

const ApplianceRegistration = ({auth}) => {
    const { appliances } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        block: '',
        room: '',
        status: 'pending',
        quantities: {},
    });

    useEffect(() => {
        const initialQuantities = appliances.reduce((acc, appliance) => {
            acc[appliance.id] = 0;
            return acc;
        }, {});
        setData('quantities', initialQuantities);
    }, [appliances]);

    const handleQuantityChange = (id, value) => {
        const quantity = parseInt(value) || 0;
        setData('quantities', {
            ...data.quantities,
            [id]: quantity,
        });
    };

    const calculateTotalCost = () => {
        return appliances.reduce((total, appliance) => {
            const quantity = data.quantities[appliance.id] || 0;
            return total + appliance.price * quantity;
        }, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('student.appliance.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="app-container">
                <Sidebar user={auth.user}/>
            <div className="appliance-form-container">
                <header className="appliance-form-header">
                    <h1>Register Electrical Appliances</h1>
                    <a href="http://127.0.0.1:8000/student/appliance" className="view-report-link">View Electrical Appliances</a>
                </header>
                <form onSubmit={handleSubmit}>
                <label>
                    1. Block
                    <input type="text" name="block" value={data.block} onChange={(e) => setData("block", e.target.value)} />
                </label>
                <label>
                    2. Room Number
                    <input type="text" name="room" value={data.room} onChange={(e) => setData("room", e.target.value)} />
                </label>
                    <table>
                        <thead>
                            <tr>
                                <th>Appliances</th>
                                <th>Rate</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appliances.map((appliance) => (
                                <tr key={appliance.id}>
                                    <td>{appliance.name}</td>
                                    <td>RM{appliance.price}/Semester</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.quantities[appliance.id] || ''}
                                            onChange={(e) => handleQuantityChange(appliance.id, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="total-cost">
                        <strong>Total: RM {calculateTotalCost().toFixed(2)}</strong>
                    </div>
                    <button type="submit" className="submit-button" disabled={processing}>
                        Submit
                    </button>
                </form>
                {errors.quantities && <div className="error">{errors.quantities}</div>}
            </div>
        </div>
    );
};

export default ApplianceRegistration;
