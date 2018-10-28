const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const memberShema = new Shema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    birthday: String,
    _id: String
});

const Member = mongoose.model('Member', memberShema);

module.exports = Member;