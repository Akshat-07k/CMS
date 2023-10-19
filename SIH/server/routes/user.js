const express = require("express") ; 
const router = express.Router() ; 
const { sendOtp } = require("../utils/otp");

const {uploadDoc ,  sendOTP, verifyOTP} = require("../controllers/documentController");  
const { createDirectory } = require("../middlewares/upload") ; 
const {signup} = require('../controllers/signup');
const { Efile } = require("../controllers/EfileController") ; 

const multer = require('multer') ;
const fs = require("fs") ; 
const path = require("path") ; 

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const id = req.header('id');
  
      if (!id) {
        return cb(new Error('ID not provided in the header'));
      }
  
      const directoryPath = `public/${id}`;

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      cb(null, directoryPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
  });

const upload  = multer({storage:storage}) ;


// router.post("/enterDetails", sendOTP) ; 
router.post("/document/upload", createDirectory , upload.single('file') , uploadDoc ) ; 
// router.get( "/document/view", viewDoc) ; 

router.post("/Efile" , Efile ) ; 


module.exports = router ;   