import mongoose from 'mongoose';

const projectAssignmentSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, // Reference to Employee model
  project_code: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to Project model
  start_date: { type: Date, required: true }
});

export default mongoose.models.ProjectAssignment || mongoose.model('ProjectAssignment', projectAssignmentSchema, 'ProjectAssignments');
