import express from 'express';
import { createEmployee } from '../controllers/employee_controller.js';

const router = express.Router();

router.post('/employee', createEmployee);

export default router;
