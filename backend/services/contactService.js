const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'customerdb.json');

const getContacts = () => {
    const rawData = fs.readFileSync(dbPath);
    return JSON.parse(rawData).contacts;
};

const addContact = (contactData) => {
    const rawData = fs.readFileSync(dbPath);
    const db = JSON.parse(rawData);
    
    const newContact = {
        ...contactData,
        submittedAt: new Date().toISOString(),
        id: db.contacts.length ? Math.max(...db.contacts.map(c => c.id)) + 1 : 1
    };
    
    db.contacts.push(newContact);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    
    return newContact;
};

module.exports = {
    getContacts,
    addContact
};
