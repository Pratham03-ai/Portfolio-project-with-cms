import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '../../uploads');

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const url = `/uploads/${file.filename}`;

    const media = await prisma.media.create({
      data: {
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url,
      },
    });

    return res.status(201).json({
      message: 'File uploaded successfully',
      media,
    });
  } catch (error) {
    console.error('uploadMedia error:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
};

export const getMediaList = async (req, res) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(media);
  } catch (error) {
    console.error('getMediaList error:', error);
    return res.status(500).json({ error: 'Failed to fetch media list' });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    const filePath = path.join(uploadDir, media.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.media.delete({ where: { id } });
    return res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('deleteMedia error:', error);
    return res.status(500).json({ error: 'Failed to delete media' });
  }
};
