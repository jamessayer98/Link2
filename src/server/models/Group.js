const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name : {
        type: String,
        required: 'Group name field is required'
    },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('Group', groupSchema);
