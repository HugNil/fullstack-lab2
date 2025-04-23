import React, { useEffect, useState } from 'react';
import './ProjectAssignment.css';

const ProjectAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [sortColumn, setSortColumn] = useState('start_date'); // Default sort column
  const [sortDirection, setSortDirection] = useState('desc'); // Default sort direction, shows latest assignments first

  const fetchAssignments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projectAssignment');
      const data = await res.json();
      setAssignments(data.slice(-5));
    } catch (error) {
      console.error('Error fetching project assignments:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
    const interval = setInterval(fetchAssignments, 60000); // Fetch every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const sortedAssignments = [...assignments].sort((a, b) => {
    let aValue, bValue;

    switch (sortColumn) {
      case 'employee_name':
        aValue = a.employee_id?.full_name || '';
        bValue = b.employee_id?.full_name || ''; 
        break;
      case 'employee_id':
        aValue = a.employee_id?.employee_id || '';
        bValue = b.employee_id?.employee_id || '';
        break;
      case 'project_name':
        aValue = a.project_code?.project_name || '';
        bValue = b.project_code?.project_name || '';
        break;
      case 'start_date':
      default:
        aValue = new Date(a.start_date);
        bValue = new Date(b.start_date);
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc')); // Toggles the sort direction if the same column is clicked again
    } else {
      setSortColumn(column); // Sets the new column to sort by
      setSortDirection('asc'); // Resets the sort direction to ascending if a new column is selected
    }
  };

  const getSortIndicator = (column) => {
    if (sortColumn !== column) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓'; // Adds the arrow to the column header if it is used for sorting
  };  

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('employee_id')}>
              Employee ID{getSortIndicator('employee_id')}  {/* get sort indicator adds the direction arrow if the chooesen column is used for sorting */}
            </th>
            <th onClick={() => handleSort('employee_name')}>
              Employee Name{getSortIndicator('employee_name')}
            </th>
            <th onClick={() => handleSort('project_name')}>
              Project Name{getSortIndicator('project_name')}
            </th>
            <th onClick={() => handleSort('start_date')}>
              Start Date{getSortIndicator('start_date')}
            </th>
          </tr>
        </thead>
        <tbody> {/* Adds all the assignments to the table */}
          {sortedAssignments.map((assign) => ( 
            <tr key={assign._id}>
              <td>{assign.employee_id?.employee_id}</td>
              <td>{assign.employee_id?.full_name}</td>
              <td>{assign.project_code?.project_name}</td>
              <td>{new Date(assign.start_date).toLocaleDateString()}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectAssignment;
