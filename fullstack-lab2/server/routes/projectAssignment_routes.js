import express from 'express';
import { getAllProjectAssignments, createProjectAssignment } from '../controllers/project_assignment_controller.js';

const router = express.Router();

router.post('/projectAssignment', createProjectAssignment); // POST to create a new project assignment
router.get('/projectAssignment', getAllProjectAssignments); // GET to fetch all project assignments

export default router;
