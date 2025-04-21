import mongoose from 'mongoose';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
import Employee from '../models/employee.js';
import Project from '../models/project.js';
import ProjectAssignment from '../models/projectAssignment.js';

const employeesURI = "http://localhost:5000/api/employee";
const projectsURI = "http://localhost:5000/api/project";
const assignmentsURI = "http://localhost:5000/api/projectAssignment";

const MONGO_URI = process.env.CONNECTION_URI;

const employee_names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis"];
const employee_emails = ["johnDoe@gmail.com", "janeSmith@gmail.com", "aliceJohnson@gmail.com", "bobBrown@gmail.com", "charlieDavis@gmail.com"];
const employee_passwords = ["password123", "password456", "password789", "password101112", "password131415"];

const project_names = ["Project Alpha", "Project Beta", "Project Gamma", "Project Delta", "Project Epsilon"];
const project_descriptions = ["Description for Project Alpha", "Description for Project Beta", "Description for Project Gamma", "Description for Project Delta", "Description for Project Epsilon"];

async function populateEmployees() {
    for (let i = 0; i < employee_names.length; i++) {
        const employee = {
            employee_id: i + 1,
            full_name: employee_names[i],
            email: employee_emails[i],
            password: employee_passwords[i]
        };
        try {
            const response = await fetch(employeesURI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee)
            });
            if (!response.ok) throw new Error(`Employee error: ${response.statusText}`);
            await response.json();
        } catch (err) {
            console.error('Error creating employee:', err.message);
        }
    }
}

async function populateProjects() {
    for (let i = 0; i < project_names.length; i++) {
        const project = {
            project_code: i + 1,
            project_name: project_names[i],
            project_description: project_descriptions[i]
        };
        try {
            const response = await fetch(projectsURI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project)
            });
            if (!response.ok) throw new Error(`Project error: ${response.statusText}`);
            await response.json();
        } catch (err) {
            console.error('Error creating project:', err.message);
        }
    }
}

async function populateProjectAssignments() {
    for (let i = 0; i < employee_names.length; i++) {
        const assignment = {
            employee_id: i + 1,
            project_code: i + 1,
            start_date: new Date()
        };
        try {
            const response = await fetch(assignmentsURI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(assignment)
            });
            if (!response.ok) throw new Error(`Assignment error: ${response.statusText}`);
            await response.json();
        } catch (err) {
            console.error('Error creating assignment:', err.message);
        }
    }
}

async function populateDatabase() {
    await populateEmployees();
    await populateProjects();
    await new Promise(resolve => setTimeout(resolve, 1000));

    await populateProjectAssignments();
}


const main = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected!');

        const isEmployeesEmpty = (await Employee.countDocuments()) === 0;
        const isProjectsEmpty = (await Project.countDocuments()) === 0;
        const isAssignmentsEmpty = (await ProjectAssignment.countDocuments()) === 0;

        if (isEmployeesEmpty && isProjectsEmpty && isAssignmentsEmpty) {
            console.log('Populating database...');
            await populateDatabase();
        } else {
            console.log('Database already contains data. Skipping.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error.message);
        process.exit(1);
    }
};

main();
