import { Router } from 'express';
import { uploadMedia, getMediaList, deleteMedia } from '../controllers/mediaController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/upload', requireAuth, upload.single('file'), uploadMedia);
router.get('/', requireAuth, getMediaList);
router.delete('/:id', requireAuth, deleteMedia);

export default router;
