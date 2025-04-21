import project from '../models/project.js';

const createProject = async (req, res) => {
    try {
        const { project_code, project_name, project_description } = req.body;
        if (!project_code || !project_name || !project_description) {
            return res.status(400).json({ message: 'Project code and Project name is required' });
        }
        const newProject = new project({ project_code, project_name, project_description });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createProject };
