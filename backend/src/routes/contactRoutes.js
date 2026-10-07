import { Router } from 'express';
import {
  submitContact,
  getMessages,
  markMessageRead,
  deleteMessage,
} from '../controllers/contactController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', submitContact);
router.get('/messages', requireAuth, getMessages);
router.patch('/messages/:id/read', requireAuth, markMessageRead);
router.delete('/messages/:id', requireAuth, deleteMessage);

export default router;
