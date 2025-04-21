import ProjectAssignment from "../models/projectAssignment.js";
import Employee from "../models/employee.js";
import Project from "../models/project.js";

const getAllProjectAssignments = async (req, res) => {
    try {
        const assignments = await ProjectAssignment.find();
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
        const { employee_id, project_code, start_date } = req.body;
        if (!employee_id || !project_code || !start_date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const employee = await Employee.findOne({ employee_id: employee_id });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const project = await Project.findOne({ project_code: project_code });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const newProjectAssignment = new ProjectAssignment({ employee_id: employee._id, project_code: project._id, start_date });
        await newProjectAssignment.save();
        res.status(201).json(newProjectAssignment);
    } catch (error) {
        console.error('Error in createProjectAssignment:', error);
        res.status(500).json({ message: error.message });
    }      
};

export { getAllProjectAssignments, createProjectAssignment };
