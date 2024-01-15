'use strict';

// Declare internals
const internals = {};

const { Process } = require('./../models/MSPadminProcess');

internals.actual_status = async function () {

    console.log("inside change status");
    try {

        let response = await Process.find();
        //console.log("actual status response: ", response);
        if (response.length == 0 || !response) {
            try {
                const newResponse = new Process({
                    isProcessActive: false,
                    isTEsubmittingForApproval: false,
                    isApprovingTE: false
                })
                await newResponse.save();
                //console.log("actual status response new created: ", newResponse);
                return { status: "Ok", process: newResponse };
            } catch (e) {
                console.log("error creating first record: ", e)
            }
        }
        //console.log("Found: ", response[0]);
        return { status: "Ok", process: response[0] };
    } catch (e) {
        console.log(e);
        return { status: 'fail', error: e };
    }
}


internals.change_status = async function () {

    try {
        let response = await Process.find();
        let process = {};
        if (response.length == 0 || !response) {
            try {
                const newResponse = new Process({
                    isProcessActive: false,
                    isTEsubmittingForApproval: false,
                    isApprovingTE: false
                })
                await newResponse.save();
                //console.log("actual status response new created: ", newResponse);
                process = newResponse;
            } catch (e) {
                console.log("error creating first record: ", e)
            }
        } else {
            process = response[0];
        }
        console.log("Found: ", process);

        if (process.isProcessActive == false) {
            process.isProcessActive = true;
            await process.save();
        } else {
            process.isProcessActive = false;
            await process.save();
        }
        return { status: "Ok", process: process };
    } catch (e) {
        console.log(e);
        return { status: 'fail', error: e };

    }
}

internals.resetProcessStatus = async function () {
    try {
        console.log("SERVER ON")
        let response = await Process.updateMany(
            {},
            {
                isProcessActive: false,
                isTEsubmittingForApproval: false,
                isApprovingTE: false
            }
        );
        console.log(response);
        return { status: "Ok", process: response };
    } catch (e) {
        console.log(e);
        return { status: 'fail', error: e };
    }
}

internals.change_status_isTEsubmittingForApproval = async function () {

    try {
        let response = await Process.find();
        let process = {};
        if (response.length == 0 || !response) {
            try {
                const newResponse = new Process({
                    isProcessActive: false,
                    isTEsubmittingForApproval: false,
                    isApprovingTE: false
                })
                await newResponse.save();
                //console.log("actual status response new created: ", newResponse);
                process = newResponse;
            } catch (e) {
                console.log("error creating first record: ", e)
            }
        } else {
            process = response[0];
        }
        console.log("Found: ", process);

        if (process.isTEsubmittingForApproval == false) {
            process.isTEsubmittingForApproval = true;
            await process.save();
        } else {
            process.isTEsubmittingForApproval = false;
            await process.save();
        }
        return { status: "Ok", process: process };
    } catch (e) {
        console.log(e);
        return { status: 'fail', error: e };

    }
}

internals.change_status_isApprovingTE = async function () {

    try {
        let response = await Process.find();
        let process = {};
        if (response.length == 0 || !response) {
            try {
                const newResponse = new Process({
                    isProcessActive: false,
                    isTEsubmittingForApproval: false,
                    isApprovingTE: false
                })
                await newResponse.save();
                //console.log("actual status response new created: ", newResponse);
                process = newResponse;
            } catch (e) {
                console.log("error creating first record: ", e)
            }
        } else {
            process = response[0];
        }
        console.log("Found: ", process);

        if (process.isApprovingTE == false) {
            process.isApprovingTE = true;
            await process.save();
        } else {
            process.isApprovingTE = false;
            await process.save();
        }
        return { status: "Ok", process: process };
    } catch (e) {
        console.log(e);
        return { status: 'fail', error: e };

    }
}


exports.plugin = {
    name: 'CheckProcess',
    register: function (server) {
        server.expose('actual_status', internals.actual_status);
        server.expose('change_status', internals.change_status);
        server.expose('resetProcessStatus', internals.resetProcessStatus);
        server.expose('change_status_isTEsubmittingForApproval', internals.change_status_isTEsubmittingForApproval);
        server.expose('change_status_isApprovingTE', internals.change_status_isApprovingTE);
    }
}
