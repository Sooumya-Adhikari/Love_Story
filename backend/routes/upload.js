const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer: store file in memory buffer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
});

// Auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET || 'fallback-secret');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// POST /api/upload — upload any file to Cloudinary
router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const { mimetype, buffer, originalname } = req.file;

    // Determine Cloudinary resource_type
    let resourceType = 'image';
    let folder = 'love-story/images';

    if (mimetype.startsWith('video/')) {
      resourceType = 'video';
      folder = 'love-story/videos';
    } else if (mimetype.startsWith('audio/')) {
      resourceType = 'video'; // Cloudinary uses 'video' for audio too
      folder = 'love-story/audio';
    }

    // Convert buffer to base64 data URI
    const b64 = buffer.toString('base64');
    const dataURI = `data:${mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: resourceType,
      folder,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      // Auto-optimize images
      ...(resourceType === 'image' && {
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      }),
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: resourceType,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
