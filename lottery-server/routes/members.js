const express = require('express');
const router = express.Router();
const Member = require('../models/member');


router.get('/', (req, res) => {
    Member.find((err, member) => {
        if (err) throw err;
        res.send(member);
    });
}).post('/', (req, res) => {
    let newMember = new Member(defineMember(req.body));
    newMember.save((err) => {
        if (err) throw err;
        res.send(newMember);
    });
}).post('/find-one', (req, res) => {
    Member.findOne(req.body, (err, person) => {
        if (err) throw err;
        res.send(person);
    });
}).put('/', (req, res) => {
    let id = req.body._id;
    let query = { _id: { $oid: id } };
    let member = req.body;
    member._id = { $oid: id };
    //member._id = { $oid: id }
    console.log(req.body);
    console.log(member);
    Member.findOneAndUpdate(query, member.name, { upsert: true }, (err, doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.send('updated');
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
        birthday: req.birthday,
    }
}

module.exports = router;