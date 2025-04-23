import Employee from '../models/employee.js';
import bcrypt from 'bcryptjs';

const createEmployee = async (req, res) => {
    try {
        if (!req.body) { // Check if request body is empty
            return res.status(400).json({ message: 'Request body is required' });
        }

        const { employee_id, full_name, email, password } = req.body; // Destructure the request body
        if (!employee_id || !full_name || !email || !password) { // Check if any field is missing
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashed_password = await hash_password(password); // Hash the password

        const newEmployee = new Employee({ employee_id, full_name, email, hashed_password }); // Create a new employee object
        await newEmployee.save(); // Save the new employee to the database
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error in createEmployee:', error);
        res.status(500).json({ message: error.message });
    }      
};

async function hash_password(password) { // Function to hash the password
    const saltRounds = 10;
    try {
        return await bcrypt.hash(password, saltRounds); // Hash the password using bcrypt
    } catch (err) {
        console.error('Error hashing password:', err);
        throw new Error('Hashing failed');
    }
}

export { createEmployee };
