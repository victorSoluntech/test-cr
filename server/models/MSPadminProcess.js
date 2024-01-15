'use strict';
// is process active mongoose model
//Declare modules
const mongoose = require('mongoose');
const _ = require('lodash');

const ProcessSchema = new mongoose.Schema({
    isProcessActive: {
        type: Boolean,
        required: true,
        default: false
    },
    isTEsubmittingForApproval: {
        type: Boolean,
        required: true,
        default: false
    },
    isApprovingTE: {
        type: Boolean,
        required: true,
        default: false
    },
});


var Process = mongoose.model('Process', ProcessSchema);

module.exports = { Process };
