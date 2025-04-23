import ProjectAssignment from "../models/projectAssignment.js";
import Employee from "../models/employee.js";
import Project from "../models/project.js";

const getAllProjectAssignments = async (req, res) => {
    try {
        const assignments = await ProjectAssignment.find() // Fetch all project assignments from the database
        .populate('employee_id') // Populate the employee_id field with employee details
        .populate('project_code'); // Populate the project_code field with project details
        if (!assignments) {
            return res.status(404).json({ message: 'No project assignments found' });
        }
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProjectAssignment = async (req, res) => {
    try {
        const { employee_id, project_code, start_date } = req.body; // Destructure the request body
        if (!employee_id || !project_code || !start_date) { // Check if any field is missing
            return res.status(400).json({ message: 'All fields are required' });
        }

        const employee = await Employee.findOne({ employee_id: employee_id }); // Fetch the employee from the database using employee_id
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const project = await Project.findOne({ project_code: project_code }); // Fetch the project from the database using project_code
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const newProjectAssignment = new ProjectAssignment({ employee_id: employee._id, project_code: project._id, start_date }); // Create a new project assignment object
        await newProjectAssignment.save(); // Save the new project assignment to the database
        res.status(201).json(newProjectAssignment);
    } catch (error) {
        console.error('Error in createProjectAssignment:', error);
        res.status(500).json({ message: error.message });
    }      
};

export { getAllProjectAssignments, createProjectAssignment };
