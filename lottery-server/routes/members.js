const express = require('express');
const router = express.Router();
const Member = require('../models/member');


router.get('/', (req, res) => {
    Member.find((err, member) => {
        if (err) throw err;
        res.send(member);
    });
}).post('/', (req, res) => {
    console.log(req.body);
    let newMember = new Member(defineMember(req.body));
    newMember.save((err) => {
        if (err) throw err;
        res.send(newMember);
    });
}).post('/find-one', (req, res) => {
    Member.findOne(req.body, (err, person) => {
        if (err) throw err;
        console.log(person)
        res.send(person);
    });
}).put('/', (req, res) => {
    //const options = { multi: true };
    //let query = new Member(defineMember(req.body));
    Model.findOneAndUpdate(query, query, (err) => {
        if (err) throw err;
        res.send(member);
    });
}).delete('/', function (req, res) {
    Member.deleteOne(req.body, (err) => {
        if (err) throw err;
        res.send(req.body);
    });
});

function defineMember(req) {
    return {
        name: req.name,
        surname: req.surname,
        email: req.email,
        phone: req.phone,
        birthday: req.birthday
    }
}

module.exports = router;