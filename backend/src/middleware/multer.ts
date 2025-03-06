import multer from "multer";

export const multerUploadImage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      // cb(null, file.filename + "_" + Date.now() + ".jpg");
      cb(null, file.originalname.split(".")[0] + "_" + Date.now() + ".jpg");
    },
  }),
}).single("image");
