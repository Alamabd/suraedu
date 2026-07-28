import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const filename = `${Date.now()}${ext}`;

    cb(null, filename);
  },
});

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const allowed =
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (allowed) {
      cb(null, true);
    } else {
      cb(new Error("File harus berupa DOCX"));
    }
  },

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;
