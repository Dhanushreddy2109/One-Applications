const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile, resetPassword, userListing, marketerListing } = require('./user');
const { validateToken, checkRole } = require('../controllers/user');
const { addJobApplied, updateJobApplied, deleteJobApplied, listAppliedJobs, getJobs} = require('./job');
const { provideAccess, editAccess } = require('./consultant');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateToken, getProfile);
router.put('/profile', validateToken, updateProfile);
router.post('/reset-password', resetPassword);

router.post('/job', validateToken, checkRole(['User', 'Consultant']), addJobApplied);
router.put('/job/:id', validateToken, checkRole(['User', 'Consultant']), updateJobApplied);
router.delete('/job/:id', validateToken, checkRole(['User', 'Consultant']), deleteJobApplied);

router.get('/job', validateToken, listAppliedJobs);

router.post('/access-consultant', validateToken, checkRole(['User']), provideAccess);
router.put('/edit-access/:id', validateToken, checkRole(['User']), editAccess);

router.get('/users', validateToken, checkRole(['Admin']), userListing);
router.get('/marketers', validateToken, marketerListing);

router.get('/getJobs', getJobs)

module.exports = router;