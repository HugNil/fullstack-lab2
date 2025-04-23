import express from 'express';
import { createProject } from '../controllers/project_controller.js';

const router = express.Router();

router.post('/project', createProject); // POST to create a new project

export default router;
