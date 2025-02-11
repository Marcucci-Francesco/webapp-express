import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/img",
  filename: (req, file, cb) => {
    console.log(file);

    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
})

const upload = multer({ storage });

export default upload
