const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router.get('/people', personController.person_index);

router.get('/add', personController.person_create_get);

router.post('/add',personController.person_create_post);

router.get('/:id', personController.person_details);

router.delete('/delete/:id', personController.person_delete);

module.exports = router;