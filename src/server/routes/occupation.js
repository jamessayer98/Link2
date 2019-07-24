const express = require('express');
const router = express.Router();
const middleware = require('./middleware');

const occupationController = require('../controllers/occupation');

/**
 * @route /api/notifications/
 * @description Get the list of notifications
 * @access Private
 **/
router.get('/', middleware(occupationController.index));

/**
 * @route /api/notifications/
 * @description Store new notification resource
 * @access Private
 **/
router.get('/:id', middleware(occupationController.edit));

/**
 * @route /api/notifications/:id
 * @description Update the notification resource
 * @access Private
 **/
router.post('/', middleware(occupationController.saveAndUpdate));

/**
 * @route /api/notifications/
 * @description Delete the notification resource
 * @access Private
 **/
router.post('/delete/:id', middleware(occupationController.delete));

router.post('/deleteall', middleware(occupationController.deleteAll));

module.exports = router;
