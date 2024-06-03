import React, { useState } from 'react';
import Sidebar from '../../Components/StudentSidebar';
import '../../../css/StudentAppliance.css';
import '../../../css/StudentApplianceCreate.css';
import '../../../css/StudentReport.css';

const appliancesData = [
  { id: 1, name: 'Iron', rate: 10 },
  { id: 2, name: 'Electric kettle', rate: 10 },
  { id: 3, name: 'Package (Iron + Electric kettle)', rate: 15 },
  { id: 4, name: 'Toaster', rate: 10 },
  { id: 5, name: 'Table fan', rate: 10 },
  { id: 6, name: 'Hairdryer', rate: 5 },
  { id: 7, name: 'Radio', rate: 5 },
  { id: 8, name: 'Phone charger', rate: 0 },
  { id: 9, name: 'Laptop', rate: 0 },
];

const ApplianceRegistration = ({auth}) => {
  const [quantities, setQuantities] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  const handleQuantityChange = (id, rate, value) => {
    const quantity = parseInt(value) || 0;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity,
    }));
    calculateTotalCost(id, rate, quantity);
  };

  const calculateTotalCost = (id, rate, quantity) => {
    const newQuantities = {
      ...quantities,
      [id]: quantity,
    };
    const total = Object.entries(newQuantities).reduce((sum, [key, qty]) => {
      const appliance = appliancesData.find((app) => app.id === parseInt(key));
      return sum + (appliance.rate * qty);
    }, 0);
    setTotalCost(total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted Quantities:', quantities);
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
          <table>
            <thead>
              <tr>
                <th>Appliances</th>
                <th>Rate</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {appliancesData.map((appliance) => (
                <tr key={appliance.id}>
                  <td>{appliance.name}</td>
                  <td>RM{appliance.rate}/Semester</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={quantities[appliance.id] || ''}
                      onChange={(e) => handleQuantityChange(appliance.id, appliance.rate, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-cost">
            <strong>Total: RM {totalCost.toFixed(2)}</strong>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ApplianceRegistration;
