import project from '../models/project.js';

const createProject = async (req, res) => {
    try {
        const { project_code, project_name, project_description } = req.body; // Destructure the request body
        if (!project_code || !project_name || !project_description) { // Check if any field is missing
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newProject = new project({ project_code, project_name, project_description }); // Create a new project object
        await newProject.save(); // Save the new project to the database
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error in createProject:', error);
        res.status(500).json({ message: error.message });
    }      
};

export { createProject };
