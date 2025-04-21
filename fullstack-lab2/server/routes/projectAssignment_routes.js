import express from 'express';
import { getAllProjectAssignments, createProjectAssignment } from '../controllers/project_assignment_controller.js';

const router = express.Router();

router.post('/projectAssignment', createProjectAssignment); // POST /api/project_assignments
router.get('/projectAssignment', getAllProjectAssignments);  // GET /api/project_assignments

export default router;
