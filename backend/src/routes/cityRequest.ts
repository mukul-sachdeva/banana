import { Router } from 'express';
import { createCityRequest, getCityRequestStats, getCityRequestList } from '../controllers/cityRequest';

const router = Router();

// POST /api/city-requests - Public submission for city expansion request
router.post('/', createCityRequest);

// GET /api/city-requests/admin/stats - Admin endpoint for city demand ranking
router.get('/admin/stats', getCityRequestStats);

// GET /api/city-requests/admin/list - Admin endpoint for detailed submissions
router.get('/admin/list', getCityRequestList);

export default router;
