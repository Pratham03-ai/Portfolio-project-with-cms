import { Router } from 'express';
import { login, getMe, refreshToken, setupAdmin } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.post('/refresh', requireAuth, refreshToken);
router.get('/me', requireAuth, getMe);
router.post('/setup', setupAdmin);

export default router;
