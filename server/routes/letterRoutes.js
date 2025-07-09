const express = require('express');
const {
    hello,
    createLetter,
    getAllLetters,
    getSearchedLetter,
    updateLetter,
    deleteLetter,
    getCollageNames,
    saveCollageName,
    getCourseNames,
    generateBulkCertificates,
    downloadCertificates
} = require('../controllers/letterControllers');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Configure multer upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        } else {
            cb(new Error('Only Excel files are allowed!'), false);
        }
    }
});

const router = express.Router();

router.get('/letter', hello);
router.post('/letterCreate', createLetter);
router.get('/getAllLetters', getAllLetters);
router.post('/getSearchedLetter', getSearchedLetter);
router.put('/updateLetter', updateLetter);
router.delete('/deleteLetter', deleteLetter);

// Add the new route for getting course names after the college names routes
router.get('/getAllColleges', getCollageNames)
router.post('/savecollage', saveCollageName)
router.get('/getAllCourses', getCourseNames)

// Excel upload route
router.post('/upload-excel', upload.single('file'), generateBulkCertificates);

// Get letters data route (previously used for downloading certificates)
// Now returns letter data for frontend PDF generation
router.get('/download-certificates', downloadCertificates);

module.exports = router;
