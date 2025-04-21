import React, { useEffect, useState } from 'react';

const ProjectAssignment = () => {
    const [assignments, setAssignments] = useState([]);
  
    const fetchAssignments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/projectAssignment');
        const data = await res.json();
        setAssignments(data.slice(-5).reverse());
      } catch (error) {
        console.error('Error fetching project assignments:', error);
      }
    };

    useEffect(() => {
      fetchAssignments();
      const interval = setInterval(fetchAssignments, 60000);
      return () => clearInterval(interval);
    }, []);
  
    console.log(assignments);
  
    return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Project Name</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 ? (
                <tr><td colSpan="4">Inga assignments hittades</td></tr>
              ) : (
                assignments.map((assign) => (
                  <tr key={assign._id}>
                    <td>{assign.employee_id?.employee_id}</td>
                    <td>{assign.employee_id?.full_name}</td>
                    <td>{assign.project_code?.project_name}</td>
                    <td>{new Date(assign.start_date).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
    );
};      
  

export default ProjectAssignment;
