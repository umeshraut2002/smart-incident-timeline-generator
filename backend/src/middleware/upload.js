const path = require("path");
const multer = require("multer");
const env = require("../config/env");

const allowedExtensions = new Set([".log", ".txt"]);

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, env.uploadDir);
  },
  filename: (_, file, callback) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    callback(null, `${Date.now()}-${safeName}`);
  }
});

const fileFilter = (_, file, callback) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.has(extension)) {
    callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
    return;
  }

  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.maxFileSizeBytes,
    files: 1
  }
});

module.exports = {
  upload,
  multer
};
