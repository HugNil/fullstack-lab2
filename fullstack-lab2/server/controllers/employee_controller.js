import Employee from '../models/employee.js';
import bcrypt from 'bcrypt';

const createEmployee = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        const { employee_id, full_name, email, password } = req.body;
        if (!employee_id || !full_name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashed_password = await hash_password(password);

        const newEmployee = new Employee({ employee_id, full_name, email, hashed_password });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error in createEmployee:', error);
        res.status(500).json({ message: error.message });
    }      
};

async function hash_password(password) {
    const saltRounds = 10;
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        console.error('Error hashing password:', err);
        throw new Error('Hashing failed');
    }
}

export { createEmployee };
