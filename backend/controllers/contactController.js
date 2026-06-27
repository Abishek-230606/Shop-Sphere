const express = require('express');
const contactService = require('../services/contactService');
const router = express.Router();

router.get('/', (req, res) => {
    setTimeout(() => {
        const contacts = contactService.getContacts();
        res.json(contacts);
    }, 2000);
});

router.post('/', (req, res) => {
    setTimeout(() => {
        const newContact = contactService.addContact(req.body);
        res.status(201).json(newContact);
    }, 2000);
});

module.exports = router;
