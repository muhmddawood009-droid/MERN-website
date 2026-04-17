// middlewares/multer.js
import multer from "multer";

// configure multer to store files temporarily in "uploads/"
const upload = multer({ dest: "uploads/" });

// export once — either default or named, but not both
export default upload;
