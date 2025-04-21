import express from 'express';
import { createProject } from '../controllers/project_controller.js';

const router = express.Router();

router.post('/project', createProject);

export default router;
