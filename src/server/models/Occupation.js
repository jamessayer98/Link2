const mongoose = require('mongoose');

const OccupationSchema = new mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        require: true,
    },
    credential_assessment: {
        type: Boolean,
        default: false
    },
    loan_assistance: {
        type: Boolean,
        default: false
    },
    licensing: {
        type: Boolean,
        default: false
    },
    mentorship: {
        type: Boolean,
        default: false
    },
    training: {
        type: Boolean,
        default: false
    },
    other: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Occupation', OccupationSchema);
