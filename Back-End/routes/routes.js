const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.getProfiles);

router.get('/profile', profileController.getProfileByName);

router.get('/:profileId', profileController.getProfileById);

router.post('/', profileController.addProfile);

router.put('/:profileId', profileController.updateProfile);

router.delete('/:profileId', profileController.deleteProfile);

// router.all('*', profileController.notFound);

module.exports = router;