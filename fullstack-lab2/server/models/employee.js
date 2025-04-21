import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employee_id: { type: Number, required: true, unique: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  hashed_password: { type: String, required: true }
});


export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema, 'Employees');
