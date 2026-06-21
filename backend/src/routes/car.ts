import { Router } from 'express';
import { getCars } from '../controllers/car';

const router = Router();

// GET /api/cars - Get all cars available for booking
router.get('/', getCars);

export default router;
