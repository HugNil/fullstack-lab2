import mongoose from 'mongoose';

const projectAssignmentSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees', required: true },
  project_code: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects', required: true },
  start_date: { type: Date, required: true }
});

export default mongoose.model('Project', projectAssignmentSchema, 'ProjectAssignments');
