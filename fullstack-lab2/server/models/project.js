import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  project_code: { type: Number, required: true, unique: true },
  project_name: { type: String, required: true },
  project_description: { type: String }
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema, 'Projects');

