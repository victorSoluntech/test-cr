'use strict';

// Load modules
const Moment = require('moment');
const Promise = require('bluebird');
const Boom = require('boom');
const Request = require('promise-request-retry');
var fs = require('fs');
const os = require('os');
const UrlUnshort = require('url-unshort')();
const xl = require('excel4node');
const { result } = require('lodash');
let Client = require('ssh2-sftp-client');
const logger = require('../util/winstonLogger');
const { importsController } = require('./imports');

// Declare internals

const internals = {
    KNACK_OBJECTS_IDS: {
        BuyerInvoice: 'object_45',
        Contract: 'object_6',
        ContractInvoice: 'object_35',
        SupplierInvoice: 'object_44',
        TimeExpense: 'object_33',
        lineItems: 'object_37',
        contractAmendment: 'object_47',
        proposalObject: 'object_12',
        Worker: 'object_30',
        Daily_scan: 'object_62',
        Scan_notifications: 'object_63',
        ExportLog: 'object_66',
        teImportLog: 'object_54',
        processLog: 'object_68',
        requisitions: 'object_10',
        contractsImportLogs: 'object_70',
        Requester: 'object_20',
        Buyer: 'object_1',
        costCenters: 'object_25',
        GLcodes: 'object_58',
        BusinessUnit: 'object_56',
        Suppliers: 'object_2',
        mspSuperAdmin: 'object_74',
        OpenPositionsData: 'object_75'
    },
    CONCURRENCY_OPTS: {
        concurrency: 1
    }
};

internals.acceptedErrorCodes = () => {
    const sArray = [];
    for (let i = 0; i < 52; i++) {
        const status = 400 + i;
        sArray.push(status);
    }
    return sArray;
};

let SEND_PROCESS_EMAIL_SCENE = "";
let SEND_PROCESS_EMAIL_VIEW = "";
let SEND_PROCESS_EMAIL_FIELDS = {};

if (process.env.KNACK_APP_ID == "583da0c358256f6a2ee5887d") {
    // in prod app
    SEND_PROCESS_EMAIL_SCENE = "scene_1400";
    SEND_PROCESS_EMAIL_VIEW = "view_3538";
    SEND_PROCESS_EMAIL_FIELDS = {
        fieldCreatedby: "field_2107",
        fieldMessage: "field_2110",
        fieldStartedTime: "field_2108",
        fieldEndTime: "field_2109"
    }
} else if (process.env.KNACK_APP_ID == "5feb2f63d4466d001bd39ec9") {
    // in TRS app
    SEND_PROCESS_EMAIL_SCENE = "scene_1395";
    SEND_PROCESS_EMAIL_VIEW = "view_3511";
    SEND_PROCESS_EMAIL_FIELDS = {
        fieldCreatedby: "field_2114",
        fieldMessage: "field_2117",
        fieldStartedTime: "field_2115",
        fieldEndTime: "field_2116"
    }
} else if (process.env.KNACK_APP_ID == "6046465483fe82001ccab4b4") {
    // in copy app
    SEND_PROCESS_EMAIL_SCENE = "scene_1396";
    SEND_PROCESS_EMAIL_VIEW = "view_3521";
    SEND_PROCESS_EMAIL_FIELDS = {
        fieldCreatedby: "field_2110",
        fieldMessage: "field_2113",
        fieldStartedTime: "field_2111",
        fieldEndTime: "field_2112"
    }
} else if (process.env.KNACK_APP_ID == "605cba8b2c0a3c2fb7c8c7f1") {
    // in copy app II
    SEND_PROCESS_EMAIL_SCENE = "scene_1401";
    SEND_PROCESS_EMAIL_VIEW = "view_3540";
    SEND_PROCESS_EMAIL_FIELDS = {
        fieldCreatedby: "field_2114",
        fieldMessage: "field_2117",
        fieldStartedTime: "field_2115",
        fieldEndTime: "field_2116"
    }
}

// Declare Providers Objects
const p_internals = {
    KNACK_OBJECTS_IDS: {
        Sessions: 'object_6',
        Mandates: 'object_10',
        Frequency: 'object_15',
        SLACode: 'object_16',
        Timesheets: 'object_20',
        TimesheetProcessing: 'object_22'
    },
    KNACK_KEYS: {
        appID: process.env.KNACK_PROVIDERS_APP_ID,
        apiKey: process.env.KNACK_PROVIDERS_API_KEY
    }
};

exports.plugin = {
    name: 'api',
    register: function (server) {

        const {
            Knack,
            KnackAuth,
            CheckProcess
        } = server.plugins;

        CheckProcess.resetProcessStatus();

        const KNACK_OBJECTS_IDS = Knack.objects();

        const getAllLineItems = async (page, filters) => {
            // console.log("LineItems page ", page);
            try {
                const response = await Knack.find({
                    objectKey: internals.KNACK_OBJECTS_IDS.lineItems,
                    rowsPerPage: 1000,
                    filters,
                    page,
                });

                if (response.current_page < response.total_pages) {
                    return response.records.concat(
                        await getAllLineItems(page + 1, filters)
                    );
                }
                return response.records;
            } catch (e) {
                console.log("error getting all the line items: ", e);
            }
        };

        const getAllAmendments = async (page, filters) => {
            try {
                const response = await Knack.find({
                    objectKey: internals.KNACK_OBJECTS_IDS.contractAmendment,
                    rowsPerPage: 1000,
                    filters,
                    page,
                });

                if (response.current_page < response.total_pages) {
                    return response.records.concat(
                        await getAllAmendments(page + 1, filters)
                    );
                }
                return response.records;
            } catch (e) {
                console, log("error getting all the contract amendment: ", e);
            }
        };

        const getAllContracts = async (page, filters) => {
            try {
                const response = await Knack.find({
                    objectKey: internals.KNACK_OBJECTS_IDS.Contract,
                    rowsPerPage: 1000,
                    filters,
                    page,
                });

                if (response.current_page < response.total_pages) {
                    return response.records.concat(
                        await getAllContracts(page + 1, filters)
                    );
                }
                return response.records;
            } catch (e) {
                console.log("error getting all the contracts: ", e);
            }
        };

        const sendEmail = async (id, type, message) => {

            const form = {
                start: 'view_2789',
                success: 'view_2788',
                error: 'view_2790'
            };

            const options = {
                uri: `https://us-api.knack.com/v1/pages/page_1175/views/${form[type]}/records/${id}`,
                method: 'PUT',
                form: {
                    field_1599: message
                },
                headers: {
                    'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                    'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                },
                retry: 3,
                accepted: [400, 404, 401, 403],
                delay: 5000
            };

            // code to update the update on field on all records
            try {
                const objectToUpdate = internals.KNACK_OBJECTS_IDS.BuyerInvoice; //'object_45'
                const idToUpdate = id;
                let objects = {
                    [internals.KNACK_OBJECTS_IDS.BuyerInvoice]: "field_2278", //buyer invoice
                }
                const updatedDate = new Date();

                if (objects[objectToUpdate]) {

                    await Knack.update({
                        objectKey: objectToUpdate,
                        id: idToUpdate,//   Supplier ID 5  Supplier Jheidy Soluntech         5
                        body: { [objects[objectToUpdate]]: updatedDate }
                    });

                }

            } catch (e) {
                console.log('error', e);
            }

            return Request(options);
        };

        const addSupplierPayment = async (payment) => {

            const options = {
                uri: `https://us-api.knack.com/v1/pages/page_1181/views/view_2807/records/`,
                method: 'POST',
                form: payment,
                headers: {
                    'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                    'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                },
                retry: 3,
                accepted: [400, 404, 401, 403],
                delay: 5000
            };

            return Request(options);
        };

        const runInvoicing = async (payload) => {
            try {

                const user = payload.user;
                const buyer = payload.buyer;
                const buyerInvoice = payload.buyerInvoice;
                const records = payload.records;

                const supplierInvoices = [];
                const contractInvoices = [];

                let complete = 'success';
                let errorMessage = '';

                sendEmail(buyerInvoice, 'start', '');

                // console.log('Creating Supplier Invoices');

                await Promise.map(records, async (te) => {

                    const supplierInvoice = supplierInvoices.find((invoice) => {
                        return invoice.supplier == te.field_51_raw[0].id
                    });

                    if (!supplierInvoice) {
                        try {
                            const reqTime = new Date().getTime();

                            let response = await Knack.create({
                                objectKey: internals.KNACK_OBJECTS_IDS.SupplierInvoice,
                                body: {
                                    field_955: te.field_51_raw[0].id,
                                    field_956: buyer,
                                    field_1000: buyerInvoice,
                                    field_1013: user.id
                                }
                            });

                            response = JSON.parse(response);

                            supplierInvoices.push({
                                name: te.field_51_raw[0].identifier,
                                supplier: te.field_51_raw[0].id,
                                invoice: response.id
                            });

                            const totalTime = new Date().getTime() - reqTime;

                            if (totalTime < 100) {
                                const delay = 100 - totalTime;
                                await Promise.delay(delay);
                            }
                        } catch (catched) {
                            let error;

                            try {
                                error = catched.error ? JSON.parse(catched.error) : {
                                    errors: [{
                                        message: 'Unexpected error creating supplier invoice'
                                    }]
                                };
                                console.error(`Error creating Supplier Invoice`);
                                console.error(error);
                                console.error('-------------------------------------------------------------');
                            } catch (e) {
                                error = {
                                    errors: [{
                                        message: 'Unexpected error creating supplier invoice'
                                    }]
                                };
                                console.error(catched);
                            }

                            complete = 'error';

                            error.errors.forEach((err) => {
                                errorMessage += `${err.message}\n`;
                            });
                        }
                    }
                }, {
                    concurrency: 1
                });

                console.log('Processing Supplier Invoices');
                await Promise.map(supplierInvoices, async (si) => {

                    const contracts = {};
                    const tes = records.filter((te) => {
                        return te.field_51_raw[0].id == si.supplier
                    });

                    tes.forEach((te) => {

                        var contract = te.field_377_raw[0].id;
                        if (!contracts[contract]) {
                            contracts[contract] = [];
                        }
                        contracts[contract].push(te.id);
                    });

                    await Promise.map(Object.keys(contracts), async (key) => {

                        const reqTime = new Date().getTime();

                        try {
                            await Knack.create({
                                objectKey: internals.KNACK_OBJECTS_IDS.ContractInvoice,
                                body: {
                                    field_454: buyer,
                                    field_455: si.supplier,
                                    field_463: key,
                                    field_451: contracts[key],
                                    field_973: si.invoice,
                                    field_974: buyerInvoice,
                                    field_461: user.id
                                }
                            });
                        } catch (catched) {
                            let error;

                            try {
                                error = catched.error ? JSON.parse(catched.error) : {
                                    errors: [{
                                        message: `Error creating Contract Invoice: ${si.supplier}`
                                    }]
                                };
                                console.error(`Error creating Contract Invoice: ${si.supplier}`);
                                console.error(error);
                                console.error('-------------------------------------------------------------');
                            } catch (e) {
                                error = {
                                    errors: [{
                                        message: `Error creating Contract Invoice: ${si.supplier}`
                                    }]
                                };
                                console.error(catched);
                            }

                            complete = 'error';

                            error.errors.forEach((err) => {
                                errorMessage += `${err.message}\n`;
                            });
                        }

                        const totalTime = new Date().getTime() - reqTime;

                        if (totalTime < 1000) {
                            const delay = 1000 - totalTime;
                            await Promise.delay(delay);
                        }
                    }, {
                        concurrency: 1
                    });
                }, {
                    concurrency: 1
                });

                await Promise.map(records, async (te) => {

                    const supplier = supplierInvoices.find(function (sup) {
                        return sup.supplier == te.field_51_raw[0].id;
                    });

                    const reqTime = new Date().getTime();

                    try {
                        await Knack.update({
                            objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
                            id: te.id,
                            body: {
                                field_1020: buyerInvoice,
                                field_1047: supplier.invoice
                            }
                        });
                    } catch (catched) {
                        let error;

                        try {
                            error = catched.error ? JSON.parse(catched.error) : {
                                errors: [{
                                    message: `Error updating Time & Expense with ID: ${te.id}`
                                }]
                            };
                            console.error(`Error updating Time & Expense with ID: ${te.id}`);
                            console.error(error);
                            console.error('-------------------------------------------------------------');
                        } catch (e) {
                            error = {
                                errors: [{
                                    message: `Error updating Time & Expense with ID: ${te.id}`
                                }]
                            };
                            console.log(catched);
                        }

                        complete = 'error';

                        error.errors.forEach((err) => {
                            errorMessage += `${err.message}\n`;
                        });
                    }

                    const totalTime = new Date().getTime() - reqTime;

                    if (totalTime < 1000) {
                        const delay = 1000 - totalTime;
                        await Promise.delay(delay);
                    }
                }, {
                    concurrency: 1
                });

                console.log('Done!');
                try {
                    await sendEmail(buyerInvoice, complete, errorMessage);
                } catch (e) {
                    console.log("error sending email: ", e);
                }
                return {
                    supplierInvoices,
                    contractInvoices
                };

            } catch (error) {
                console.log(error);
                logger.error(error);
            }
        };

        server.route({
            method: 'POST',
            path: '/save',
            handler: async function (request, h) {

                const payload = request.payload;


                logger.debug("method:POST,  path: save");
                logger.debug(request.payload);

                // console.log('payload type', typeof payload);

                let response = {
                    status: 'ok'
                };

                if (payload.records.length > 100) {
                    // console.log('More than 100 selected');
                    runInvoicing(payload);
                } else {
                    // console.log('Less than 100 selected');
                    try {
                        response = await runInvoicing(payload);
                    } catch (e) {
                        console.log("error in runInvoicing: ", e);
                        logger.error(e);
                    }
                }

                return response;
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });

        server.route({
            method: 'POST',
            path: '/apply-supplier-payments',
            handler: async function (request, h) {

                const payload = request.payload;

                // console.log('payload type', typeof payload);

                let response = {
                    status: 'ok'
                };

                await Promise.map(payload.suppliers, async (supp) => {

                    const payment = {
                        field_1605: supp.id,
                        field_1610: supp.field_1612_raw,
                        field_1609: payload.user.id,
                        field_1607: payload.date
                    };

                    try {
                        await addSupplierPayment(payment);
                    } catch (error) {
                        console.log(error);
                    }

                    console.log(payment);
                }, {
                    concurrency: 1
                });

                return response;
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });

        server.route({
            method: 'PUT',
            path: '/scan_amendments',
            handler: async function (request, h) {
                const params = request.query;
                // console.log("Scan All Endpoint");
                // console.log("--------------------");
                // console.log(params.email);
                let errString = "";
                try {
                    let alreadyScanned = await checkScanForToday(false, errString);
                    console.log("Already Scanned Today? ", alreadyScanned);
                    // return "ok";
                    let stringRes = alreadyScanned.string;

                    if (!alreadyScanned.status) {
                        // let glossaryContracts= await getAllContracts(1, filters);
                        // console.log("Loaded All Contracts \n");
                        // console.log(glossaryContracts.length);
                        // scanItemArray(itemArray, glossaryAmendments);
                        scanAllLineItems(params.email);
                    }

                    return {
                        "message": stringRes
                    };
                } catch (e) {
                    return {
                        "message": "unexpected"
                    };
                }
            },
            config: {
                timeout: {
                    socket: 9000000
                }
            }
        });

        async function checkScanForToday(alreadyScanned, errString) {
            try {
                let scanRecord = await Knack.find({
                    objectKey: internals.KNACK_OBJECTS_IDS.Daily_scan,
                });
                if (scanRecord.records.length > 1) {
                    console.log("Security Compromised. Prevent Scan Feature");
                    errString += "critical";
                } else {
                    scanRecord = scanRecord.records[0];
                    // console.log(scanRecord);
                    if (scanRecord.field_1775 != "") {
                        let recordDate = Moment(scanRecord.field_1775, "L").format("L");
                        let todayDate = Moment().format("L");
                        // let bool=moment(recordDate).isSameOrBefore(todayDate, 'day');
                        alreadyScanned = Moment(recordDate).isSameOrAfter(todayDate, 'day');
                        console.log("Last Scan: ", recordDate);
                        console.log("Today is: ", todayDate);
                        console.log("result: ", alreadyScanned);
                        if (alreadyScanned) {
                            errString += "procedure";
                        } else {
                            console.log("Updating Scan Date");
                            try {
                                await Knack.update({
                                    objectKey: internals.KNACK_OBJECTS_IDS.Daily_scan,
                                    id: scanRecord.id,
                                    body: {
                                        field_1775: todayDate
                                    }
                                });
                                console.log("Scan Date updated!!");
                            } catch (e) {
                                console.log(e.error);
                                alreadyScanned = true;
                                errString += "critical"; //make new error code
                            }
                        }
                    } else {
                        console.log("Unexpected error occur while updating Daily Scan!");
                        errString += "unexpected";
                    }
                }
            } catch (e) {
                errString += "unexpected";
            }

            return {
                status: alreadyScanned,
                string: errString
            };
        };

        async function notifyEndofScan(userEmail, newMsg) {

            let options = {
                uri: 'https://us-api.knack.com/v1/pages/page_1225/views/view_2941/records/',
                method: 'POST',
                form: {
                    field_1777: {
                        email: "support@contraxvms.com"
                    },
                    field_1778: {
                        email: userEmail
                    }, //email
                    field_1776: "Notification: Task Completed",
                    field_1779: newMsg
                },
                headers: {
                    'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                    'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                },
                retry: 3,
                accepted: [400, 401, 402, 403, 404, 419],
                delay: 5000
            };

            try {
                let createdObj = await Request(options);
                createdObj = JSON.parse(createdObj);
                console.log(createdObj);
            } catch (e) {
                console.log(e.error);
            }
        };

        async function scanAllLineItems(userEmail) {
            let message = "";
            // console.log("Loading All Amendments...");
            let caFilters = [{
                field: 'field_1131',
                operator: 'is not',
                value: 'Next Up'
            }];
            let glossaryAmendments = await getAllAmendments(1, caFilters);
            // console.log("Loaded All Amendments \n");
            // console.log(glossaryAmendments.length);

            console.log("Loading All LineItems...");
            let leFilters = [{
                field: "field_1168",
                operator: "higher than",
                value: "0"
            }, //# of amendments
            {
                field: "field_1347",
                operator: "is not",
                value: "Incomplete"
            }, //card status tf
            {
                field: "field_481",
                operator: "is not blank",
                value: ""
            }, //time card
            {
                field: "field_760",
                operator: "is not blank",
                value: ""
            }, //Contract
            {
                field: "field_1764",
                operator: "is blank",
                value: ""
            }, //new amendment
            {
                field: "field_1771",
                operator: "is not",
                value: "Yes"
            }, // "No Match Found"= No
            ];
            let glossaryLineItems = await getAllLineItems(1, leFilters);
            glossaryLineItems = glossaryLineItems.slice(0, 5000); //failtesting
            // glossaryLineItems=glossaryLineItems.slice(0,3000);
            console.log("Loaded All Line Items:");
            console.log(glossaryLineItems.length);
            if (glossaryLineItems.length > 0) {
                let taskComplete = await scanItemArray(glossaryLineItems, glossaryAmendments);
                message = `
                  Scan Feature Report
                  ----------------------------
                  Finished Scanning: ${glossaryLineItems.length} LineItems

                  Updated Amendment: ${taskComplete.success} LineItems
                  No Match Found: ${taskComplete.nomatch} LineItems
                  Failed request: ${taskComplete.fail} LineItems

                  List of failed items:
                  ${taskComplete.errorList}
                `;
            } else {
                console.log("No records found");
                message = `
                  Scan Feature Report
                  ----------------------------

                  No records to update were found.
                `;
            }
            //Send email here
            notifyEndofScan(userEmail, message); //userEmail
        };

        async function scanItemArray(itemArray, glossaryAmendments) {
            // console.log("BEGIN SCAN");

            let successCount = 0,
                nomatchCount = 0,
                failCount = 0;
            let failedList = "";
            await Promise.map(itemArray, async (lineItem, index) => {
                let response = "";
                let lItemId = lineItem.itemId || lineItem.id;
                // let contractID=lineItem.contractID || lineItem.field_760_raw[0].id;
                let contractID = lineItem.field_760_raw && lineItem.field_760_raw.length ? lineItem.field_760_raw[0].id : "";
                let dateWorked = lineItem.dateWorked || lineItem.field_484;
                // console.log("Item #"+index);
                // console.log("ID:"+lItemId);
                let foundAmendments = glossaryAmendments.filter((p) => {
                    if (p.field_1112_raw && p.field_1112_raw.length > 0)
                        return p.field_1112_raw[0].id == contractID;
                });

                if (foundAmendments.length > 0) {
                    let startDate, endDate;
                    let matchDateRange = false;
                    for (var famItem of foundAmendments) {
                        dateWorked = Moment(dateWorked, "L");
                        startDate = Moment(famItem.field_1139, "L");
                        endDate = Moment(famItem.field_1148, "L");
                        // console.log("--------------------");
                        // console.log(famItem.field_1111);
                        // console.log(startDate);
                        // console.log(endDate);
                        if (Moment(dateWorked).isBetween(startDate, endDate, 'days', '[]')) {
                            // console.log("moment: ",famItem.field_1111);
                            matchDateRange = famItem;
                            break;
                        }
                    }

                    if (matchDateRange) {
                        response = await updateLineItemRecord(lItemId, matchDateRange.id, index);
                    } else {
                        response = await updateLineItemRecord(lItemId, "", index);
                    }
                } else {
                    // console.log("Found no Amendments");
                    response = await updateLineItemRecord(lItemId, "", index);
                }
                if (response == "success") successCount++;
                if (response == "nomatch") nomatchCount++;
                if (response == "fail") {
                    failCount++;
                    failedList += `LineItem #${lineItem.field_514} failed to update.\n`;
                }
            }, {
                concurrency: 1
            }); //failtesting

            return {
                success: successCount,
                nomatch: nomatchCount,
                fail: failCount,
                errorList: failedList
            };
        }

        async function updateLineItemRecord(lineItemID, amendmentID, index) {
            let response = "";
            // let errorLog = "";
            if (amendmentID == "") {
                try {
                    await Knack.update({
                        objectKey: internals.KNACK_OBJECTS_IDS.lineItems,
                        id: lineItemID,
                        body: {
                            field_1771: 'Yes'
                        }
                    });
                    // console.log("Updated Item#",index);
                    // console.log("ID:"+lineItemID);
                    // console.log("Updated boolean: no match found!\n");
                    // nomatchCount++;
                    response = "nomatch";
                } catch (e) {
                    console.error("ERROR ON LN 646: \n");
                    console.error(e);
                    console.error("------------------\n");
                    // failCount++;
                    response = "fail";
                    // errorLog+=`${e.error}.\n`
                }
            } else {
                try {
                    await Knack.update({
                        objectKey: internals.KNACK_OBJECTS_IDS.lineItems,
                        id: lineItemID,
                        body: {
                            field_1764: amendmentID
                        }
                    });
                    // console.log("Updated Item#",index);
                    // console.log("ID:"+lineItemID);
                    // console.log("Updated Amendment!\n");
                    // successCount++;
                    response = "success";
                } catch (e) {
                    console.error("ERROR ON LN 668: \n");
                    console.error(e);
                    console.error("------------------\n");
                    // failCount++;
                    response = "fail";
                }
            }
            return response;
        }

        // related to export-te
        const validateCredentials = (auth) => {
            const tmp = auth.split(' ');
            const buf = new Buffer(tmp[1], 'base64');
            const plain_auth = buf.toString();
            const creds = plain_auth.split(':');
            const username = creds[0];
            const password = creds[1];
            if (process.env.API_USER != username || process.env.API_PASSWORD != password) {
                return false;
            }
            return true;
        };

        // related to export-te
        const getTodaysLogs = async (page, filters) => {
            console.log(page);
            const response = await Knack.find({
                objectKey: internals.KNACK_OBJECTS_IDS.ExportLog,
                rowsPerPage: 1000,
                filters,
                page
            });
            if (response.current_page < response.total_pages) {
                return response.records.concat(
                    await getTodaysLogs(page + 1, filters)
                );
            }
            return response.records;
        }

        // related to export-te
        const getAllTERecords = async (page, filters) => {
            console.log("TE page ", page);

            const response = await Knack.find({
                objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
                rowsPerPage: 1000,
                filters,
                page
            });

            if (response.current_page < response.total_pages) {
                return response.records.concat(
                    await getAllTERecords(page + 1, filters)
                );
            }
            return response.records;
        };

        // se usa por un tercero
        server.route({
            method: 'GET',
            path: '/export-te',
            handler: async function (request, h) {
                console.log("Fetching data...");
                console.log(request.headers.authorization);
                console.log("After second log");
                if (!request.headers.authorization || !validateCredentials(request.headers.authorization)) {
                    return Boom.unauthorized('Invalid username or password', 'error');
                }
                console.log("Validate Authorization: Confirmed");
                const params = request.query;
                const response = [];
                const logFilter = [{ field: 'field_1886', operator: 'is today' }]
                console.log("Find Date's Logs");
                const todaysLog = await getTodaysLogs(1, logFilter); //ExportLog

                if (todaysLog.length >= process.env.API_EXP_LIMIT) {
                    return Boom.badRequest('Daily limit exceeded', 'error');
                }
                var teRecords = [];
                const timeExpFilters = [
                    { field: 'field_2091', operator: 'is', value: 'Yes' }, //Include in API pull?
                    { field: 'field_387', operator: 'is', value: params.date } //period start date
                ]
                console.log("Find Date's TE records");
                teRecords = await getAllTERecords(1, timeExpFilters);
                console.log("Number of TEcards: ", teRecords.length);
                console.log("Got all records for date: ", params.date);

                if (params.date && Moment(params.date, 'MM/DD/YYYY')) {
                    console.log("Enter LineItems export");
                    let error = '';
                    try {
                        console.log("Get LineItems");

                        let lineItemFilters = [
                            { field: 'field_1880', operator: 'is', value: 'Yes' }, //Include in API pull?
                            { field: 'field_849', operator: 'is', value: params.date }  //Period Start Date CR
                        ];

                        let result = await getAllLineItems(1, lineItemFilters);
                        console.log("Enter LineItems Loop: ");

                        result.forEach(r => {
                            // console.log("...")
                            let contract_id = r.field_760_raw.length > 0 ? r.field_760_raw[0].identifier : '';
                            const timeExpense = teRecords.find(ter => {
                                if (!r.field_481_raw || r.field_481_raw.length == 0) return false;
                                return r.field_481_raw[0].id == ter.id
                            });
                            let cost_center = '';
                            if (timeExpense) {
                                timeExpense.field_493_raw.forEach(f => {
                                    cost_center = f.identifier
                                    // cost_centers.push({
                                    //     cost_center: f.identifier
                                    // });
                                });
                            }
                            // console.log("Card supplier_name: ", timeExpense.field_1504);
                            // console.log("Card buyer_invoice_date: ", timeExpense.field_2099);
                            // console.log("Lineitem Created On:", r.field_483);
                            // console.log("----------");
                            // T&Ecard.field_483 = Created_On
                            // console.log("ok")
                            let te_id = r.field_481_raw.length > 0 ? r.field_481_raw[0].identifier : '';
                            let worker_name = r.field_488_raw.length > 0 ? r.field_488_raw[0].identifier : '';
                            response.push({
                                contract_id,
                                cost_center,
                                te_id,
                                worker_name,
                                supplier_name: timeExpense.field_1504,
                                buyer_invoice_date: timeExpense.field_2099,
                                item_created_on: r.field_483,
                                period_start_date: r.field_849,
                                period_end_date: r.field_492,
                                total_hours_worked: r.field_1594,
                                total_expenses: r.field_520,
                                total_labour_fees_to_client: r.field_527,
                                date_approved: r.field_1892,
                                approved_by: r.field_1891,
                                time_card_line_id: r.field_514,
                                date_worked: r.field_484,
                                day_of_week: r.field_485,
                                bill_type: r.field_487,
                                status: r.field_1347
                            });
                        });
                    } catch (err) {
                        error = err.message
                        console.error(error);
                    }
                    console.log("Final step: Create Export Log");
                    await Knack.create({
                        objectKey: internals.KNACK_OBJECTS_IDS.ExportLog,
                        body: {
                            field_1888: response.length,
                            field_1889: error
                        }
                    });
                }
                return response;
            },
            config: {
                timeout: {
                    socket: 9000000
                }
            }
        });

        // email procees csv file and tecard
        const sendImportEmail = async (url, id) => {

            const options = {
                //uri: `https://api.knack.com/v1/pages/page_1303/views/view_3208/records/${id}`,
                uri: `${url}${id}`,
                method: 'PUT',

                headers: {
                    'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                    'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                },
                retry: 3,
                accepted: [400, 404, 401, 403],
                delay: 5000
            };

            return Request(options);
        };

        const generateFile = async (dataToWrite, filename) => {

            //const filename = path.join('/tmp', 'output.csv');
            filename = filename.substring(0, filename.lastIndexOf(".")) + "-failed" + filename.substring(filename.lastIndexOf("."));
            //console.log(filename);
            const path = `${filename}`;
            const output = []; // holds all rows of data

            dataToWrite.forEach((d) => {
                const csvline = [];
                csvline.push(`${d.mappingId}`);
                csvline.push(`${d.billType}`);
                csvline.push(`${d.workShift}`);
                csvline.push(`${d.hoursWorked}`);
                csvline.push(`${d.dateWorked}`);
                csvline.push(`${d.cost_center}`);
                csvline.push(`${d.errorId}`);
                csvline.push(`${d.errorMessage}`);
                output.push(csvline.join());
            });

            fs.writeFileSync(path, output.join(os.EOL));

            let uploadResponse;
            try {
                uploadResponse = await Knack.upload({
                    type: 'file',
                    body: {
                        name: filename,
                        files: {
                            value: fs.createReadStream(path),
                            options: {
                                filename,
                                contentType: 'text/csv'
                            }
                        }
                    }
                });

                uploadResponse = JSON.parse(uploadResponse);
            } catch (catched) {

                try {
                    const error = JSON.parse(catched.error);
                    //uploadCode = catched.statusCode;
                    uploadResponse = error;
                } catch (error) {
                    //uploadCode = catched.statusCode;
                    uploadResponse = catched.message;
                }
            }

            fs.unlink(path, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });

            return {
                file: uploadResponse,
                //status: uploadCode
            };
        }

        const CSVtoArray = (text) => {

            const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
            var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
            if (!re_valid.test(text)) return null;
            let a = [];
            text.replace(re_value,
                function (m0, m1, m2, m3) {
                    if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
                    else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
                    else if (m3 !== undefined) a.push(m3);
                    return '';
                });
            if (/,\s*$/.test(text)) a.push('');
            return a;
        };

        const processCSVFile = async (payload) => {
            const buyer = payload.buyer;
            payload = payload.record;
            const teLineItemArray = [];
            const success = [];
            const successKnackResponse = [];
            const errors = [];
            let errorCode = 200;
            const filename = payload.field_1486_raw.filename;
            var dataToWrite = [{
                mappingId: 'Mapping ID', billType: 'Bill TYpe (MC)', workShift: 'Work Shift (MC)', hoursWorked: 'Total Hours (number)',
                dateWorked: 'Date Worked', cost_center: 'Cost Center', errorId: 'Error ID', errorMessage: 'Error Description'
            }];

            let filecontent = '';
            const billTypes = ['RT', 'OT', 'DT', 'VAC', 'SICK', 'HOL', 'PERS', 'OTH'];

            try {
                filecontent = await Request({
                    uri: payload.field_1486_raw.url,
                    method: 'GET',
                    retry: 3,
                    accepted: [400, 401, 402, 403, 404, 419],
                    delay: 5000
                });
            } catch (error) {
                errorCode = 500;
                /* errors.push({
                     client: `CSV File`,
                     errors: [
                         {
                             message: error.message
                         }
                     ]
                 });*/
            }

            //console.log(filecontent);

            let rows = filecontent.split(/\r\n|\r|\n/g);
            rows = rows.slice(1, rows.length);

            rows.forEach((row) => {

                if (row != '') {
                    const cells = CSVtoArray(row);

                    if (cells != null && cells.length >= 6) {
                        teLineItemArray.push({
                            mappingId: cells[0].trim(),
                            billType: cells[1].trim(),
                            workShift: cells[2].trim(),
                            hoursWorked: cells[3].trim(),
                            dateWorked: Moment(cells[4], "L").format("L"),
                            costCenter: cells[5].trim(),
                            createdBy: payload.field_1485_raw[0].id,
                            importLog: payload.id,
                            buyer: buyer
                        });
                    } else {
                        errorCode = 500;
                        /*errors.push({
                            client: `CSV File`,
                            errors: [
                                {
                                    message: 'Invalid Format'
                                }
                            ]
                        });*/
                    }
                }
            });

            //console.log(teLineItemArray.length);

            //let contract1 = await getAllContracts(1, []);
            // const connectionList = await Promise.props({
            //     'contracts': (async () => {
            //         let response = [];

            //         try {
            //             response = await getAllContracts(1, [{ "field": "field_47", "operator": "is", "value": `${buyer}` }]);
            //         } catch (catched) {
            //             //errors.push(JSON.parse(catched.message)) //revisar
            //             errorCode = 500;
            //         }

            //         return response;
            //     })(),
            //     'contractAmendments': (async () => {

            //         let response = [];

            //         try {
            //             response = await getAllAmendments(1, [{ "field": "field_1082", "operator": "is", "value": `${buyer}` }]);
            //         } catch (catched) {
            //             //errors.push(JSON.parse(catched.message)); //revisar
            //             errorCode = 500;
            //         }

            //         return response;
            //     })()
            // });
            // console.log("contracts", connectionList.contracts.length)
            await Promise.map(teLineItemArray, async (teLineItem) => {

                // console.log('Processing => ', teLineItem.mappingId, teLineItem.billType, teLineItem.dateWorked);
                var row = {
                    mappingId: teLineItem.mappingId,
                    billType: teLineItem.billType,
                    workShift: teLineItem.workShift,
                    hoursWorked: teLineItem.hoursWorked,
                    dateWorked: teLineItem.dateWorked,
                    cost_center: teLineItem.costCenter
                };

                const contract = async (tofind, dateWorked) => {
                    if (tofind) {

                        let response = await Knack.find({
                            objectKey: internals.KNACK_OBJECTS_IDS.Contract,
                            filters: [{ field: "field_1445", operator: "is", value: tofind }]
                        });

                        var response1 = response.records.length ? response.records[0] : null
                        if (!response1) {
                            response = { id: '-1' };
                            return response
                        }

                        response = response.records.find((c) => {

                            let startDateS = Moment(c.field_602, "L");
                            let endDateS = Moment(c.field_603, "L");
                            if (Moment(dateWorked).isBetween(startDateS, endDateS, "days", "[]")) {
                                return c;
                            }
                        });

                        if (!response) {
                            response = { id: '-2' };
                        }
                        return response;
                    } else {
                        return { id: '' };
                    }
                };

                var contractAmendment = async (tofind, dateWorked) => {
                    let response = await Knack.find({
                        objectKey: internals.KNACK_OBJECTS_IDS.contractAmendment,
                        filters: [{ field: "field_1112", operator: "is", value: tofind }]
                    });
                    response = response.records.find((c) => {
                        // let response = connectionList.contractAmendments.find((c) => {
                        // if (c.hasOwnProperty('field_1112_raw') && c.field_1112_raw.length > 0) {
                        //     return c.field_1112_raw[0].id == tofind;
                        // }
                        let startDateS = Moment(c.field_1139, "L");
                        let endDateS = Moment(c.field_1148, "L");
                        if (c.hasOwnProperty('field_1112_raw') && c.field_1112_raw.length > 0 && Moment(dateWorked).isBetween(startDateS, endDateS, "days", "[]")) {
                            //console.log(`amendment selected with start date: ${startDateS}, end date: ${endDateS}, date worked od csv file: ${dateWorked}`)
                            return c.field_1112_raw[0].id == tofind;
                        }
                    });
                    response = response ? response : { id: '' };
                    return response;
                };

                var findCostCenter = (toFind, isUsingAmendmet) => {
                    if (toFind) {
                        let costcenters;
                        if (isUsingAmendmet) {
                            costcenters = teLineItem.contractAmendment.field_1089_raw;
                        } else {
                            costcenters = teLineItem.contract.field_494_raw;
                        }
                        if (costcenters) {
                            var found = costcenters.find(cc => cc.identifier.trim() == toFind.trim());
                            found = found !== undefined ? found : { id: '-1' }
                            return found;
                        } else {
                            return { id: '-1' };
                        }
                    } else {
                        return { id: '' };
                    }
                }

                const contract1 = await contract(teLineItem.mappingId, teLineItem.dateWorked);
                teLineItem.contract = contract1;
                let currentContractUsingAmendments = contract1.field_2224 == "Yes" ? true : false;
                if (currentContractUsingAmendments) {
                    teLineItem.contractAmendment = await contractAmendment(teLineItem.contract.id, teLineItem.dateWorked);
                }
                //console.log("amend",teLineItem.contractAmendment.field_1111);

                teLineItem.costCenter = findCostCenter(teLineItem.costCenter, currentContractUsingAmendments);

                var isValidbillType = () => {
                    if (teLineItem.billType) {
                        var found = billTypes.find(bt => bt == teLineItem.billType.toUpperCase());
                        if (found)
                            return true;

                    } else {
                        return true;
                    }
                    return false;
                }



                if (Moment(teLineItem.dateWorked).isAfter()) {
                    row.errorId = 1;
                    row.errorMessage = 'Date worked cannot be a future date.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 1,
                            message: 'Date worked cannot be a future date.'
                        }]
                    });
                }
                else if (!isNaN(parseInt(teLineItem.hoursWorked)) > 0 && !isNaN(parseInt(teLineItem.hoursWorked <= 24))) {
                    row.errorId = 2;
                    row.errorMessage = 'Total hours must be greater than 0 and less than or equal to 24.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 2,
                            message: 'Total hours must be greater than 0 and less than or equal to 24.'
                        }]
                    });
                }
                else if (!isValidbillType()) {
                    row.errorId = 3;
                    row.errorMessage = 'Invalid bill type.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 3,
                            message: 'Invalid bill type.'
                        }]
                    });
                }
                else if (teLineItem.contract.id == '') {
                    row.errorId = 4;
                    row.errorMessage = 'Mapping ID cannot be blank.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 4,
                            message: 'Mapping ID cannot be blank.'
                        }]
                    });
                } else if (teLineItem.contract.id == '-1') {
                    row.errorId = 5;
                    row.errorMessage = 'No contract found with matching mapping ID.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 5,
                            message: 'No contract found with matching mapping ID.'
                        }]
                    });
                } else if (teLineItem.contract.id == '-2') {
                    row.errorId = 9;
                    row.errorMessage = 'Date worked Outside of the Contract Period.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 9,
                            message: 'Date worked Outside of the Contract Period.'
                        }]
                    });
                } else if (teLineItem.contract.field_1739 != 'Yes') {
                    row.errorId = 6;
                    row.errorMessage = 'T&E cannot be added to this contract.'
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 6,
                            message: 'T&E cannot be added to this contract.'
                        }]
                    });
                } else if (teLineItem.contractAmendment && teLineItem.contractAmendment.id == '' && currentContractUsingAmendments) {
                    row.errorId = 7;
                    row.errorMessage = 'No contract amendment found for this date worked.'
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 7,
                            message: 'No contract amendment found for this date worked.'
                        }]
                    });
                } else if (teLineItem.contractAmendment && teLineItem.workShift.split(" ")[2] > teLineItem.contractAmendment.field_1116 && currentContractUsingAmendments) {
                    row.errorId = 9;
                    row.errorMessage = 'The work shift is not one of the options available on the contract amendment for this work day.'
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 9,
                            message: 'The work shift is not one of the options available on the contract amendment for this work day.'
                        }]
                    });
                } else if (teLineItem.workShift.split(" ")[2] > teLineItem.contract.field_796 && !currentContractUsingAmendments) {
                    row.errorId = 9;
                    row.errorMessage = 'The work shift is not one of the options available on the contract for this work day.'
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 9,
                            message: 'The work shift is not one of the options available on the contract for this work day.'
                        }]
                    });

                } else if (teLineItem.costCenter.id == '-1') {
                    row.errorId = 8;
                    row.errorMessage = 'The cost center is not one of the options available on the contract amendment for this work day.'
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 8,
                            message: 'The cost center is not one of the options available on the contract amendment for this work day.'
                        }]
                    });
                }
                else {
                    const body = {};

                    const getTimeBillType = (billType) => {
                        switch (billType) {
                            case "RT":
                                return "Regular Time"
                            case "OT":
                                return "Overtime";
                            case "DT":
                                return "Double Time";
                            case "VAC":
                                return "Vacation"
                            case "SICK":
                                return "Sick"
                            case "HOL":
                                return "Holiday"
                            case "PERS":
                                return "Personal"
                            case "OTH":
                                return "Other"
                        }
                    }
                    body.field_1907 = teLineItem.mappingId;
                    body.field_1906 = teLineItem.billType;
                    body.field_799 = teLineItem.workShift;
                    body.field_486 = teLineItem.hoursWorked;
                    body.field_484 = teLineItem.dateWorked;
                    body.field_1912 = teLineItem.costCenter.identifier;
                    body.field_760 = teLineItem.contract.id;
                    if (teLineItem.contract.hasOwnProperty('field_47_raw') && teLineItem.contract.field_47.length > 0)
                        body.field_1723 = teLineItem.contract.field_47_raw[0].id;
                    if (teLineItem.contract.hasOwnProperty('field_338_raw') && teLineItem.contract.field_338_raw.length > 0)
                        body.field_488 = teLineItem.contract.field_338_raw[0].id;
                    if (teLineItem.contract.hasOwnProperty('field_1327_raw') && teLineItem.contract.field_1327.length > 0)
                        body.field_1329 = teLineItem.contract.field_1327_raw[0].id;

                    if (currentContractUsingAmendments) {
                        body.field_1118 = teLineItem.contractAmendment.id;
                    }

                    body.field_482 = teLineItem.createdBy;
                    body.field_1908 = teLineItem.importLog;
                    body.field_490 = teLineItem.costCenter.id;
                    body.field_487 = getTimeBillType(teLineItem.billType);


                    //console.log(body);
                    try {
                        let successTeline = await Knack.create({
                            objectKey: internals.KNACK_OBJECTS_IDS.lineItems,
                            body
                        });

                        successTeline = typeof successTeline == 'string' ? JSON.parse(successTeline) : successTeline;

                        successKnackResponse.push(successTeline);
                        success.push({
                            message: teLineItem.mappingId + ' ' + teLineItem.billType + ' ' + teLineItem.dateWorked + 'Created'
                        });

                    } catch (catched) {
                        errorCode = catched.statusCode;

                        if (errorCode < 500) {
                            const error = JSON.parse(catched.error);
                            // console.log(error);

                            errors.push({
                                errors: error.errors
                            });
                        } else {
                            errors.push({
                                errors: [
                                    {
                                        message: 'Interrumpido'
                                    }
                                ]
                            });
                        }
                    }
                }
            }, {
                concurrency: 1
            });


            let errorMessage = '';
            let errorsAmount = 0;
            if (errors.length) {
                for (let k = 0; k < errors.length; k++) {
                    for (let l = 0; l < errors[k].errors.length; l++) {
                        //errorMessage += errors[k].errors[l].id;
                        errorMessage += '- ' + errors[k].errors[l].message;
                        errorsAmount += 1;
                    }
                    errorMessage += '\n';
                }
            }

            let successMessage = '';

            if (success.length) {
                for (var k = 0; k < success.length; k++) {
                    successMessage += success[k].message + '\n';
                }
            }

            //console.log(errorMessage);
            //console.log(successMessage);
            //console.log(errorsAmount);

            const body = {
                field_1916: success.length,
                field_1917: errorsAmount,
                field_1911: errorMessage,
                field_1910: 'Finished',
            };
            if (dataToWrite.length > 1) {
                const generatedFile = await generateFile(dataToWrite, filename);
                //console.log(generatedFile.file);
                body.field_1918 = generatedFile.file.id;
            }

            try {
                await Knack.update({
                    objectKey: internals.KNACK_OBJECTS_IDS.teImportLog,
                    id: payload.id,
                    body: body
                });
            } catch (error) {
                console.log(error);
            }

            try {
                await sendImportEmail('https://us-api.knack.com/v1/pages/page_1303/views/view_3208/records/', payload.id);

                // code to update the update on field on all records
                try {
                    const objectToUpdate = internals.KNACK_OBJECTS_IDS.teImportLog; //'object_54',
                    const idToUpdate = payload.id;
                    let objects = {
                        [internals.KNACK_OBJECTS_IDS.teImportLog]: "field_1968", // T&E Import Log
                    }
                    const updatedDate = new Date();

                    if (objects[objectToUpdate]) {

                        await Knack.update({
                            objectKey: objectToUpdate,
                            id: idToUpdate,//   Supplier ID 5  Supplier Jheidy Soluntech         5
                            body: { [objects[objectToUpdate]]: updatedDate }
                        });

                    }

                } catch (e) {
                    console.log('error', e);
                }


            } catch (error) {
                console.error(error);
            }

            return { success, errors };
        };

        const parseCSVLineItems = async (payload, buyer) => {
          let file = await getFileContent(payload);

          return processCsvRowsToLineItems(payload, file, buyer);
        };

        const getFileContent = async (payload) => {
          try {
            const file = await Request({
              uri: payload.field_1486_raw.url,
              method: "GET",
              retry: 3,
              accepted: [400, 401, 402, 403, 404, 419],
              delay: 5000,
            });

            return file;
          } catch (error) {
            throw {
              message: `Error getting file content: ${error.message}`,
              list: [error.message],
            };
          }
        };

        const processCsvRowsToLineItems = (payload, file, buyer) => {
          const rowsWithError = [];
          const teLineItemArray = [];

          try {
            let rows = file.split(/\r\n|\r|\n/g).slice(1);

            rows.forEach((row, index) => {
              if (row != "") {
                const cells = CSVtoArray(row);

                if (cells != null && cells.length >= 6) {
                  teLineItemArray.push(createTeLineItem(cells, payload, buyer));
                } else {
                  rowsWithError.push(`Invalid format in row: ${index}`);
                }
              }
            });

            return teLineItemArray;
          } catch (error) {
            throw {
              message: `Error getting rows: ${error.message}`,
              list: rowsWithError,
            };
          }
        };

        const createTeLineItem = (cells, payload, buyer) => {
            try {
                return {
                    mappingId: cells[0].trim(),
                    billType: cells[1].trim(),
                    workShift: cells[2].trim(),
                    hoursWorked: cells[3].trim(),
                    dateWorked: cells[4].trim()
                        ? Moment(cells[4].trim(), "MM/DD/YYYY", true).format(
                            "MM/DD/YYYY"
                        )
                        : "",
                    costCenter: cells[5].trim(),
                    createdBy: payload.field_1485_raw[0].id,
                    importLog: payload.id,
                    buyer: buyer,
                };
            } catch (error) {
                throw new Error(error);
            }
        };



        const checkCSVerrorsLineItems = (parsedCsv) => {
            let errorList = [];
            const validbillTypes = ['RT', 'OT', 'DT', 'VAC', 'SICK', 'HOL', 'PERS', 'OTH'];

            try {
                const addError = (condition, message) => {
                    if (condition) {
                        errorList.push(message);
                    }
                }
                for (let row of parsedCsv) {
                    addError(!row.mappingId, "At least one row does not have mapping ID, Mapping ID cannot be blank");
                    addError(!row.hoursWorked, "At least one row does not have hours Worked, hours Worked cannot be blank");
                    addError(isNaN(parseFloat(row.hoursWorked)), "At least one row contains invalid characters in hours Worked, hours Worked must be a number using '.' as a decimal separator");
                    addError(parseFloat(row.hoursWorked) < -24 || parseFloat(row.hoursWorked) > 24, "At least one row contains hours worked higher than 24 or lower than -24. Total hours must be greater than -24 and less than or equal to 24.");
                    addError(!row.billType, "At least one row does not have Bill Type, Bill Type cannot be blank");
                    addError(!validbillTypes.includes(row.billType), "At least one row have an invalid Bill Type, make sure that the Bill Type is one of the following: 'RT', 'OT', 'DT', 'VAC', 'SICK', 'HOL', 'PERS', 'OTH'");
                    addError(!row.dateWorked, "At least one row does not have date Worked, date Worked cannot be blank");
                    addError(row.dateWorked == "Invalid date", "At least one row have an invalid format in the date Worked, make sure that the date format follow MM/DD/YYYY");
                    addError(Moment(row.dateWorked).isAfter(), "At least one row have a Date worked as a future date, Date worked cannot be a future date.");
                }

                errorList = [...new Set(errorList)];

                if (errorList.length > 0) throw new Error("found errors during CSV validation");
            } catch (error) {
                throw {
                    message: "CSV File contains errors:" + error.message,
                    list: errorList,
                };
            }
        };

        const processCSVFileLineItems = async (teLineItemArray, payload) => {
            payload = payload.record;
            let success = 0;
            const successKnackResponse = [];
            const errors = [];
            let errorCode = 200;
            var dataToWrite = [{
                mappingId: 'Mapping ID', billType: 'Bill TYpe (MC)', workShift: 'Work Shift (MC)', hoursWorked: 'Total Hours (number)',
                dateWorked: 'Date Worked', cost_center: 'Cost Center', errorId: 'Error ID', errorMessage: 'Error Description'
            }];
            const billTypes = ['RT', 'OT', 'DT', 'VAC', 'SICK', 'HOL', 'PERS', 'OTH'];

            await Promise.map(teLineItemArray, async (teLineItem) => {

                // console.log('Processing => ', teLineItem.mappingId, teLineItem.billType, teLineItem.dateWorked);
                var row = {
                    mappingId: teLineItem.mappingId,
                    billType: teLineItem.billType,
                    workShift: teLineItem.workShift,
                    hoursWorked: teLineItem.hoursWorked,
                    dateWorked: teLineItem.dateWorked,
                    cost_center: teLineItem.costCenter
                };

                const contract = async (tofind, dateWorked) => {
                    if (tofind) {

                        let response = await Knack.find({
                            objectKey: internals.KNACK_OBJECTS_IDS.Contract,
                            filters: [{ field: "field_1445", operator: "is", value: tofind }]
                        });

                        var response1 = response.records.length ? response.records[0] : null
                        if (!response1) {
                            response = { id: '-1' };
                            return response
                        }
                        response = response.records.find((c) => {

                            let startDateS = Moment(c.field_602, "L");
                            let endDateS = Moment(c.field_603, "L");
                            if (Moment(dateWorked).isBetween(startDateS, endDateS, "days", "[]")) {
                                return c;
                            }
                        });
                        if (!response) {
                            response = { id: '-2' };
                        }
                        return response;
                    } else {
                        return { id: '' };
                    }
                };

                var contractAmendment = async (tofind, dateWorked) => {
                    let response = await Knack.find({
                        objectKey: internals.KNACK_OBJECTS_IDS.contractAmendment,
                        filters: [{ field: "field_1112", operator: "is", value: tofind }]
                    });
                    response = response.records.find((c) => {

                        let startDateS = Moment(c.field_1139, "L");
                        let endDateS = Moment(c.field_1148, "L");
                        if (c.hasOwnProperty('field_1112_raw') && c.field_1112_raw.length > 0 && Moment(dateWorked).isBetween(startDateS, endDateS, "days", "[]")) {

                            return c.field_1112_raw[0].id == tofind;
                        }
                    });
                    response = response ? response : { id: '' };
                    return response;
                };

                var findCostCenter = (toFind, isUsingAmendmet) => {
                    if (toFind) {
                        let costcenters;
                        if (isUsingAmendmet) {
                            costcenters = teLineItem.contractAmendment.field_1089_raw;
                        } else {
                            costcenters = teLineItem.contract.field_494_raw;
                        }
                        if (costcenters) {
                            var found = costcenters.find(cc => cc.identifier.trim() == toFind.trim());
                            found = found !== undefined ? found : { id: '-1' }
                            return found;
                        } else {
                            return { id: '-1' };
                        }
                    } else {
                        return { id: '' };
                    }
                }

                const contract1 = await contract(teLineItem.mappingId, teLineItem.dateWorked);
                teLineItem.contract = contract1;
                let currentContractUsingAmendments = contract1.field_2224 == "Yes" ? true : false;
                if (currentContractUsingAmendments) {
                    teLineItem.contractAmendment = await contractAmendment(teLineItem.contract.id, teLineItem.dateWorked);
                }

                teLineItem.costCenter = findCostCenter(teLineItem.costCenter, currentContractUsingAmendments);

                var isValidbillType = () => {
                    if (teLineItem.billType) {
                        var found = billTypes.find(bt => bt == teLineItem.billType.toUpperCase());
                        if (found)
                            return true;

                    } else {
                        return true;
                    }
                    return false;
                }

                if (Moment(teLineItem.dateWorked).isAfter()) {
                    row.errorId = 1;
                    row.errorMessage = 'Date worked cannot be a future date.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 1,
                            message: 'Date worked cannot be a future date.'
                        }]
                    });
                }
                else if (!isNaN(parseInt(teLineItem.hoursWorked)) > 0 && !isNaN(parseInt(teLineItem.hoursWorked <= 24))) {
                    row.errorId = 2;
                    row.errorMessage = 'Total hours must be greater than 0 and less than or equal to 24.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 2,
                            message: 'Total hours must be greater than 0 and less than or equal to 24.'
                        }]
                    });
                }
                else if (!isValidbillType()) {
                    row.errorId = 3;
                    row.errorMessage = 'Invalid bill type.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 3,
                            message: 'Invalid bill type.'
                        }]
                    });
                }
                else if (teLineItem.contract.id == '') {
                    row.errorId = 4;
                    row.errorMessage = 'Mapping ID cannot be blank.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 4,
                            message: 'Mapping ID cannot be blank.'
                        }]
                    });
                }
                else if (teLineItem.contract.id == '-1') {
                    row.errorId = 5;
                    row.errorMessage = 'No contract found with matching mapping ID.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 5,
                            message: 'No contract found with matching mapping ID.'
                        }]
                    });
                }
                else if (teLineItem.contract.id == '-2') {
                    row.errorId = 9;
                    row.errorMessage = 'Date worked Outside of the Contract Period.';
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 9,
                            message: 'Date worked Outside of the Contract Period.'
                        }]
                    });
                } else if (teLineItem.contract.field_1739 != 'Yes') {
                    row.errorId = 6;
                    row.errorMessage = 'T&E cannot be added to this contract.'
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 6,
                            message: 'T&E cannot be added to this contract.'
                        }]
                    });
                } else if (teLineItem.contractAmendment && teLineItem.contractAmendment.id == '' && currentContractUsingAmendments) {
                    row.errorId = 7;
                    row.errorMessage = 'No contract amendment found for this date worked.'
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 7,
                            message: 'No contract amendment found for this date worked.'
                        }]
                    });
                } else if (teLineItem.contractAmendment && teLineItem.workShift.split(" ")[2] > teLineItem.contractAmendment.field_1116 && currentContractUsingAmendments) {
                    row.errorId = 9;
                    row.errorMessage = 'The work shift is not one of the options available on the contract amendment for this work day.'
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 9,
                            message: 'The work shift is not one of the options available on the contract amendment for this work day.'
                        }]
                    });
                } else if (teLineItem.workShift.split(" ")[2] > teLineItem.contract.field_796 && !currentContractUsingAmendments) {
                    row.errorId = 9;
                    row.errorMessage = 'The work shift is not one of the options available on the contract for this work day.'
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 9,
                            message: 'The work shift is not one of the options available on the contract for this work day.'
                        }]
                    });

                } else if (teLineItem.costCenter.id == '-1') {
                    row.errorId = 8;
                    row.errorMessage = 'The cost center is not one of the options available on the contract amendment for this work day.'
                    dataToWrite.push(row);
                    errors.push({
                        errors: [{
                            id: 8,
                            message: 'The cost center is not one of the options available on the contract amendment for this work day.'
                        }]
                    });
                }
                else {
                    const body = {};

                    const getTimeBillType = (billType) => {
                        switch (billType) {
                            case "RT":
                                return "Regular Time"
                            case "OT":
                                return "Overtime";
                            case "DT":
                                return "Double Time";
                            case "VAC":
                                return "Vacation"
                            case "SICK":
                                return "Sick"
                            case "HOL":
                                return "Holiday"
                            case "PERS":
                                return "Personal"
                            case "OTH":
                                return "Other"
                        }
                    }
                    body.field_1907 = teLineItem.mappingId;
                    body.field_1906 = teLineItem.billType;
                    body.field_799 = teLineItem.workShift;
                    body.field_486 = teLineItem.hoursWorked;
                    body.field_484 = teLineItem.dateWorked;
                    body.field_1912 = teLineItem.costCenter.identifier;
                    body.field_760 = teLineItem.contract.id;
                    if (teLineItem.contract.hasOwnProperty('field_47_raw') && teLineItem.contract.field_47.length > 0)
                        body.field_1723 = teLineItem.contract.field_47_raw[0].id;
                    if (teLineItem.contract.hasOwnProperty('field_338_raw') && teLineItem.contract.field_338_raw.length > 0)
                        body.field_488 = teLineItem.contract.field_338_raw[0].id;
                    if (teLineItem.contract.hasOwnProperty('field_1327_raw') && teLineItem.contract.field_1327.length > 0)
                        body.field_1329 = teLineItem.contract.field_1327_raw[0].id;

                    if (currentContractUsingAmendments) {
                        body.field_1118 = teLineItem.contractAmendment.id;
                    }

                    body.field_482 = teLineItem.createdBy;
                    body.field_1908 = teLineItem.importLog;
                    body.field_490 = teLineItem.costCenter.id;
                    body.field_487 = getTimeBillType(teLineItem.billType);

                    let contractSupplier = "";
                    if (teLineItem.contract.hasOwnProperty('field_51_raw') && teLineItem.contract.field_51.length > 0) {
                        contractSupplier = teLineItem.contract.field_51_raw[0].id;
                    }


                    let constCenterstoConnect = [];
                    if (teLineItem.contract.field_2224 == "Yes") {
                        if (teLineItem.contractAmendment.hasOwnProperty('field_1089_raw') && teLineItem.contractAmendment.field_1089.length > 0) {
                            constCenterstoConnect = teLineItem.contractAmendment.field_1089_raw;
                        }
                    } else {
                        if (teLineItem.contract.hasOwnProperty('field_494_raw') && teLineItem.contract.field_494_raw.length > 0) {
                            constCenterstoConnect = teLineItem.contract.field_494_raw;
                        }
                    }

                    //console.log(body);
                    try {
                        let successTeline = await Knack.create({
                            objectKey: internals.KNACK_OBJECTS_IDS.lineItems,
                            body
                        });

                        successTeline = typeof successTeline == 'string' ? JSON.parse(successTeline) : successTeline;

                        successTeline.contractSupplierID = contractSupplier;
                        successTeline.constCenterstoConnect = constCenterstoConnect;

                        successKnackResponse.push(successTeline);
                        success += 1

                    } catch (catched) {
                        errorCode = catched.statusCode;

                        if (errorCode < 500) {
                            const error = JSON.parse(catched.error);
                            // console.log(error);

                            errors.push({
                                errors: error.errors
                            });
                        } else {
                            errors.push({
                                errors: [
                                    {
                                        message: 'Knack error creating Line Item, try again for this Line Item'
                                    }
                                ]
                            });
                        }
                    }
                }
            }, {
                concurrency: 1
            });
            const responseCreateLineItems = {
                lineItems: successKnackResponse, // array of objects cotaining info of created line items
                datacsvErrors: dataToWrite, // array of objects, containing info of contracts with errors (data to write errors csv)
                numberImportedSuccessfully: success, // number of imported line items
                errorArray: errors // errors contaning message of reason of error (to include in email error message)
            }
            return responseCreateLineItems;
        };

        const createTimecardsFromLineItems = async (importedteLineItems, payload) => {

            const createTimeCardsApproved = payload.record.field_2243_raw

            let distinctSets = [...new Set(importedteLineItems.map(function (x) {
                return JSON.stringify({ contract: x.field_760_raw[0].id, periodStartDate: x.field_849 })
            }))];

            let cardsErrors = 0;

            let cardsCreatedLength = 0;
            // let failedLineItems = [];
            let failedLineItemsLength = 0;
            // let processedLineItem = [];
            let processesLineItemLength = 0
            //console.log(distinctSets);
            await Promise.map(distinctSets, async (distinctSet, index) => {
                var compare = JSON.parse(distinctSet);
                const currentDateTime = Moment(new Date()).format("MM-DD-YYYY HH:mm");
                //console.log("compare",compare);
                var teCard = importedteLineItems.find(function (item) {
                    if (item.field_760_raw[0].id == compare.contract && Moment(item.field_849).isSame(compare.periodStartDate))
                        //teCardToCreate.push(item);
                        return item;
                });
                //console.log("grupo", index, teCardToCreate);

                var body = {};
                // console.log("*****teCard when creating time card: ", JSON.stringify(teCard));
                body.field_440 = teCard.field_1723_raw.length > 0 ? teCard.field_1723_raw[0].id : ''; // buyer
                body.field_376 = teCard.field_488_raw.length > 0 ? teCard.field_488_raw[0].id : ''; // worker
                body.field_1328 = teCard.field_1329.length > 0 ? teCard.field_1329_raw[0].id : ''; // worker profile
                body.field_1844 = teCard.contractSupplierID; // supplier
                body.field_851 = payload.record.field_1485_raw[0].id; // created by account
                var costCenters = [];
                teCard.constCenterstoConnect.forEach((cc) => { //cost centers
                    costCenters.push(cc.id);
                });
                body.field_493 = costCenters;
                body.field_387 = teCard.field_849; // period start date
                body.field_377 = teCard.field_760.length > 0 ? teCard.field_760_raw[0].id : ''; // contract
                body.field_1488 = payload.record.id;

                // submit timecard for approval 

                // REVIEW IF NEEDED
                const timecardsSubmittedThisMonth = await Knack.find({
                    objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
                    filters: [
                        { field: "field_377", operator: "is", value: teCard.field_760_raw[0].id },
                        { field: "field_1787", operator: "is during the current", type: "month", value: "" }
                    ]
                });
                let isfirstInMonth = "No";
                if (timecardsSubmittedThisMonth.records.length == 0) {
                    isfirstInMonth = "Yes";
                }

                body.field_386 = "Under Review - Buyer";
                body.field_1787 = currentDateTime;
                body.field_2200 = isfirstInMonth;

                if (createTimeCardsApproved) {
                    body.field_528 = "Approve"; // approval step 
                    body.field_845 = "62ebe33a4f814200219d6066"; // approved by
                    body.field_386 = "Approved" // time card status
                    body.field_846 = currentDateTime; // date approved
                    // REVIEW IF NEEDED UPDATE CONTRACT
                    try {
                        await Knack.update({
                            objectKey: internals.KNACK_OBJECTS_IDS.Contract,
                            id: body.field_377,
                            body: {
                                field_1404: currentDateTime
                            }
                        })
                    } catch (e) {
                        console.log("error updating timecard last submitted date contracts")
                    }
                }

                try {
                    var successTeCard = await Knack.create({
                        objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
                        body: body
                    });

                    successTeCard = JSON.parse(successTeCard);
                    // console.log("****New time card created: ", successTeCard)
                    // cardsCreated.push(successTeCard);
                    cardsCreatedLength += 1

                } catch (catched) {
                    // console.log("Error creating Card");
                    // console.log(JSON.parse(catched.error));
                    cardsErrors += 1;
                }

                // await SetTECard(importedteLineItems, successTeCard);

                if (successTeCard) {
                    await Promise.map(importedteLineItems, async (teLineItem) => {
                        if (teLineItem.field_760_raw[0].id == compare.contract && Moment(teLineItem.field_849).isSame(compare.periodStartDate)) {
                            // console.log("card", successTeCard.field_1890, successTeCard.id);
                            try {
                                // processedLineItem.push({ lineItemId: teLineItem.id });
                                // console.log("updating ==>", teLineItem.field_514, teLineItem.id);
                                await Knack.update({
                                    objectKey: internals.KNACK_OBJECTS_IDS.lineItems,
                                    id: teLineItem.id,
                                    body: {
                                        field_481: successTeCard.id
                                    }
                                })
                                processesLineItemLength += 1

                            } catch (catched) {

                                failedLineItemsLength += 1
                            }
                        }
                    }, {
                        concurrency: 1
                    });
                    if (createTimeCardsApproved) {
                        sendEmailFromForm("view_3889", "scene_415", successTeCard.id);
                    }
                } else {
                    for (let lineitem of importedteLineItems) {
                        if (lineitem.field_760_raw[0].id == compare.contract && Moment(lineitem.field_849).isSame(compare.periodStartDate)) {
                            failedLineItemsLength += 1
                        }
                    }
                }
            }, {
                concurrency: 1
            });

            // return number of timecards created, number of timecards failed, number of line items processed, numbre of line items failed to process
            const result = {
                createdTimeCards: cardsCreatedLength,
                failedTimeCards: cardsErrors,
                processedLineItems: processesLineItemLength,
                failedProcessedLineItems: failedLineItemsLength
            }
            return result
        }

        const sendEmailFromForm = async (
            view_key,
            scene_key,
            id,
        ) => {

            try {
                const options = {
                    uri: `https://us-api.knack.com/v1/pages/${scene_key}/views/${view_key}/records/${id}`,
                    method: "PUT",
                    headers: {
                        "X-Knack-Application-ID": process.env.KNACK_APP_ID,
                        "X-Knack-REST-API-Key": process.env.KNACK_API_KEY,
                    },
                    retry: 3,
                    accepted: [400, 404, 401, 403],
                    delay: 5000,
                };

                await Request(options);

            } catch (e) {

                console.log(
                    `Error sending email to worker: ${id}`);
            }

        }

        const createTimeCardsImport = async (teLineItemArray, payload) => {
            // create line items and return array of created line items, array of errors line items, number of success, number of errors
            const lineItemsCreationResponse = await processCSVFileLineItems(teLineItemArray, payload);

            const successfullyCreatedLineItems = lineItemsCreationResponse.lineItems;
            const dataToWriteErrorsCsv = lineItemsCreationResponse.datacsvErrors;
            const numberOfLineItemsImported = lineItemsCreationResponse.numberImportedSuccessfully;
            const errorsArrayToMessage = lineItemsCreationResponse.errorArray;
            const numberOfFailedLineItems = errorsArrayToMessage.length;

            // create timecards from line items (based on timecards creation condifion status), return number of errors
            const createTimeCardsResponse = await createTimecardsFromLineItems(successfullyCreatedLineItems, payload)
            const numberoftiemcardsCreated = createTimeCardsResponse.createdTimeCards;
            const numberOfFailedTimeCards = createTimeCardsResponse.failedTimeCards;
            const numberOfProcesedLineItems = createTimeCardsResponse.processedLineItems;
            const numberOfFailedProcessedLineItems = createTimeCardsResponse.failedProcessedLineItems;

            // prepare line items error csv file
            let errorMessage = '';
            if (errorsArrayToMessage.length) {
                for (let k = 0; k < errorsArrayToMessage.length; k++) {
                    for (let l = 0; l < errorsArrayToMessage[k].errors.length; l++) {
                        //errorMessage += errors[k].errors[l].id;
                        errorMessage += '- ' + errorsArrayToMessage[k].errors[l].message;
                    }
                    errorMessage += '\n';
                }
            }

            const body = {
                field_1916: numberOfLineItemsImported,
                field_1917: numberOfFailedLineItems,
                field_1911: errorMessage,
                field_1910: 'Finished',
                field_2244: numberoftiemcardsCreated, // # of timecards created change in prod field
                field_2245: numberOfFailedTimeCards, // # of timecards failed change in prod field
                field_2246: numberOfFailedProcessedLineItems, // # of line items created without timecard change in prod field
                field_2247: numberOfProcesedLineItems // # of line items created with timecards change in prod field
            };

            const filename = payload.record.field_1486_raw.filename;

            if (dataToWriteErrorsCsv.length > 1) {
                const generatedFile = await generateFile(dataToWriteErrorsCsv, filename);
                //console.log(generatedFile.file);
                body.field_1918 = generatedFile.file.id;
            }

            try {
                await Knack.update({
                    objectKey: internals.KNACK_OBJECTS_IDS.teImportLog,
                    id: payload.record.id,
                    body: body
                });
            } catch (error) {
                console.log(error);
            }

            // send termination email with information of number of error in both processes, number of success in both processes, and error file if needed
            try {
                await sendImportEmail('https://us-api.knack.com/v1/pages/page_1303/views/view_3208/records/', payload.record.id);

                // code to update the update on field on all records
                try {
                    const objectToUpdate = internals.KNACK_OBJECTS_IDS.teImportLog; //'object_54',
                    const idToUpdate = payload.record.id;
                    let objects = {
                        [internals.KNACK_OBJECTS_IDS.teImportLog]: "field_1968", // T&E Import Log
                    }
                    const updatedDate = new Date();

                    if (objects[objectToUpdate]) {

                        await Knack.update({
                            objectKey: objectToUpdate,
                            id: idToUpdate,//   Supplier ID 5  Supplier Jheidy Soluntech         5
                            body: { [objects[objectToUpdate]]: updatedDate }
                        });

                    }

                } catch (e) {
                    console.log('error', e);
                }
            } catch (error) {
                console.error(error);
            }
        }

        server.route({
          method: "POST",
          path: "/import-expense-cards-csv",
          handler: importsController.importTimeExpenseCards,
          config: {
            timeout: {
              socket: 9000000,
            },
            pre: [{ method: KnackAuth.authenticate_knack }],
          },
        });

        server.route({
          method: "POST",
          path: "/csv",
          handler: async function (request, h) {
            const payload = request.payload;
            try {
                const csvParsed = await parseCSVLineItems(payload.record, payload.buyer);

                checkCSVerrorsLineItems(csvParsed);

                createTimeCardsImport(csvParsed, payload);

                return {
                    status: "ok",
                    message:
                    "Processing file, you will receive an email once the process has finished",
                };
            } catch (error) {
                console.error(error.message);

                deleteImportLogByID(payload.record.id)

                return {
                    status: "error",
                    message: error.list,
                };
            }
          },
          config: {
            timeout: {
              socket: 9000000,
            },
            pre: [{ method: KnackAuth.authenticate_knack }],
          },
        });

        const deleteImportLogByID = async (id) => {
            await Knack.delete({
                objectKey: internals.KNACK_OBJECTS_IDS.teImportLog,
                id,
            });
        }

        const submitTimeandExpensecard = async (request) => {

            const importedteLineItems = request.payload.records;
            //console.log("payload",importedteLineItems, request.payload.userId);

            let distinctSets = [...new Set(importedteLineItems.map(function (x) {
                return JSON.stringify({ contract: x.field_760_raw[0].id, periodStartDate: x.field_849 })
            }))];

            // let cardsCreated = [];
            let cardsCreatedLength = 0;
            // let failedLineItems = [];
            let failedLineItemsLength = 0;
            // let processedLineItem = [];
            let processesLineItemLength = 0
            //console.log(distinctSets);
            await Promise.map(distinctSets, async (distinctSet, index) => {
                var compare = JSON.parse(distinctSet);
                //console.log("compare",compare);
                var teCard = importedteLineItems.find(function (item) {
                    if (item.field_760_raw[0].id == compare.contract && Moment(item.field_849).isSame(compare.periodStartDate))
                        //teCardToCreate.push(item);
                        return item;
                });
                //console.log("grupo", index, teCardToCreate);

                var body = {};
                // console.log("*****teCard when creating time card: ", JSON.stringify(teCard));
                body.field_440 = teCard['field_760.field_47_raw'].length > 0 ? teCard['field_760.field_47_raw'][0].id : '';
                body.field_376 = teCard['field_760.field_338_raw'].length > 0 ? teCard['field_760.field_338_raw'][0].id : '';
                body.field_1328 = teCard['field_1329'].length > 0 ? teCard['field_1329_raw'][0].id : '';
                body.field_1844 = teCard['field_760.field_51_raw'].length > 0 ? teCard['field_760.field_51_raw'][0].id : '';
                body.field_851 = request.payload.userId;
                var costCenters = [];
                teCard['field_760.field_494_raw'].forEach((cc) => {
                    costCenters.push(cc.id);
                });
                body.field_493 = costCenters;
                body.field_387 = teCard.field_849;
                body.field_377 = teCard.field_760_raw.length > 0 ? teCard.field_760_raw[0].id : '';
                body.field_1960 = request.payload.processLogId;

                try {
                    var successTeCard = await Knack.create({
                        objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
                        body: body
                    });

                    successTeCard = JSON.parse(successTeCard);
                    // console.log("****New time card created: ", successTeCard)
                    // cardsCreated.push(successTeCard);
                    cardsCreatedLength += 1

                } catch (catched) {
                    // console.log("Error creating Card");
                    console.log(JSON.parse(catched.error));
                }

                // await SetTECard(importedteLineItems, successTeCard);

                if (successTeCard) {
                    await Promise.map(importedteLineItems, async (teLineItem) => {
                        if (teLineItem.field_760_raw[0].id == compare.contract && Moment(teLineItem.field_849).isSame(compare.periodStartDate)) {
                            // console.log("card", successTeCard.field_1890, successTeCard.id);
                            try {
                                // processedLineItem.push({ lineItemId: teLineItem.id });
                                processesLineItemLength += 1
                                // console.log("updating ==>", teLineItem.field_514, teLineItem.id);
                                await Knack.update({
                                    objectKey: internals.KNACK_OBJECTS_IDS.lineItems,
                                    id: teLineItem.id,
                                    body: {
                                        field_481: successTeCard.id
                                    }
                                })

                            } catch (catched) {
                                // console.log("Error updating T&E Line Item");
                                // console.log(JSON.parse(catched.error));
                                // failedLineItems.push(JSON.parse(catched.error))
                                failedLineItemsLength += 1
                            }
                        }
                    }, {
                        concurrency: 1
                    });
                }
            }, {
                concurrency: 1
            });

            try {
                await Knack.update({
                    objectKey: internals.KNACK_OBJECTS_IDS.processLog,
                    id: request.payload.processLogId,
                    body: {
                        field_1962: cardsCreatedLength,
                        field_1958: failedLineItemsLength,
                        field_1957: processesLineItemLength,
                        field_1955: 'Finished'
                    }
                });

            } catch (error) {
                console.log(error);
            }

            try {

                await sendImportEmail('https://us-api.knack.com/v1/pages/page_1318/views/view_3260/records/', request.payload.processLogId);

            } catch (error) {

                console.error(error);
            }


        }



        // time and expense card creation
        server.route({
            method: 'POST',
            path: '/tecard',
            handler: async function (request, h) {

                submitTimeandExpensecard(request);

                return {
                    status: 'ok',
                    message: 'Creating T&E Card'
                };
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });

        // add proposal route
        server.route({
            method: 'POST',
            path: '/addproposal',
            handler: async function (request, h) {

                const proposal = request.payload.proposalToCreate;
                const proplenght = proposal.field_1969_raw.length;
                //console.log(proposal);
                //console.log("fdddddddddd", proposal.field_751)
                await Promise.map(proposal.field_1969_raw, async (worker, index) => {
                    if (index == proplenght - 1) {
                        try {
                            await Knack.update({
                                objectKey: internals.KNACK_OBJECTS_IDS.proposalObject,
                                id: proposal.id,
                                body: {
                                    field_309: worker.id,
                                }
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        try {
                            await Knack.create({
                                objectKey: internals.KNACK_OBJECTS_IDS.proposalObject,
                                body: {
                                    field_102: proposal.field_102_raw.length > 0 ? proposal.field_102_raw[0].id : "",
                                    field_873: proposal.field_873,
                                    field_1246: proposal.field_1246,
                                    //field_105: proposal.field_105_raw.id,
                                    //field_270: proposal.field_270_raw.id, // revisar
                                    //field_271: proposal.field_271_raw.id,
                                    field_107: proposal.field_107_raw,
                                    field_272: proposal.field_272_raw,
                                    field_302: proposal.field_302_raw,
                                    field_721: proposal.field_721_raw,
                                    field_1903: proposal.field_1903_raw,
                                    field_884: proposal.field_884_raw,
                                    field_309: worker.id,
                                    field_322: request.payload.userId,
                                    field_103: proposal.field_103_raw.length > 0 ? proposal.field_103_raw[0].id : "",
                                    field_276: request.payload.userId,
                                    field_214: proposal.field_214,
                                    field_276: proposal.field_276_raw.length > 0 ? proposal.field_276_raw[0].id : "",
                                    field_677: proposal.field_677_raw[0].id,
                                    field_1266: proposal.field_1266_raw.length > 0 ? proposal.field_1266_raw[0].id : "",
                                    field_751: proposal.field_751 == '' ? 0 : proposal.field_751,
                                    field_754: proposal.field_754 == '' ? 0 : proposal.field_754,
                                    field_752: proposal.field_752 == '' ? 0 : proposal.field_752,
                                    field_755: proposal.field_755 == '' ? 0 : proposal.field_755,
                                    field_753: proposal.field_753 == '' ? 0 : proposal.field_753,
                                    field_756: proposal.field_756 == '' ? 0 : proposal.field_756,
                                    field_757: proposal.field_757 == '' ? 0 : proposal.field_757,
                                    field_758: proposal.field_758 == '' ? 0 : proposal.field_758,
                                    field_759: proposal.field_759 == '' ? 0 : proposal.field_759,
                                    field_870: proposal.field_870,
                                    field_1449: proposal.field_1449,
                                    field_1072: proposal.field_1072
                                }
                            });

                        } catch (catched) {
                            //console.log("Error creating Card");
                            //console.log(JSON.parse(catched.error));

                            let error;

                            try {
                                error = catched.error ? JSON.parse(catched.error) : 'Unexpected error creating Card'
                                console.error(`Error creating creating Card`);
                                console.error(error);
                                console.error('-------------------------------------------------------------');
                            } catch (e) {
                                console.error(catched);
                            }
                        }
                    }
                }, {
                    concurrency: 1
                })

                return {
                    status: 'ok',
                    message: 'Proposals created'
                };
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    //{ method: KnackAuth.authenticate_knack }
                ]
            }
        });

        // function to send simple emails from notification object 
        const sendEmailFromNotification = async (message, email, subject, scene_key, view_key) => {
            // let scene_key = "scene_1406"; // change in prod
            // let view_key = "view_3556"; // change in prod
            //let scene_key = "scene_1414"; // change in prod
            //let view_key = "view_3573"; // change in prod
            let date = Moment(new Date()).format("MM-DD-YYYY HH:mm");
            let form = {
                field_1778: email,
                field_1780: date,
                field_1776: subject,
                field_1779: message
            };
            const options = {
                uri: `https://us-api.knack.com/v1/pages/${scene_key}/views/${view_key}/records`,
                method: 'POST',
                form: form,
                headers: {
                    'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                    'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                },
                retry: 3,
                accepted: [400, 404, 401, 403],
                delay: 5000
            };
            return Request(options);
        };
        // route to delete a line
        const deleteLineItemFunction = async (payload, email) => {
            let lineitemsDeleted = 0;
            let lineitemsError = 0;
            await Promise.map(payload, async (lineItem) => {

                try {
                    await Knack.delete({
                        objectKey: internals.KNACK_OBJECTS_IDS.lineItems,
                        id: lineItem.id

                    });
                    lineitemsDeleted++;
                } catch (error) {
                    console.log(error);
                    lineitemsError++;
                }

            }, {
                concurrency: 1
            });
            try {
                if (lineitemsError != 0) {
                    let message = `Conexis has deleted ${lineitemsDeleted} Line Items successfully, but ${lineitemsError} Line Items could not be deleted. 
                    Please go back to the page and try again the deletion of these recors.`;
                    await sendEmailFromNotification(message, email, "Line Items Deletion Error", "scene_1406", "view_3556")
                } else {
                    let message = `Conexis has deleted ${lineitemsDeleted} Line Items successfully`
                    await sendEmailFromNotification(message, email, "Line Items Deletion Finished", "scene_1406", "view_3556")
                }
            } catch (e) {
                console.log("error sending emails deletion line items: ", e)
            }
        };
        server.route({
            method: 'DELETE',
            path: '/deletelineitem',
            handler: async function (request, h) {

                let payload = request.payload;
                let records = payload.records;
                //console.log("payload: ", payload);

                deleteLineItemFunction(records, payload.loggedInEmail);

                return {
                    status: 'ok',
                    message: 'Items deleted.'
                };
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });

        server.route({
            method: 'GET',
            path: '/status',
            handler: async function (request, h) {
                return {
                    status: 'ok',
                };
            },
            config: {
                timeout: {
                    socket: 9000000
                }
            }
        });

        // convert proposals route 
        server.route({
            method: 'POST',
            path: '/convert-proposals-bulk',
            handler: async function (request, h) {

                let payload = request.payload;
                //console.log(payload);
                let processed_records = 0;
                let processed_errors = 0;
                Promise.map(payload.proposals, async (proposal) => {

                    try {
                        let payload_update_proposal = proposal.payload;

                        if (payload.type == "approve") {
                            let options = {
                                uri: 'https://us-api.knack.com/v1/pages/scene_1355/views/view_3393/records',
                                method: 'POST',
                                form: payload_update_proposal,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Knack-Application-Id': process.env.KNACK_APP_ID,
                                    'X-Knack-REST-API-KEY': 'knack',
                                    'Authorization': payload.token
                                },
                                retry: 3,
                                accepted: [400, 404, 401, 403],
                                delay: 5000
                            };
                            await Request(options);
                            processed_records = processed_records + 1;
                        } else if (payload.type == "reject") {
                            let options_reject = {
                                uri: 'https://us-api.knack.com/v1/pages/scene_1350/views/view_3375/records/' + proposal.id_proposal,
                                method: 'PUT',
                                form: payload_update_proposal,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Knack-Application-Id': process.env.KNACK_APP_ID,
                                    'X-Knack-REST-API-KEY': 'knack',
                                    'Authorization': payload.token
                                },
                                retry: 3,
                                accepted: [400, 404, 401, 403],
                                delay: 5000
                            };

                            await Request(options_reject);
                            processed_records = processed_records + 1;

                            // code to update the update on field on all records
                            try {
                                const objectToUpdate = internals.KNACK_OBJECTS_IDS.proposalObject;//'object_12'
                                const idToUpdate = proposal.id_proposal;
                                let objects = {
                                    [internals.KNACK_OBJECTS_IDS.proposalObject]: "field_2268",//proposals
                                }
                                const updatedDate = new Date();

                                if (objects[objectToUpdate]) {

                                    await Knack.update({
                                        objectKey: objectToUpdate,
                                        id: idToUpdate,//   Supplier ID 5  Supplier Jheidy Soluntech         5
                                        body: { [objects[objectToUpdate]]: updatedDate }
                                    });

                                }

                            } catch (e) {
                                console.log('error', e);
                            }
                        }
                    } catch (error) {
                        console.log(error);
                        processed_records = processed_records + 1;
                        processed_errors = processed_errors + 1;
                    }
                }, {
                    concurrency: 1
                }).then(async function () {
                    try {
                        let payload_new_log = {
                            field_1957: processed_records,
                            field_1958: processed_errors
                        };
                        let options = {
                            uri: 'https://us-api.knack.com/v1/pages/scene_1318/views/view_3260/records/' + payload.id_log,
                            method: 'PUT',
                            form: payload_new_log,
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Knack-Application-Id': process.env.KNACK_APP_ID,
                                'X-Knack-REST-API-KEY': 'knack',
                                'Authorization': payload.token
                            },
                            retry: 3,
                            accepted: [400, 404, 401, 403],
                            delay: 5000
                        };
                        await Request(options);
                    } catch (e) {
                        console.log("error updating process log");
                        console.log(e);
                    }
                });
                return {
                    status: 'ok',
                    message: 'process running'
                };
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });

        // route to know if the process is running
        server.route({
            method: 'GET',
            path: '/is_process_runing',
            handler: async function (request, h) {
                try {
                    let found = await CheckProcess.actual_status();
                    return found;
                } catch (e) {
                    console.log(e);
                    return { status: "fail", error: 'Unexpected error on request.' }
                }
            },
            config: {
                timeout: {
                    socket: 9000000
                }
            }
        });

        // process contracts bulk process
        server.route({
            method: 'POST',
            path: '/convert-contracts-bulk',
            handler: async function (request, h) {
                // console.log("inside convert contracts bulk");
                // console.log("covert contracts bulk payload: ", request.payload);
                await CheckProcess.change_status();
                let payload = request.payload;
                processingContracts(payload);
                return { "success": "server runing" };
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack },
                ]
            }
        });
        // function to process all the contracts
        async function processingContracts(payload) {
            // console.log("process running in server processing contratcs running")
            let succesContracts = [];
            let errorContracts = [];
            let errors = "";
            var processed_records = 0;
            var processed_errors = 0;
            let contracts_processed = 0;
            if (payload.contracts) {
                console.log(payload.contracts.length, " contracts are going to be processed")
                const startedTime = Moment(new Date()).subtract(5, "hours").format("MM-DD-YYYY HH:mm");
                await Promise.map(payload.contracts, async (contract) => {
                    contracts_processed += 1;
                    // console.log("procesing contract: ", contract.id_contract, " contador: ", contracts_processed)
                    try {
                        let current_contract_user_id = contract.user_id;

                        var payload_update_contract = contract.payload;
                        const usingAmendments = contract.usingAmendments == "No" ? false : true;
                        let uri = usingAmendments == true ? "https://api.knack.com/v1/pages/scene_1085/views/view_2510/records/" : "https://api.knack.com/v1/pages/scene_1085/views/view_3759/records/";
                        const options = {
                            uri: uri + contract.id_contract,
                            method: 'PUT',
                            json: true,
                            form: payload_update_contract,
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Knack-Application-Id': process.env.KNACK_APP_ID,
                                'X-Knack-REST-API-KEY': 'knack',
                                'Authorization': payload.token
                            },
                            retry: 3,
                            accepted: internals.acceptedErrorCodes(),
                            delay: 5000,
                            verbose_logging: true
                        };
                        // console.log("payload_update_contracts: ", payload_update_contract)
                        await Request(options);
                        // console.log("current contract process successfully")
                        processed_records = processed_records + 1;
                        succesContracts.push(current_contract_user_id);


                        // code to update the update on field on all records
                        try {
                            const objectToUpdate = internals.KNACK_OBJECTS_IDS.Contract;  //'object_6'
                            const idToUpdate = contract.id_contract;
                            let objects = {
                                [internals.KNACK_OBJECTS_IDS.Contract]: "field_2264",//contracts
                            }
                            const updatedDate = new Date();

                            if (objects[objectToUpdate]) {

                                await Knack.update({
                                    objectKey: objectToUpdate,
                                    id: idToUpdate,//   Supplier ID 5  Supplier Jheidy Soluntech         5
                                    body: { [objects[objectToUpdate]]: updatedDate }
                                });

                            }

                        } catch (e) {
                            console.log('error', e);
                        }
                    } catch (error) {
                        console.log("current contract error processing: ", contracts_processed)
                        console.log(error);
                        processed_records = processed_records + 1;
                        processed_errors = processed_errors + 1;
                        errors = error;
                        errorContracts.push(current_contract_user_id);
                    }
                }, {
                    concurrency: 1
                });
                console.log("number of total contracts processed: ", contracts_processed)
                let createdBy = payload.createdBy;

                try {
                    console.log("changing local mongo variable")
                    await CheckProcess.change_status();
                } catch (e) {
                    console.log("error saving on mongo when changing status after process contracts: ", e);
                }
                console.log("error contracts: ", errorContracts.length);
                console.log("success contracts: ", succesContracts.length);
                if (processed_errors > 0) {
                    console.log("seding email error contracts")
                    sendProcessEmail(createdBy, "Error creating the following contracts: " + errorContracts + ". Please resubmit these contracts", startedTime);
                    return errors;
                }

                console.log("success email send");
                sendProcessEmail(createdBy, "Conexis has completed the Contract Approval process successfully. You can now return to the contract approval screen and start a new process.", startedTime);
                return {
                    status: 'ok',
                    processed_records: processed_records,
                    processed_errors: processed_errors
                };
            } else {
                return { "error": "Empty Data." }
            }
        }
        // function to sell email when contracts process finish
        const sendProcessEmail = async (createdBy, message, startedTime) => {
            let scene_key = SEND_PROCESS_EMAIL_SCENE;
            let view_key = SEND_PROCESS_EMAIL_VIEW;

            let endTime = Moment(new Date()).subtract(5, "hours").format("MM-DD-YYYY HH:mm");

            let form = {};
            form[SEND_PROCESS_EMAIL_FIELDS.fieldCreatedby] = createdBy;
            form[SEND_PROCESS_EMAIL_FIELDS.fieldMessage] = message;
            form[SEND_PROCESS_EMAIL_FIELDS.fieldStartedTime] = startedTime;
            form[SEND_PROCESS_EMAIL_FIELDS.fieldEndTime] = endTime;

            const options = {
                uri: `https://us-api.knack.com/v1/pages/${scene_key}/views/${view_key}/records`,
                method: 'POST',
                form: form,
                headers: {
                    'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                    'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                },
                retry: 3,
                accepted: [400, 404, 401, 403],
                delay: 5000
            };

            return Request(options);
        };

        // route to submit time cards
        server.route({
            method: 'POST',
            path: '/submitTimeCard',
            handler: async (request, h) => {
                const { payload: { contractAmendments } } = request;
                const { payload: { cardLineItems } } = request;

                var check = 0;
                for (var cardLine of cardLineItems) {
                    if (cardLine.field_495.length != 0) {
                        check++; // 
                    }
                }
                // check = 1; //Test variable
                if (check == 0) {
                    let errUpdating = false;

                    let newCounter = 0;
                    for (var cardLine of cardLineItems) {
                        let dateWorked = Moment(cardLine.field_484, "L");

                        for (var contract of contractAmendments) {
                            let startDateS = Moment(contract.field_1139, "L");
                            let endDateS = Moment(contract.field_1148, "L");
                            if (Moment(dateWorked).isBetween(startDateS, endDateS, "days", "[]")) {
                                try {
                                    await Knack.update({
                                        objectKey: internals.KNACK_OBJECTS_IDS.lineItems,
                                        id: cardLine.id,
                                        body: {
                                            field_1118: contract.id
                                        }
                                    });
                                } catch (e) {
                                    errUpdating = true;
                                    // console.error(e.errors);
                                }
                            }
                        }
                    }
                    // errUpdating=true; //Test variable
                    if (errUpdating) {
                        return {
                            status: 'partial_fail',
                            error: "One or more of the items on the table failed to update correctly."
                        };
                    }

                    return {
                        status: 'ok'
                    };
                } else {
                    return {
                        status: 'fail',
                        error: "Please delete all Line Items with invalid date ranges before submitting for approval."
                    };
                }
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });


        // feature con-61 contract creation with csv start
        const getAllRecords = async (objectKey, page, filters) => {
            filters = filters || [];
            let response = [];
            let error = false;
            try {
                const result = await Knack.find({
                    objectKey,
                    page,
                    filters
                });

                response = result.records;

                if (result.total_pages > 1 && page <= result.total_pages) {
                    try {
                        const newResonse = await getAllRecords(objectKey, page + 1, filters);
                        console.log('nr', newResonse.length);

                        response = response.concat(newResonse);
                    } catch (err) {
                        console.log('error interno');

                        error = true;
                    }
                }
            } catch (err) {
                console.error('error externo');

                error = true;
            }

            if (error) {
                throw new Error(JSON.stringify({
                    client: 'Knack API',
                    errors: [
                        {
                            message: 'Limite de peticiones excedido.'
                        }
                    ]
                }));
            }

            return response;
        };

        const generateFileContracts = async (dataToWrite, filename) => {

            //const filename = path.join('/tmp', 'output.csv');
            filename = filename.substring(0, filename.lastIndexOf(".")) + "-failed" + filename.substring(filename.lastIndexOf("."));
            //console.log(filename);
            const path = `${filename}`;
            const output = [];
            const titles = {
                mappingId: 'Mapping ID',
                worker: 'Worker',
                supplier: 'Supplier',
                jobOwner: 'Job Owner',
                jobTitle: 'Job Title',
                actualStartDate: 'Actual Start Date',
                plannedEndDate: 'Planned End Date',
                buyer: 'Buyer',
                buyerTaxRate: 'Buyer Tax Rate',
                supplierTaxRate: 'Supplier Tax Rate',
                mspTaxRate: 'MSP Tax Rate',
                costCenters: 'Cost Centers',
                businessUnit: 'Business Unit',
                billRate: 'Bill Rate',
                contractOvertimeRate: 'Contract Overtime Rate',
                contractDoubletimeRate: 'Contract Double Time Rate',
                mspPorcentageFee: 'MSP % Fee',
                basePayRatePerHour: 'Base Pay Rate per Hour',
                errorID: 'Error ID',
                errorDescription: 'Error Description'
            }
            dataToWrite.unshift(titles);
            dataToWrite.forEach((d) => {
                const csvline = [];
                csvline.push(`${d.mappingId}`);
                csvline.push(`${d.worker}`);
                csvline.push(`${d.supplier}`)
                csvline.push(`${d.jobOwner}`);
                csvline.push(`${d.jobTitle}`);
                csvline.push(`${d.actualStartDate}`);
                csvline.push(`${d.plannedEndDate}`);
                csvline.push(`${d.buyer}`)
                csvline.push(`${d.buyerTaxRate}`)
                csvline.push(`${d.supplierTaxRate}`)
                csvline.push(`${d.mspTaxRate}`);
                csvline.push(`${d.costCenters}`)
                csvline.push(`${d.businessUnit}`)
                csvline.push(`${d.billRate}`)
                csvline.push(`${d.contractOvertimeRate}`)
                csvline.push(`${d.contractDoubletimeRate}`)
                csvline.push(`${d.mspPorcentageFee}`)
                csvline.push(`${d.basePayRatePerHour}`)
                csvline.push(`${d.errorID}`)
                csvline.push(`${d.errorDescription}`)
                output.push(csvline.join());
            });

            fs.writeFileSync(path, output.join(os.EOL));

            let uploadResponse;
            try {
                uploadResponse = await Knack.upload({
                    type: 'file',
                    body: {
                        name: filename,
                        files: {
                            value: fs.createReadStream(path),
                            options: {
                                filename,
                                contentType: 'text/csv'
                            }
                        }
                    }
                });

                uploadResponse = JSON.parse(uploadResponse);
            } catch (catched) {

                try {
                    const error = JSON.parse(catched.error);
                    //uploadCode = catched.statusCode;
                    uploadResponse = error;
                } catch (error) {
                    //uploadCode = catched.statusCode;
                    uploadResponse = catched.message;
                }
            }

            fs.unlink(path, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });

            return {
                file: uploadResponse,

            };
        }
        const parseCSVContracts = async (payload) => {
            payload = payload.record;
            const contractsArray = [];
            let errorCode = 200;
            let filecontent = '';
            let importLogID = payload.id;
            try {
                filecontent = await Request({
                    uri: payload.field_2147_raw.url,
                    method: 'GET',
                    retry: 3,
                    accepted: [400, 401, 402, 403, 404, 419],
                    delay: 5000
                });
            } catch (error) {
                errorCode = 500;
            }

            let rows = filecontent.split(/\r\n|\r|\n/g);
            rows = rows.slice(1, rows.length);

            rows.forEach((row) => {

                if (row != '') {
                    const cells = CSVtoArray(row);

                    if (cells != null && cells.length >= 12) {
                        contractsArray.push({
                            mappingId: cells[0].trim(),
                            worker: cells[1].trim(),
                            supplier: cells[2].trim(),
                            jobOwner: cells[3].trim(),
                            jobTitle: cells[4].trim(),
                            actualStartDate: cells[5].trim() ? Moment(cells[5].trim(), 'MM/DD/YYYY', true).format('MM/DD/YYYY') : "",
                            plannedEndDate: cells[6].trim() ? Moment(cells[6].trim(), 'MM/DD/YYYY', true).format('MM/DD/YYYY') : "",
                            buyer: cells[7].trim(),
                            buyerTaxRate: cells[8].trim(),
                            supplierTaxRate: cells[9].trim(),
                            mspTaxRate: cells[10].trim(),
                            costCenters: cells[11].trim(),
                            businessUnit: cells[12].trim(),
                            billRate: cells[13].trim(),
                            contractOvertimeRate: cells[14].trim(),
                            contractDoubletimeRate: cells[15].trim(),
                            mspPorcentageFee: cells[16].trim(),
                            basePayRatePerHour: cells[17].trim(),
                            errorID: cells[18].trim(),
                            errorDescription: cells[19].trim(),
                            contractImportLog: importLogID
                        });
                    } else {
                        errorCode = 500;
                    }
                }
            });
            return contractsArray
        }

        const checkCSVerrors = (parsedCsv) => {

            let errorList = [];
            let mappingIDs = [];
            if (parsedCsv.length == 0) {
                errorList.push("The csv file has format problems, make sure the to use comma as the separator.")
                return errorList
            }

            for (let row of parsedCsv) {
                if (mappingIDs.indexOf(row.mappingId) != -1) {
                    errorList.push(`Mapping ID must be unique. At least two rows have the following mapping ID: ${row.mappingId}`);
                } else {
                    mappingIDs.push(row.mappingId);
                }
                if (!row.mappingId) {
                    errorList.push("At least one row does not have mapping ID, Mapping ID cannot be blank")
                } if (!row.worker) {
                    errorList.push("At least one row does not have worker, worker cannot be blank")
                } if (!row.buyer) {
                    errorList.push("At least one row does not have Buyer, Buyer cannot be blank")
                } if (!row.supplier) {
                    errorList.push("At least one row does not have Supplier, Supplier cannot be blank")
                } if (!row.mspPorcentageFee) {
                    errorList.push("At least one row does not have MSP % Fee, MSP % Fee cannot be blank")
                }

                if (!row.actualStartDate) {
                    errorList.push("At least one row does not have actual start date, actual start date cannot be blank")
                } else if (row.actualStartDate == "Invalid date") {
                    errorList.push("At least one row have an invalid format in the actual start date, make sure that the date format follow MM/DD/YYYY")
                } else if (Moment(row.actualStartDate).isAfter(row.plannedEndDate)) {
                    errorList.push("At least one row have an actual start date that is after the planned end date, Planned end date must be after planned start date.")
                }
                if (!row.plannedEndDate) {
                    errorList.push("At least one row does not have planned end date, planned end date cannot be blank")
                } else if (row.plannedEndDate == "Invalid date") {
                    errorList.push("At least one row have an invalid format in the planned end date, make sure that the date format follow MM/DD/YYYY")
                }

                let decimals = row.billRate.split(".")[1]
                if (isNaN(Number(row.billRate))) {
                    errorList.push("At least one row have letters or symbols in the bill rate, bill rate must be a numerical value")
                } else if (decimals) {
                    if (decimals.length > 2) {
                        errorList.push("At least one row have a bill rate with more than 2 decimals, bill rate cannot have more than 2 decimals")
                    }
                }

            }

            errorList = errorList.filter((item, index) => {
                return errorList.indexOf(item) === index;
            })
            return errorList
        }

        const createdContractsForm = async (parsedCsv, idImportLog, filename, LoggedInBuyer) => {

            let errorList = [];
            let successList = [];
            let recordError = {};
            let recordSucess = {};
            let errorMessages = [];
            let totalErrors = 0;
            let totalSuccess = 0;
            let errors = [];

            const connectionList = await Promise.props({
                'jobOwners': (async () => {

                    let response = [];

                    try {
                        response = await getAllRecords(internals.KNACK_OBJECTS_IDS.Requester, 1);
                    } catch (catched) {
                        errors.push(JSON.parse(catched.message));
                    }

                    return response;
                })(),
                'buyers': (async () => {

                    let response = [];

                    try {
                        response = await getAllRecords(internals.KNACK_OBJECTS_IDS.Buyer, 1);
                    } catch (catched) {
                        errors.push(JSON.parse(catched.message));
                    }

                    return response;
                })(),
                'costCenters': (async () => {

                    let response = [];

                    try {
                        response = await getAllRecords(internals.KNACK_OBJECTS_IDS.costCenters, 1);
                    } catch (catched) {
                        errors.push(JSON.parse(catched.message));
                    }

                    return response;
                })(),
                'businessUnits': (async () => {

                    let response = [];

                    try {
                        response = await getAllRecords(internals.KNACK_OBJECTS_IDS.BusinessUnit, 1);
                    } catch (catched) {
                        errors.push(JSON.parse(catched.message));
                    }

                    return response;
                })(),
                'suppliers': (async () => {

                    let response = [];

                    try {
                        response = await getAllRecords(internals.KNACK_OBJECTS_IDS.Suppliers, 1);
                    } catch (catched) {
                        errors.push(JSON.parse(catched.message));
                    }

                    return response;
                })()
            });

            let errorMessagefinal = '';
            if (errors.length == 0) {

                await Promise.map(parsedCsv, async (newRecord) => {
                    let body = {};
                    let errorResponse = {
                        errors: [],
                        actualMappingID: newRecord.mappingId
                    };
                    let connectionsErros = 0;
                    const connections = await Promise.props({
                        'jobOwner': (async () => {
                            if (newRecord.jobOwner) {
                                let response = connectionList.jobOwners.find((c) => {
                                    return c.field_178.trim().toLowerCase() == newRecord.jobOwner.toLowerCase();
                                });

                                if (response) {
                                    response = response.id;
                                } else {
                                    response = "";
                                    errorResponse.errors.push({ message: "Job owner not found; please review that the data in the file is accurate and complete." })
                                    connectionsErros += 1;
                                }

                                return response;
                            }
                        })(),
                        'buyer': (async () => {
                            let response = connectionList.buyers.find((c) => {
                                return c.field_1.trim().toLowerCase() == newRecord.buyer.toLowerCase();
                            });

                            if (response) {
                                //response = response.id;
                                let id = response.id;
                                let requireApproval = response.field_1416;
                                let usingAmendmend = response.field_2223_raw;
                                response = { id: id, requireApproval: requireApproval, usingAmendmend: usingAmendmend };
                            } else {
                                response = "";
                                errorResponse.errors.push({ message: "Buyer not found; please review that the data in the file is accurate and complete." })
                                connectionsErros += 1;
                            }

                            return response;
                        })(),
                        'costCenters': (async () => {
                            if (newRecord.costCenters) {
                                let response = connectionList.costCenters.find((c) => {
                                    return c.field_252 == newRecord.costCenters;
                                });

                                if (response) {
                                    response = response.id;
                                } else {
                                    response = "";
                                    errorResponse.errors.push({ message: "Cost Center not found; please review that the data in the file is accurate and complete." })
                                    connectionsErros += 1;
                                }

                                return response;
                            }
                        })(),
                        'businessUnit': (async () => {

                            if (newRecord.businessUnit) {
                                let response = connectionList.businessUnits.find((c) => {
                                    return c.field_1576.trim().toLowerCase() == newRecord.businessUnit.toLowerCase();
                                });

                                if (response) {
                                    response = response.id;
                                } else {
                                    response = "";
                                    errorResponse.errors.push({ message: "Business Unit not found; please review that the data in the file is accurate and complete." })
                                    connectionsErros += 1;
                                }

                                return response;
                            }

                        })(),
                        'supplier': (async () => {

                            let response = connectionList.suppliers.find((c) => {
                                return c.field_10.trim().toLowerCase() == newRecord.supplier.toLowerCase();
                            });

                            if (response) {
                                response = response.id;
                            } else {
                                response = "";
                                errorResponse.errors.push({ message: "Supplier not found; please review that the data in the file is accurate and complete." })
                                connectionsErros += 1;
                            }

                            return response;
                        })()
                    });

                    if (connections.buyer.id != LoggedInBuyer) {
                        console.log("validating buyer")
                        errorResponse.errors.push({ message: "The Logged in Buyer does not match with the csv Buyer." })
                        connectionsErros += 1;
                    }

                    // create new worker
                    if (connectionsErros == 0) {
                        try {
                            let lastName = "";
                            for (let i = 1; i < newRecord.worker.split(" ").length; i++) {
                                lastName += newRecord.worker.split(" ")[i];
                            }

                            let workerName = { first: newRecord.worker.split(" ")[0], last: lastName }
                            let bodyWorkerCreation = {
                                field_303: workerName,
                            };
                            if (connections.supplier) bodyWorkerCreation.field_315 = connections.supplier;
                            let newWorker = await Knack.create({
                                objectKey: internals.KNACK_OBJECTS_IDS.Worker,
                                body: bodyWorkerCreation
                            });
                            newWorker = JSON.parse(newWorker);

                            body.field_338 = newWorker.id;
                        } catch (e) {
                            console.log("error creating new worker: ")
                            //const error = JSON.parse(e.error);
                            errorResponse.errors.push({ message: "Error when creating the new worker." })
                            connectionsErros += 1;
                        }
                    }

                    if (connectionsErros > 0) {
                        errorMessages.push(errorResponse);
                        totalErrors += 1;
                        recordError = newRecord;
                        errorList.push(recordError);
                    }


                    // define connections:
                    body.field_1185 = connections.jobOwner;
                    body.field_47 = connections.buyer.id;
                    body.field_494 = connections.costCenters;
                    body.field_1571 = connections.businessUnit;
                    body.field_51 = connections.supplier;

                    // define the rest of the body
                    body.field_1445 = newRecord.mappingId;
                    body.field_696 = newRecord.jobTitle;
                    body.field_602 = newRecord.actualStartDate;
                    body.field_1190 = newRecord.actualStartDate;
                    body.field_54 = newRecord.plannedEndDate;
                    body.field_1432 = "Yes";
                    if (newRecord.buyerTaxRate) {
                        body.field_1437 = newRecord.buyerTaxRate;
                    } if (newRecord.supplierTaxRate) {
                        body.field_1433 = newRecord.supplierTaxRate;
                    }
                    if (newRecord.mspTaxRate) {
                        body.field_1438 = newRecord.mspTaxRate;
                    }
                    body.field_43 = newRecord.billRate
                    if (connections.buyer.requireApproval == "Yes") {
                        body.field_1539 = "No" // activate the contracts at creation moment
                    } else {
                        body.field_1539 = "Yes";
                    }
                    body.field_800 = "% Fee"
                    if (newRecord.mspPorcentageFee) {
                        body.field_802 = newRecord.mspPorcentageFee;
                    }
                    body.field_42 = newRecord.basePayRatePerHour;
                    body.field_53 = newRecord.actualStartDate;
                    body.field_1147 = newRecord.plannedEndDate;
                    body.field_2158 = newRecord.contractImportLog; // cambiar en prod o trs el field

                    body.field_478 = newRecord.contractOvertimeRate;
                    body.field_479 = newRecord.contractDoubletimeRate;

                    let uri = "https://api.knack.com/v1/pages/page_1479/views/view_3736/records/"
                    if (connections.buyer.usingAmendmend) {
                        uri = "https://api.knack.com/v1/pages/page_554/views/view_1791/records/"
                    }

                    // console.log("body to create contract: ", body)
                    // builder changes in records rules for this form
                    const options = {
                        uri: uri,
                        method: 'POST',
                        form: body,
                        headers: {
                            'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                            'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                        },
                        retry: 3,
                        accepted: [400, 404, 401, 403],
                        delay: 5000
                    }

                    if (errorResponse.errors.length == 0) {
                        try {
                            let formRespose = await Request(options);
                            //console.log("form response: ", formRespose)
                            recordSucess = newRecord
                            totalSuccess += 1;
                            successList.push(recordSucess);
                        } catch (e) {
                            try {
                                recordError = newRecord;
                                const error = JSON.parse(e.error);
                                error.actualMappingID = newRecord.mappingId;
                                errorMessages.push(error);
                                totalErrors += 1;
                                errorList.push(recordError);
                            } catch (errorAditional) {
                                recordError = newRecord;
                                const errorAditional1 = {
                                    actualMappingID: newRecord.mappingId,
                                    errors: [{ message: "error in knack API creating contracts, try again for this contract" }]
                                }
                                errorMessages.push(errorAditional1);
                                totalErrors += 1;
                                errorList.push(recordError);
                            }
                        }

                    }

                }, {
                    concurrency: 5
                });
            } else {
                //errorMessages.push(errors);
                errorMessagefinal = errors
            }

            //console.log("success list: ", successList)

            let errorDescriptionMessage = "";
            if (totalErrors > 0) {
                for (let k = 0; k < errorMessages.length; k++) {
                    errorDescriptionMessage = ""
                    errorMessagefinal += `- ${errorMessages[k].actualMappingID}: `
                    errorList[k].errorID = errorMessages[k].actualMappingID;
                    for (let l = 0; l < errorMessages[k].errors.length; l++) {
                        errorMessagefinal += errorMessages[k].errors[l].message;
                        errorDescriptionMessage += errorMessages[k].errors[l].message
                    }
                    errorMessagefinal += '\n';
                    errorList[k].errorDescription = errorDescriptionMessage;
                }
            }

            //console.log("error list: ", errorList)

            const updateImportData = {
                field_2151: "Finished",
                field_2152: totalSuccess,
                field_2153: totalErrors,
                field_2156: errorMessagefinal
            }

            if (totalErrors > 0) {
                console.log("generating csv errors file")
                const generatedFile = await generateFileContracts(errorList, filename);
                updateImportData.field_2154 = generatedFile.file.id
                updateImportData.field_2151 = "Error";
            }

            try {
                await Knack.update({
                    objectKey: internals.KNACK_OBJECTS_IDS.contractsImportLogs,
                    id: idImportLog,
                    body: updateImportData
                });
            } catch (error) {
                console.log("error updating actual contract import log", error);
            }

            try {
                await sendImportEmail('https://us-api.knack.com/v1/pages/page_1405/views/view_3554/records/', idImportLog);


                // code to update the update on field on all records
                try {
                    const objectToUpdate = internals.KNACK_OBJECTS_IDS.contractsImportLogs;  //'object_70'
                    const idToUpdate = idImportLog;
                    let objects = {
                        [internals.KNACK_OBJECTS_IDS.contractsImportLogs]: "field_2155",// contract import logs
                    }
                    const updatedDate = new Date();

                    if (objects[objectToUpdate]) {

                        await Knack.update({
                            objectKey: objectToUpdate,
                            id: idToUpdate,//   Supplier ID 5  Supplier Jheidy Soluntech         5
                            body: { [objects[objectToUpdate]]: updatedDate }
                        });

                    }

                } catch (e) {
                    console.log('error', e);
                }
            } catch (error) {
                console.error("error sending email: ", error);
            }

        }

        server.route({
            method: 'POST',
            path: '/contractsCsvUpload',
            handler: async function (request, h) {

                const payload = request.payload;
                const csvParsed = await parseCSVContracts(payload);
                const csvErrors = checkCSVerrors(csvParsed);
                if (csvErrors.length != 0) {
                    Knack.delete({
                        objectKey: internals.KNACK_OBJECTS_IDS.contractsImportLogs,
                        id: payload.record.id
                    });
                    return {
                        status: 'error',
                        message: csvErrors
                    };
                }
                createdContractsForm(csvParsed, payload.record.id, payload.record.field_2147_raw.filename, payload.buyer);
                return {
                    status: 'ok',
                    message: 'Processing file, you will receive an email once the process has finished'
                };
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });

        server.route({
            method: 'POST',
            path: '/url-unshort',  // no se usa en conexis
            handler: async function (request) {
                const obj = request.payload;
                const isUrl = obj.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                if (isUrl == null) {
                    return {
                        err: obj.url + 'is not an url'
                    };
                }
                try {
                    const newUrl = await UrlUnshort.expand(obj.url);
                    return {
                        url: newUrl || obj.url
                    };
                } catch (e) {
                    console.log(e)
                    return Boom.badRequest('Error on url unshort', 'error');
                }
            }
        });

        // change invoice related records status start
        const getRelateBuyerInvoiceRecords = async (buyerInvoiceID) => {
            let errorCode = 400;
            const dataTables = await Promise.props({
                supplierInvoices: (async () => {
                    const supplierFilters = [
                        { operator: "is", field: "field_1000", value: buyerInvoiceID },
                    ];
                    let response = [];

                    try {
                        response = await getAllRecords(
                            internals.KNACK_OBJECTS_IDS.SupplierInvoice,
                            1,
                            supplierFilters
                        );
                    } catch (catched) {
                        errorCode = 500;
                    }

                    return response;
                })(),
                contractInvoices: (async () => {
                    let response = [];
                    const contractInvoiceFilters = [
                        { operator: "is", field: "field_974", value: buyerInvoiceID },
                    ];

                    try {
                        response = await getAllRecords(
                            internals.KNACK_OBJECTS_IDS.ContractInvoice,
                            1,
                            contractInvoiceFilters
                        );
                    } catch (catched) {
                        errorCode = 500;
                    }

                    return response;
                })(),
                teCards: (async () => {
                    let response = [];
                    const teFilters = [
                        { operator: "is", field: "field_1020", value: buyerInvoiceID },
                    ];
                    try {
                        response = await getAllRecords(
                            internals.KNACK_OBJECTS_IDS.TimeExpense,
                            1,
                            teFilters
                        );
                    } catch (catched) {
                        errorCode = 500;
                    }

                    return response;
                })(),
            });
            return dataTables;
        };
        const changeInvoiceStatus = async (supplierInvoices, contractInvoices, teCards, status) => {
            let errors = []
            if (status == "Invoiced") {
                await Promise.map(supplierInvoices, async (supplierInvoice) => {
                    try {
                        await Knack.update({
                            objectKey: internals.KNACK_OBJECTS_IDS.SupplierInvoice,
                            id: supplierInvoice.id,
                            body: {
                                field_957: "Invoiced",
                            }
                        });
                    } catch (catched) {
                        errors.push(`Error updating Supplier invoice with ID: ${supplierInvoice.field_959}`);
                    }

                }, {
                    concurrency: 1
                });
            }
            if (status == "Invoiced") {
                await Promise.map(contractInvoices, async (contractInvoice) => {
                    try {
                        await Knack.update({
                            objectKey: internals.KNACK_OBJECTS_IDS.ContractInvoice,
                            id: contractInvoice.id,
                            body: {
                                field_543: "Invoiced",
                            }
                        });
                    } catch (catched) {
                        errors.push(`Error updating Contract invoice with ID: ${contractInvoice.field_453}`);
                    }

                }, {
                    concurrency: 1
                });
            }

            await Promise.map(teCards, async (teCard) => {
                if (status != "Draft") {
                    try {
                        await Knack.update({
                            objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
                            id: teCard.id,
                            body: {
                                field_386: "Invoiced",
                            }
                        });
                    } catch (catched) {
                        errors.push(`Error updating Time and Expense Card with ID: ${teCard.field_420}`);
                    }
                } else if (status == "Draft") {
                    try {
                        await Knack.update({
                            objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
                            id: teCard.id,
                            body: {
                                field_386: "Approved",
                            }
                        });
                    } catch (catched) {
                        errors.push(`Error updating Time and Expense Card with ID: ${teCard.field_420}`);
                    }
                }
            }, {
                concurrency: 1
            });
            return errors
        };
        const sendEmailInvoiceStatusChange = async (message, email, subject) => {
            let scene_key = "scene_1406";
            let view_key = "view_3556";

            let date = Moment(new Date()).subtract(5, "hours").format("MM-DD-YYYY HH:mm");

            let form = {
                field_1778: email,
                field_1780: date,
                field_1776: subject,
                field_1779: message
            };

            const options = {
                uri: `https://us-api.knack.com/v1/pages/${scene_key}/views/${view_key}/records`,
                method: 'POST',
                form: form,
                headers: {
                    'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                    'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                },
                retry: 3,
                accepted: [400, 404, 401, 403],
                delay: 5000
            };

            return Request(options);
        };
        const updateBuyerInvoiceChangingStatus = async (buyerInvoiceID) => {
            try {
                await Knack.update({
                    objectKey: internals.KNACK_OBJECTS_IDS.BuyerInvoice,
                    id: buyerInvoiceID,
                    body: {
                        field_2159: "No", // change in prod
                    }
                });
            } catch (e) {
                console.log("Error updating buyer invoice: ", e)
            }
        };
        const changeInvoiceStatusProcess = async (buyerInvoiceID, status, email) => {
            let relatedRecords = {};
            let error = "";
            try {
                relatedRecords = await getRelateBuyerInvoiceRecords(buyerInvoiceID);
            } catch (e) {
                console.log("error getting related records: ", e)
                error = "error getting related records, please try again."
            }
            if (!error) {
                const supplierInvoices = relatedRecords.supplierInvoices;

                const contractInvoices = relatedRecords.contractInvoices;

                const teCards = relatedRecords.teCards;


                let subject = "Invoice Status Changed";
                let message = "The Invoice Status has been updated successfully";

                const errors = await changeInvoiceStatus(supplierInvoices, contractInvoices, teCards, status);
                if (errors.length != 0) {
                    subject = "Invoice Status Changed Error";
                    for (let errormessage of errors) {
                        message += errormessage + "\n";
                    }
                }

                await updateBuyerInvoiceChangingStatus(buyerInvoiceID);

                await sendEmailInvoiceStatusChange(message, email, subject)
                console.log("email Send")
            } else {
                await updateBuyerInvoiceChangingStatus(buyerInvoiceID);
                const subject = "Invoice Status Error";
                const message = error;
                await sendEmailInvoiceStatusChange(message, email, subject)
            }
        };
        server.route({
            method: 'POST',
            path: '/change_invoice_status',
            handler: async function (request, h) {

                const payload = request.payload;
                const buyerInvoiceID = payload.record.id;

                const status = payload.record.field_1793;

                const email = payload.loggedInEmail;


                changeInvoiceStatusProcess(buyerInvoiceID, status, email)

                return {
                    status: "ok",
                }
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack },
                ]
            }
        });
        // change invoice related records status finish
        // TRS score card start
        const getAllRequisitions = async (page, filters) => {
            try {
                const response = await Knack.find({
                    objectKey: internals.KNACK_OBJECTS_IDS.requisitions,
                    rowsPerPage: 1000,
                    filters,
                    page,
                });

                if (response.current_page < response.total_pages) {
                    return response.records.concat(
                        await getAllRequisitions(page + 1, filters)
                    );
                }
                return response.records;
            } catch (e) {
                console.log("error getting all the contracts: ", e);
            }
        };
        const getAllProposals = async (page, filters) => {
            try {
                const response = await Knack.find({
                    objectKey: internals.KNACK_OBJECTS_IDS.proposalObject,
                    rowsPerPage: 1000,
                    filters,
                    page,
                });

                if (response.current_page < response.total_pages) {
                    return response.records.concat(
                        await getAllProposals(page + 1, filters)
                    );
                }
                return response.records;
            } catch (e) {
                console.log("error getting all the contracts: ", e);
            }
        };
        const getDataToCalculations = async (loggedInBuyer, startDate, endDate) => {
            let supplierRelatedToBuyer = [];
            try {
                const supplierFilters = [{ operator: "is", field: "field_20", value: loggedInBuyer }]
                supplierRelatedToBuyer = await Knack.find({
                    objectKey: "object_2",
                    rowsPerPage: 1000,
                    filters: supplierFilters,
                });
            } catch (catched) {
                errorCode = 500;
            }
            let errorCode = 400



            const dataTables = await Promise.props({
                // 'supplierRelatedToBuyer': (async () => {
                //     let response = [];
                //     const supplierFilters = [{ operator: "is", field: "field_20", value: loggedInBuyer }]
                //     try {
                //         response = await Knack.find({
                //             objectKey: "object_2",
                //             rowsPerPage: 1000,
                //             filters: supplierFilters,
                //         });
                //     } catch (catched) {
                //         errorCode = 500;
                //     }

                //     return response;
                // })(),
                'requisitions': (async () => {

                    let response = [];
                    await Promise.map(supplierRelatedToBuyer.records, async (supplier) => {
                        let responseSupplier = [];
                        const requisitionsFilters = [
                            { operator: "is after", field: "field_951", value: startDate },
                            { operator: "is before", field: "field_951", value: endDate },
                            { operator: "contains", field: "field_90", value: supplier.id }
                        ];
                        try {
                            responseSupplier = await getAllRequisitions(1, requisitionsFilters);
                            // response = await Knack.find({
                            //     objectKey: "object_10",
                            //     rowsPerPage: 1000,
                            //     filters: requisitionsFilters,
                            // });
                            // console.log("response requisitions: ", responseSupplier)
                            for (let requisition of responseSupplier) {
                                const currentRequisitonID = requisition.id;
                                if (response.length == 0) {
                                    response.push(requisition)
                                } else {
                                    if (response.some(r => r.id == currentRequisitonID)) {
                                        console.log("some requisition in response already have the id: ", currentRequisitonID)
                                    } else {
                                        response.push(requisition)
                                    }
                                }
                            }
                            // response = response.concat(responseSupplier);
                        } catch (catched) {
                            errorCode = 500;
                        }
                    }, {
                        concurrency: 1
                    });

                    return response;
                })(),
                'proposals': (async () => {

                    let response = [];
                    await Promise.map(supplierRelatedToBuyer.records, async (supplier) => {
                        let responseSupplier = [];
                        const proposalFilters = [
                            { operator: "is after", field: "field_273", value: startDate },
                            { operator: "is before", field: "field_273", value: endDate },
                            { operator: "is", field: "field_102", value: supplier.id }
                        ];
                        try {
                            responseSupplier = await getAllProposals(1, proposalFilters);
                            // response = await Knack.find({
                            //     objectKey: "object_12",
                            //     rowsPerPage: 1000,
                            //     filters: proposalFilters,
                            // });
                            // console.log("response proposals: ", responseSupplier);
                            response = response.concat(responseSupplier);
                        } catch (catched) {
                            errorCode = 500;
                        }
                    }, {
                        concurrency: 1
                    });

                    return response;
                })(),
                'contracts': (async () => {

                    let response = [];
                    await Promise.map(supplierRelatedToBuyer.records, async (supplier) => {
                        let responseSupplier = [];
                        const contractFilters = [
                            { operator: "is after", field: "field_1190", value: startDate },
                            { operator: "is before", field: "field_1190", value: endDate },
                            { operator: "is", value: "Yes", field: "field_1187" },
                            { operator: "is not blank", field: "field_340", value: "" },
                            { operator: "is", field: "field_51", value: supplier.id }
                        ];
                        try {
                            responseSupplier = await getAllContracts(1, contractFilters);
                            // response = await Knack.find({
                            //     objectKey: internals.KNACK_OBJECTS_IDS.Contract,
                            //     rowsPerPage: 1000,
                            //     filters: contractFilters,
                            // });
                            // console.log("response contracts: ", responseSupplier)
                            response = response.concat(responseSupplier);
                        } catch (catched) {
                            errorCode = 500;
                        }
                    }, {
                        concurrency: 1
                    });

                    return response;
                })()
            });

            dataTables["supplierRelatedToBuyer"] = supplierRelatedToBuyer.records;

            return dataTables
        }
        // calculation score # 1
        const measure1Calculations = (requisitions, supplierID, proposals) => {
            let numberRequisitions = 0;
            let requisitionsToSupplier = []

            for (let data of requisitions) {
                for (let suppliers of data.field_90_raw) {
                    if (suppliers.id == supplierID) {
                        numberRequisitions += 1;
                        requisitionsToSupplier.push({ id: data.id, postedDate: data.field_951, supplier: suppliers.id })
                    }
                }
            }

            //console.log("requisitions to supplier", requisitionsToSupplier)

            let twoProposals = 0
            for (let requisition of requisitionsToSupplier) {
                let proposalsMade = 0
                let actualDate = Moment(requisition.postedDate, "MM/DD/YYYY hh:mma/A").format();
                let dateDayAfter = Moment(requisition.postedDate, "MM/DD/YYYY hh:mma/A").add(1, "day").format();
                for (let proposal of proposals) {

                    if (proposal.field_103_raw[0].id == requisition.id && requisition.supplier == proposal.field_102_raw[0].id) {
                        if (Moment(proposal.field_273, "MM/DD/YYYY hh:mma/A").isBetween(actualDate, dateDayAfter, "days", "[]")) {
                            proposalsMade += 1;
                        }
                        if (proposalsMade >= 2) {
                            twoProposals += 1;
                            proposalsMade = 0;
                        }
                    }
                }
            }
            let measure1 = twoProposals / numberRequisitions;
            return Math.round(measure1 * 100)
        };
        // calculations score # 2
        const measure2Calculations = (requisitions, supplierID, proposals) => {
            let numberOpenPosition = 0;
            let requisitionsToSupplier = [];
            for (let requisition of requisitions) {
                for (let suppliers of requisition.field_90_raw) {
                    if (suppliers.id == supplierID) {
                        // preguntar cuales son especificamente las open positions
                        numberOpenPosition += requisition.field_718;
                        requisitionsToSupplier.push({ id: requisition.id, supplier: suppliers.id });
                    }
                }
            }
            let proposalsMade = 0;
            for (let requisition of requisitionsToSupplier) {
                for (let proposal of proposals) {
                    if (proposal.field_103_raw[0].id == requisition.id && requisition.supplier == proposal.field_102_raw[0].id) {
                        proposalsMade += 1;
                    }
                }
            }
            let measure2 = proposalsMade / numberOpenPosition;
            return Math.round(measure2 * 100)
        };
        // calculations score # 3
        const measure3Calculations = (requisitions, supplierID, proposals, contracts) => {
            let numberOpenPosition = 0;
            let requisitionsToSupplier = [];
            for (let requisition of requisitions) {
                for (let suppliers of requisition.field_90_raw) {
                    if (suppliers.id == supplierID) {
                        // preguntar cuales son especificamente las open positions
                        numberOpenPosition += requisition.field_718;
                        requisitionsToSupplier.push({ id: requisition.id, supplier: suppliers.id });
                    }
                }
            }
            let contractsConvertedToActive = 0;
            for (let requisition of requisitionsToSupplier) {
                for (let contract of contracts) {
                    if (contract.field_341_raw[0].id == requisition.id && requisition.supplier == contract.field_51_raw[0].id) {
                        contractsConvertedToActive += 1;
                    }
                }
            }
            let measure3 = contractsConvertedToActive / numberOpenPosition;
            return Math.round(measure3 * 100)
        };
        // calculations score # 4
        const measure4Calculations = (requisitions, supplierID, proposals, contracts) => {
            let totalSupplierProposals = 0;
            //let requisitionsToSupplier = [];
            let contractsConvertedToActive = 0;
            for (let proposal of proposals) {
                if (proposal.field_102_raw[0].id == supplierID) {
                    totalSupplierProposals += 1;
                }
            }
            for (let contract of contracts) {
                if (contract.field_51_raw[0].id == supplierID) {
                    contractsConvertedToActive += 1
                }
            }
            let measure4 = contractsConvertedToActive / totalSupplierProposals;
            return Math.round(measure4 * 100)
        };
        // calculations score # 5
        const measure5Calculations = (requisitions, supplierID, proposals) => {
            let requisitionsToSupplierCount = 0;
            let requisitionsToSupplier = [];
            for (let requisition of requisitions) {
                for (let suppliers of requisition.field_90_raw) {
                    if (suppliers.id == supplierID && requisition.field_108 != "") {
                        // preguntar cuales son especificamente las open positions
                        requisitionsToSupplierCount += 1;
                        requisitionsToSupplier.push({ id: requisition.id, supplier: suppliers.id, budgetRate: parseFloat(requisition.field_108.slice(1)) });
                    }
                }
            }
            //console.log("requisitions to supplier where budgeted rate was provided: ", requisitionsToSupplier)
            let proposalBillRateBelowBudgetRate = 0;
            //let test = []
            for (let requisition of requisitionsToSupplier) {
                for (let proposal of proposals) {
                    let proposalBillRate = parseFloat(proposal.field_107.slice(1));
                    if (proposal.field_103_raw[0].id == requisition.id && requisition.supplier == proposal.field_102_raw[0].id && proposalBillRate <= requisition.budgetRate) {
                        proposalBillRateBelowBudgetRate += 1;
                        //test.push({ id: proposal.id, ProposalRegularBillRate: proposal.field_107 })
                    }
                }
            }
            //console.log("supplier proposal Regular Bill Rate was below the Requisition Budget rate: ", test)
            let measure5 = proposalBillRateBelowBudgetRate / requisitionsToSupplierCount
            return Math.round(measure5 * 100)
        };
        // calculations score # 6
        const measure6Calculations = (requisitions, supplierID, proposals, contracts) => {
            let requisitionsToSupplierCount = 0;
            let requisitionsToSupplier = [];
            for (let requisition of requisitions) {
                for (let suppliers of requisition.field_90_raw) {
                    if (suppliers.id == supplierID && requisition.field_108 != "") {
                        // preguntar cuales son especificamente las open positions
                        requisitionsToSupplierCount += 1;
                        requisitionsToSupplier.push({ id: requisition.id, supplier: suppliers.id, budgetRate: parseFloat(requisition.field_108.slice(1)) });
                    }
                }
            }
            //console.log("requisitions to supplier where budgeted rate was provided: ", requisitionsToSupplier)
            let proposalFinalBillRateBelowBudgetRate = 0;
            //let test = []
            for (let requisition of requisitionsToSupplier) {
                for (let contract of contracts) {
                    let contractBillRate = parseFloat(contract.field_43.slice(1));
                    if (contract.field_341_raw[0].id == requisition.id && requisition.supplier == contract.field_51_raw[0].id && contractBillRate <= requisition.budgetRate) {
                        proposalFinalBillRateBelowBudgetRate += 1;
                        //test.push({ id: contract.id, contractRegularBillRate: contract.field_43 })
                    }
                }
            }
            //console.log("supplier proposal Regular Bill Rate was below the Requisition Budget rate: ", test)
            let measure6 = proposalFinalBillRateBelowBudgetRate / requisitionsToSupplierCount
            return Math.round(measure6 * 100)
        };

        const suppliersScores = (requisitions, supplierID, proposals, supplierRelatedToBuyer, scoreFunction, contracts) => {
            if (contracts) {
                const measureActualSupplier = scoreFunction(requisitions, supplierID, proposals, contracts);

                let worstSupplierMeasure = 0;
                let bestSupplierMeasure = 0;
                for (let supplierConnectedBuyer of supplierRelatedToBuyer) {
                    let actualMeasure = scoreFunction(requisitions, supplierConnectedBuyer.id, proposals, contracts);
                    if (actualMeasure > bestSupplierMeasure) {
                        bestSupplierMeasure = actualMeasure
                    } else if (actualMeasure <= worstSupplierMeasure) {
                        worstSupplierMeasure = actualMeasure
                    }
                }
                return { actualSupplier: measureActualSupplier, bestSupplier: bestSupplierMeasure, worstSupplier: worstSupplierMeasure }
            } else {
                const measureActualSupplier = scoreFunction(requisitions, supplierID, proposals);

                let worstSupplierMeasure = 0;
                let bestSupplierMeasure = 0;
                for (let supplierConnectedBuyer of supplierRelatedToBuyer) {
                    let actualMeasure = scoreFunction(requisitions, supplierConnectedBuyer.id, proposals);
                    if (actualMeasure > bestSupplierMeasure) {
                        bestSupplierMeasure = actualMeasure
                    } else if (actualMeasure <= worstSupplierMeasure) {
                        worstSupplierMeasure = actualMeasure
                    }
                }
                return { actualSupplier: measureActualSupplier, bestSupplier: bestSupplierMeasure, worstSupplier: worstSupplierMeasure }
            }
        };

        const generateExcelFile = async (proposalsData, requisitionsData, contractsData, supplierID) => {
            // console.log("proposal data: ", proposalsData)
            // console.log("requisitions data: ", requisitionsData)
            // console.log("contracts data: ", contractsData)
            const wb = new xl.Workbook();
            const proposalsws = wb.addWorksheet('proposals');
            const requisitionssws = wb.addWorksheet('requisitions');
            const contratcsws = wb.addWorksheet('contracts');

            const path = "./files/data.xlsx"

            const headingProposals = ["Date submitted", "Supplier", "Requisition", "Date Contract Created",
                "Proposed Bill Rate", "Final Agreed Bill Rate"];
            let headingColumnIndex = 1;
            headingProposals.forEach(heading => {
                proposalsws.cell(1, headingColumnIndex++).string(heading);
            });
            let rowIndex = 2;
            proposalsData.forEach(record => {
                if (supplierID == record.field_102_raw[0].id) {
                    proposalsws.cell(rowIndex, 1).string(record.field_273);
                    proposalsws.cell(rowIndex, 2).string(record.field_102_raw[0] ? record.field_102_raw[0].identifier : "");
                    proposalsws.cell(rowIndex, 3).string(String(record.field_103_raw[0] ? record.field_103_raw[0].identifier : ""));
                    proposalsws.cell(rowIndex, 4).string(record.field_627);
                    proposalsws.cell(rowIndex, 5).string(record.field_107);
                    proposalsws.cell(rowIndex, 6).string(record.field_335);
                    rowIndex++;
                }
            });

            const headingRequisitions = ["Buyer", "Requisition Status", "Supplier Distribution", "Requisition submitted Date",
                "Requisition Posted Date", "Requisition ID", "Number of Positions", "Bugeted Rate per Hour"];
            headingColumnIndex = 1;
            headingRequisitions.forEach(heading => {
                requisitionssws.cell(1, headingColumnIndex++).string(heading);
            });
            rowIndex = 2;
            requisitionsData.forEach(record => {
                if (record.field_90_raw.length && record.field_90_raw.some(supp => supp.id == supplierID)) {

                    let supplierDistribution = "";
                    if (record.field_90_raw.length) {
                        for (let supp of record.field_90_raw) {
                            supplierDistribution += supp.identifier + ". ";
                        }
                    }
                    requisitionssws.cell(rowIndex, 1).string(record.field_89_raw[0] ? record.field_89_raw[0].identifier : "");
                    requisitionssws.cell(rowIndex, 2).string(record.field_100);
                    requisitionssws.cell(rowIndex, 3).string(supplierDistribution);
                    requisitionssws.cell(rowIndex, 4).string(record.field_328);
                    requisitionssws.cell(rowIndex, 5).string(record.field_951);
                    requisitionssws.cell(rowIndex, 6).string(String(record.field_88));
                    requisitionssws.cell(rowIndex, 7).string(String(record.field_718));
                    requisitionssws.cell(rowIndex, 8).string(record.field_108);
                    rowIndex++;
                }
            });

            const headingContracts = ["Buyer", "Supplier", "Contract status", "Proposal",
                "Proposal Submitted On", "Requisition", "Activated", "Activation Actual Start Date", "Contract Bill Rate"];
            headingColumnIndex = 1;
            headingContracts.forEach(heading => {
                contratcsws.cell(1, headingColumnIndex++).string(heading);
            });
            rowIndex = 2;
            contractsData.forEach(record => {
                if (record.field_51_raw[0].id == supplierID) {
                    contratcsws.cell(rowIndex, 1).string(record.field_47_raw[0] ? record.field_47_raw[0].identifier : "");
                    contratcsws.cell(rowIndex, 2).string(record.field_51_raw[0] ? record.field_51_raw[0].identifier : "");
                    contratcsws.cell(rowIndex, 3).string(record.field_55);
                    contratcsws.cell(rowIndex, 4).string(String(record.field_340_raw[0] ? record.field_340_raw[0].identifier : ""));
                    contratcsws.cell(rowIndex, 5).string(record.field_343);
                    contratcsws.cell(rowIndex, 6).string(String(record.field_341_raw[0] ? record.field_341_raw[0].identifier : ""));
                    contratcsws.cell(rowIndex, 7).string(record.field_1187);
                    contratcsws.cell(rowIndex, 8).string(record.field_1190);
                    contratcsws.cell(rowIndex, 9).string(record.field_43);
                    rowIndex++;
                }
            });

            const excelBuffer = await wb.writeToBuffer();
            fs.writeFileSync(path, excelBuffer);

            console.log("after excel write")
            const stream = fs.createReadStream(path)

            let uploadResponse;
            try {
                uploadResponse = await Knack.upload({
                    type: 'file',
                    body: {
                        name: "data.xlsx",
                        files: {
                            value: stream,
                            options: {
                                filename: "data.xlsx",
                                contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                            }
                        }
                    }
                });

                uploadResponse = JSON.parse(uploadResponse);
            } catch (catched) {
                console.log("error knack upload: ", catched)
                try {
                    const error = JSON.parse(catched.error);
                    //uploadCode = catched.statusCode;
                    uploadResponse = error;
                } catch (error) {
                    //uploadCode = catched.statusCode;
                    uploadResponse = catched.message;
                }
            }

            // console.log("uploadResponse: ", uploadResponse)

            fs.unlink(path, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });

            return {
                file: uploadResponse,
            };
        };

        server.route({
            method: 'POST',
            path: '/generateSupplierScorecard',
            handler: async (request, h) => {
                const payload = request.payload;
                //console.log("payload:", payload)
                const startDate = payload.record.field_2130;
                const endDate = payload.record.field_2131;
                const supplier = payload.record.field_2132_raw[0];
                const Target1 = payload.record.field_2133;
                const Target2 = payload.record.field_2134;
                const Target3 = payload.record.field_2135;
                const Target4 = payload.record.field_2136;
                const Target5 = payload.record.field_2137;
                const Target6 = payload.record.field_2138;
                const loggedInBuyer = payload.buyer;
                // console.log("start date", startDate)
                // console.log("end date", endDate)
                // console.log("supplier: ", supplier)
                // console.log("logged in buyer: ", loggedInBuyer)

                let data = {};
                try {
                    data = await getDataToCalculations(loggedInBuyer, startDate, endDate);
                } catch (e) {
                    console.log("error getting tables: ", e)
                    return {
                        status: "error",
                        message: "error getting information, try again"
                    }
                }
                // console.log("data with promise.props: ", data)
                const requisitions = data.requisitions;
                const proposals = data.proposals;
                const supplierRelatedToBuyer = data.supplierRelatedToBuyer;
                const contracts = data.contracts;
                //console.log("requisitions table: ", requisitions)
                //console.log("proposals table: ", proposals)
                // console.log("supplier related to logged in buyer: ", supplierRelatedToBuyer)
                //console.log("requisition: ", requisitions.records[0])
                //console.log("proposals: ", proposals.records[0])
                //console.log("length contracts", contracts.records.length)
                //console.log("contract: ", contracts.records[0])
                if (contracts.length < 4 || requisitions.length < 4 || proposals.length < 4) {
                    return {
                        status: "insufficient information",
                        message: "There is not enough information for the time frame selected to calculate all the scores, try again with a different time frame"
                    }
                }

                const score1 = measure1Calculations;
                const score2 = measure2Calculations;
                const score3 = measure3Calculations;
                const score4 = measure4Calculations;
                const score5 = measure5Calculations;
                const score6 = measure6Calculations;

                const resultsScore1 = suppliersScores(requisitions, supplier.id, proposals, supplierRelatedToBuyer, score1);
                const resultsScore2 = suppliersScores(requisitions, supplier.id, proposals, supplierRelatedToBuyer, score2);
                const resultsScore3 = suppliersScores(requisitions, supplier.id, proposals, supplierRelatedToBuyer, score3, contracts);
                const resultsScore4 = suppliersScores(requisitions, supplier.id, proposals, supplierRelatedToBuyer, score4, contracts);
                const resultsScore5 = suppliersScores(requisitions, supplier.id, proposals, supplierRelatedToBuyer, score5);
                const resultsScore6 = suppliersScores(requisitions, supplier.id, proposals, supplierRelatedToBuyer, score6, contracts);

                resultsScore1.target = Target1;
                resultsScore2.target = Target2;
                resultsScore3.target = Target3;
                resultsScore4.target = Target4;
                resultsScore5.target = Target5;
                resultsScore6.target = Target6;

                resultsScore1.title = "1. % of Time supplier made at least 2 proposals against an open request";
                resultsScore2.title = "2. % proposals against open positions";
                resultsScore3.title = "3. % Fill Rate";
                resultsScore4.title = "4. Proposal Quality Measure";
                resultsScore5.title = "5. % Proposal Price Compliance Rate";
                resultsScore6.title = "6. % Contract Price Compliance";


                resultsScore1.description = "This KPI measures the suppliers ability to provide strong support to the clients staffing requirements. Providing two or more proposals against an open request consistenly demonstrates strong customer coverage and support.";
                resultsScore2.description = "This KPI Measures the suppliers ability to support on a consistent basis a clients open positions. This measure differs from measure 1 above as it looks at open positions vs requisitions.";
                resultsScore3.description = "This KPI measures the suppliers rate of success in filling the clients open roles assigned to it within the time period selected. This shows the suppliers ability to provide strong candidates that match price, skill and culture.";
                resultsScore4.description = "This KPI Measures the percentage of supplier proposals that were converted to an active contract in the system.";
                resultsScore5.description = "This KPI Measures how often the supplier was able to submit proposals at or below the rate in the requisition.";
                resultsScore6.description = "This KPI measures the frequency at which the supplier was able to fill roles at or below the rate in the posted requisition.";

                let excelFile = await generateExcelFile(proposals, requisitions, contracts, supplier.id);

                const response = {
                    score1: resultsScore1,
                    score2: resultsScore2,
                    score3: resultsScore3,
                    score4: resultsScore4,
                    score5: resultsScore5,
                    score6: resultsScore6,
                    excelfile: excelFile
                };

                return response;
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack },
                ]
            }
        });
        //TRS score card finish

        // feature con-128 submit timecard for approval start
        const sendEmailTimecardsSubmission = async (message, recordID) => {
            let scene_key = "scene_1318";
            let view_key = "view_3563";

            //let date = Moment(new Date()).subtract(5, "hours").format("MM-DD-YYYY HH:mm");

            let form = {
                field_2173: message,
            };

            const options = {
                uri: `https://us-api.knack.com/v1/pages/${scene_key}/views/${view_key}/records/${recordID}`,
                method: 'PUT',
                form: form,
                headers: {
                    'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                    'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                },
                retry: 3,
                accepted: [400, 404, 401, 403],
                delay: 5000
            };
            console.log("sending Email")
            return Request(options);
        };

        const submitTimecardForApproval = async (processLogID) => {

            let error = "";
            let emailMessage = "";
            const filters = [{ operator: "is", field: "field_1960", value: processLogID }]
            let timeCards = [];

            timeCards = await Promise.props({
                'tecards': (async () => {
                    let response = [];
                    try {
                        response = await Knack.find({
                            objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
                            rowsPerPage: 1000,
                            filters: filters,
                        });
                    } catch (catched) {
                        console.log("error getting timecards: ", e)
                        error = "error getting related timecards";
                        errorCode = 500;
                    }

                    return response;
                })()
            });

            //console.log("timecards: ", timeCards)
            if (!error.length) {
                await Promise.map(timeCards.tecards.records, async (timecard) => {
                    const currentDateTime = Moment(new Date()).format("MM-DD-YYYY HH:mm");
                    //console.log("currentDatetime: ", currentDateTime)
                    try {
                        const contractID = timecard.field_377_raw[0].id
                        const timecardsSubmittedThisMonth = await Knack.find({
                            objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
                            filters: [
                                { field: "field_377", operator: "is", value: contractID },
                                { field: "field_1787", operator: "is during the current", type: "month", value: "" }
                            ]
                        });
                        let isfirstInMonth = "No"
                        if (timecardsSubmittedThisMonth.records.length == 0) {
                            isfirstInMonth = "Yes"
                        }

                        await Knack.update({
                            objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
                            id: timecard.id,
                            body: {
                                field_386: "Under Review - Buyer",
                                field_1787: currentDateTime,
                                field_2200: isfirstInMonth,
                            }
                        });
                    }
                    catch (e) {
                        error += `Failed to update timecard ${timecard.field_420}\n`
                    }
                }, {
                    concurrency: 1
                });

                try {
                    await CheckProcess.change_status_isTEsubmittingForApproval();
                } catch (e) {
                    console.log("error saving on mongo when changing status after process contracts: ", e);
                }

                if (!error.length) {
                    emailMessage = "The Time & Expense cards have been submited for approval successfuly";
                    await sendEmailTimecardsSubmission(emailMessage, processLogID)
                } else {
                    emailMessage = error;
                    await sendEmailTimecardsSubmission(emailMessage, processLogID)
                }
            } else {
                try {
                    await CheckProcess.change_status_isTEsubmittingForApproval();
                } catch (e) {
                    console.log("error saving on mongo when changing status after process contracts: ", e);
                }
                emailMessage = "Error getting related time cards please try again later"
                await sendEmailTimecardsSubmission(emailMessage, processLogID)
            }

        }
        server.route({
            method: 'PUT',
            path: '/submit_timecard_for_approval',
            handler: async function (request, h) {

                const payload = request.payload;

                const processLogID = payload.recordID;
                const userID = payload.userID;
                // const email = payload.loggedInEmail;

                try {
                    await Knack.update({
                        objectKey: internals.KNACK_OBJECTS_IDS.processLog,
                        id: processLogID,
                        body: {
                            field_1963: Moment(new Date()).format("MM-DD-YYYY HH:mm"),
                            field_1964: userID,
                            field_1955: "Submitted for Approval"
                        }
                    });
                } catch (error) {
                    return {
                        status: "error",
                    }
                }
                await CheckProcess.change_status_isTEsubmittingForApproval();
                submitTimecardForApproval(processLogID);


                return {
                    status: "ok",
                }
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack },
                ]
            }
        });
        // feature con-128 submit timecard for approval finish

        // approve time cards start
        const ApproveTimecads = async (TimeCardsIDs, approvedBy, email) => {
            let errorList = [];
            await Promise.map(TimeCardsIDs, async (teid) => {
                try {
                    let form = {
                        field_528: "Approve",
                        field_845: approvedBy,
                    };
                    const options = {
                        uri: `https://us-api.knack.com/v1/pages/scene_415/views/view_645/records/${teid}`,
                        method: 'PUT',
                        form: form,
                        headers: {
                            'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                            'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                        },
                        retry: 3,
                        accepted: [400, 404, 401, 403],
                        delay: 5000
                    };
                    let response = await Request(options);
                    response = JSON.parse(response);

                    // code to update the update on field on all records
                    try {
                        const objectToUpdate = internals.KNACK_OBJECTS_IDS.TimeExpense; //'object_33'
                        const idToUpdate = teid;
                        let objects = {
                            [internals.KNACK_OBJECTS_IDS.TimeExpense]: "field_2272", // Time & Expense Card
                        }
                        const updatedDate = new Date();

                        if (objects[objectToUpdate]) {

                            await Knack.update({
                                objectKey: objectToUpdate,
                                id: idToUpdate,//   Supplier ID 5  Supplier Jheidy Soluntech         5
                                body: { [objects[objectToUpdate]]: updatedDate }
                            });
                        }

                    } catch (e) {
                        console.log('error', e);
                    }
                } catch (e) {
                    let error = JSON.parse(e.error);
                    errorList.push(`Error approving the time and expense card: ${teid}, Try again for this time and expense card`);
                }
            }, {
                concurrency: 1
            });
            if (errorList.length > 0) {
                let messageErrorFinal = "";
                for (let error in errorList) {
                    messageErrorFinal += error + "\n"
                }
                // send error email  
                try {
                    await CheckProcess.change_status_isApprovingTE();
                } catch (e) {
                    console.log("error saving on mongo when changing status after process contracts: ", e);
                }
                sendEmailTimeCardsApproval(messageErrorFinal, email, "Time & Expense Cards approval process status")
            } else {
                // send success email
                try {
                    await CheckProcess.change_status_isApprovingTE();
                } catch (e) {
                    console.log("error saving on mongo when changing status after process contracts: ", e);
                }
                const message = "Conexis has completed the Time and Expense Cards Approval process successfully. You can now return to the Time and Expense Card approval screen and start a new process."
                sendEmailTimeCardsApproval(message, email, "Time & Expense Cards approval process status")
            }
        }
        const sendEmailTimeCardsApproval = async (message, email, subject) => {
            let scene_key = "scene_1406"; // change in prod
            let view_key = "view_3556"; // change in prod
            //let scene_key = "scene_1414"; // change in prod
            //let view_key = "view_3573"; // change in prod
            let date = Moment(new Date()).format("MM-DD-YYYY HH:mm");
            let form = {
                field_1778: email,
                field_1780: date,
                field_1776: subject,
                field_1779: message
            };
            const options = {
                uri: `https://us-api.knack.com/v1/pages/${scene_key}/views/${view_key}/records`,
                method: 'POST',
                form: form,
                headers: {
                    'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                    'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                },
                retry: 3,
                accepted: [400, 404, 401, 403],
                delay: 5000
            };
            return Request(options);
        };
        server.route({
            method: 'PUT',
            path: '/approveSelectedTimeCards',
            handler: async function (request, h) {

                await CheckProcess.change_status_isApprovingTE();

                const payload = request.payload;
                const TimeCardsIDs = payload.selectedTEs;
                const approvedById = payload.loggedInID;
                const userEmail = payload.loggedInEmail;
                ApproveTimecads(TimeCardsIDs, approvedById, userEmail)
                return {
                    status: 'ok',
                    message: 'Processing Time selected Cards, you will receive an email once the process has finished'
                };
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });
        //approve time cards finish

        // generate AD hoc Report 
        server.route({
            method: 'POST',
            path: '/generateAdHoc',
            handler: async function (request, h) {

                // console.log(request.payload);
                // const connections = request.payload.connections;
                const filterspayload = request.payload.filters;
                const mainObject = request.payload.mainObject;
                const displayFields = request.payload.displayFields;
                const tableHeaders = request.payload.tableHeaders;
                // const responsesConnections = [];

                // let adhocRecord = await Knack.create({
                //     objectKey: "object_76", //change prod
                // });

                // adhocRecord = JSON.parse(adhocRecord);
                // const adhocID = adhocRecord.id
                const responseFinal = await generateAdHocReport(filterspayload, mainObject, displayFields, tableHeaders);

                // return {
                //     id: adhocID
                // };
                return responseFinal
            },
            config: {
                payload: {
                    timeout: false
                },
                timeout: {
                    // socket: 90000000
                    socket: false
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });

        const generateAdHocReport = async (filterspayload, mainObject, displayFields, tableHeaders, adhocID) => {
            const data = await getAllRecordsAdhoc(1, filterspayload, mainObject)

            //console.log("table header: ", tableHeaders)
            console.log("data length:", data.length)

            let records = data.map(function (r) {
                let tableRecord = {};
                tableRecord["id"] = r.id
                for (let columnField of displayFields) {
                    tableRecord[columnField] = r[columnField].toString().replace(/(<([^>]+)>)/ig, "")
                }
                return tableRecord
            });

            const csvFile = await generateFileAdhoc(records, "AdHoc-Report.csv", displayFields, tableHeaders);
            const responseObject = {
                records: records,
                csvFile: csvFile
            };
            return responseObject
            // try {
            //     await Knack.update({
            //         objectKey: "object_76", //change prod
            //         id: adhocID,
            //         body: {
            //             field_2168: "complete", // change prod
            //             field_2169: JSON.stringify(responseObject) //change prod
            //         }
            //     });
            // } catch (e) {
            //     console.log("error updating adhoc record")
            // }

        };

        const getAllRecordsAdhoc = async (page, filters, object) => {
            try {
                const response = await Knack.find({
                    objectKey: object,
                    rowsPerPage: 1000,
                    filters,
                    page,
                });

                console.log("respone current page:", response.current_page)
                console.log("response total pages", response.total_pages)

                if ((response.current_page < response.total_pages) && (response.current_page < 5)) {
                    return response.records.concat(
                        await getAllRecordsAdhoc(page + 1, filters, object)
                    );
                }
                return response.records;
            } catch (e) {
                console.log("error getting all the records of adhoc: ", e);
            }
        };

        const generateFileAdhoc = async (dataToWrite, filename, displayFields, tableHeaders) => {

            //const filename = path.join('/tmp', 'output.csv');
            filename = filename.substring(0, filename.lastIndexOf(".")) + filename.substring(filename.lastIndexOf("."));
            //console.log(filename);
            const path = `${filename}`;
            const output = []; // holds all rows of data

            const headers = {};
            for (let field of displayFields) {
                headers[field] = tableHeaders[field];
            }
            dataToWrite.unshift(headers)

            dataToWrite.forEach((d) => {
                const csvline = [];
                for (let field of displayFields) {
                    const lineText = d[field].toString().replace(/(<([^>]+)>)/ig, "");

                    csvline.push('"' + lineText + '"');
                }
                output.push(csvline.join());
            });
            dataToWrite.shift();

            fs.writeFileSync(path, output.join(os.EOL));

            let uploadResponse;
            try {
                uploadResponse = await Knack.upload({
                    type: 'file',
                    body: {
                        name: filename,
                        files: {
                            value: fs.createReadStream(path),
                            options: {
                                filename,
                                contentType: 'text/csv'
                            }
                        }
                    }
                });

                uploadResponse = JSON.parse(uploadResponse);
            } catch (catched) {

                try {
                    const error = JSON.parse(catched.error);
                    //uploadCode = catched.statusCode;
                    uploadResponse = error;
                } catch (error) {
                    //uploadCode = catched.statusCode;
                    uploadResponse = catched.message;
                }
            }

            fs.unlink(path, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });

            return {
                file: uploadResponse,
                //status: uploadCode
            };
        }

        const generateIntelcomSiteList = async (dataToWrite, filename) => {

            // console.log("file name: ", filename)
            filename = filename.substring(0, filename.lastIndexOf(".")) + filename.substring(filename.lastIndexOf("."));
            // console.log("file name after: ", filename)
            const wb = new xl.Workbook();
            const ws = wb.addWorksheet('proposals');

            const path = `./files/${filename}.xlsx`

            const title = "CONTRAX - INTELCOM TEMPORARY WORKER ATTENDANCE SHEET"
            const info1 = "This is the attendance sheet for each day you have temporary workers on site. Please ensure that once completed that the workers sign in their designated row."
            const info2 = "Supervisors will also need to initial next to the workers signature. this determines that the information is correct on that row."
            const jobTitle = filename
            const titles = ['Worker Full Name', 'Staffing Agency Name', "In", "Out", "Total Hours (SUP to enter)", "Workers Signature", "Supervisors Initials", "Site Comments"];

            ws.column(1).setWidth(30);
            ws.column(2).setWidth(33);
            ws.column(5).setWidth(25);
            ws.column(6).setWidth(25);
            ws.column(7).setWidth(18);
            ws.column(8).setWidth(70);

            const style = {
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#FFFF00' },
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
            }

            const style1 = {
                font: { bold: true },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#FFFF00' },
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
            }

            const headersCellStyle = {
                font: { bold: true },
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
            }

            const normalCellStyle = {
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
            }

            ws.cell(1, 1, 1, 8, true).string(title).style({ font: { bold: true, underline: true } });
            ws.cell(2, 1, 2, 8, true).string(info1).style({ font: { bold: true } });
            ws.cell(3, 1, 3, 8, true).string(info2).style({ font: { bold: true } });
            ws.cell(4, 1, 4, 4, true).string(jobTitle).style(style1);

            let headingColumnIndex = 1;
            titles.forEach(heading => {
                ws.cell(5, headingColumnIndex++).string(heading).style(headersCellStyle);
            });

            let rowIndex = 6;
            dataToWrite.forEach(record => {

                ws.cell(rowIndex, 1).string(record.name ? record.name : "").style(style);
                ws.cell(rowIndex, 2).string(record.supplier ? record.supplier : "").style(style);

                ws.cell(rowIndex, 3).string("").style(normalCellStyle);
                ws.cell(rowIndex, 4).string("").style(normalCellStyle);
                ws.cell(rowIndex, 5).string("").style(normalCellStyle);
                ws.cell(rowIndex, 6).string("").style(normalCellStyle);
                ws.cell(rowIndex, 7).string("").style(normalCellStyle);
                ws.cell(rowIndex, 8).string("").style(normalCellStyle);
                rowIndex++;

            });

            const excelBuffer = await wb.writeToBuffer();
            fs.writeFileSync(path, excelBuffer);

            // console.log("after excel write")
            const stream = fs.createReadStream(path)

            let uploadResponse;
            try {
                uploadResponse = await Knack.upload({
                    type: 'file',
                    body: {
                        name: `${filename}.xlsx`,
                        files: {
                            value: stream,
                            options: {
                                filename: `${filename}.xlsx`,
                                contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                            }
                        }
                    }
                });

                uploadResponse = JSON.parse(uploadResponse);
            } catch (catched) {
                console.log("error knack upload: ", catched)
                try {
                    const error = JSON.parse(catched.error);
                    //uploadCode = catched.statusCode;
                    uploadResponse = error;
                } catch (error) {
                    //uploadCode = catched.statusCode;
                    uploadResponse = catched.message;
                }
            }

            // console.log("uploadResponse: ", uploadResponse)

            fs.unlink(path, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });

            return {
                file: uploadResponse,
            };
        }

        server.route({
            method: 'POST',
            path: '/generateIntelcomSiteList',
            handler: async function (request, h) {

                const csvFileName = request.payload.fileName;
                const workers = request.payload.workers;

                const csvFile = await generateIntelcomSiteList(workers, csvFileName);

                // console.log(csvFile)

                return { csvID: csvFile.file.id, csvName: csvFile.file.filename }
            },
            config: {
                payload: {
                    timeout: false
                },
                timeout: {
                    socket: false
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });
        server.route({
            method: 'POST',
            path: '/csv-accepted-clients-intelcolm',
            handler: async function (request, h) {
                const { viewFilters, filename, token, scene, view } = request.payload; // false or {match:"", rules:[]}
                const filters = viewFilters ? `filters=${encodeURIComponent(JSON.stringify(viewFilters))}` : "";
                const records = await getIntelcomlFilterRecords(filters, 1, token, scene, view);
                const workersInformation = getIntelcomWorkerInformation(records);
                const { file } = await generateCSVAcceptedClients(workersInformation, filename);
                return { ...file }
            },
            config: {
                payload: {
                    timeout: false
                },

                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });


        const getIntelcomlFilterRecords = async (filters, page, token, scene, view) => {
            let response = [];
            let error = false;

            try {
                const options = {
                    uri: `https://api.knack.com/v1/pages/scene_${scene}/views/view_${view}/records?${filters}&rows_per_page=1000&page=${page}`,
                    method: 'GET',
                    headers: {
                        'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                        'X-Knack-REST-API-Key': process.env.KNACK_API_KEY,
                        'Authorization': token
                    },
                    retry: 3,
                    accepted: [400, 404, 401, 403],
                    delay: 2000
                };
                const result = await Request(options);
                const form = JSON.parse(result);
                response = form.records
                if (form.total_pages > 1 && page < form.total_pages) {

                    try {
                        const newForm = await getIntelcomlFilterRecords(filters, page + 1, token, scene, view);
                        response = response.concat(newForm);
                    } catch (err) {
                        console.log("recursive error")
                        error = true;
                    }
                }
            } catch (err) {
                console.log("request error")
                error = true
            }

            if (error) {
                throw new Error(
                    JSON.stringify({
                        client: 'KNACK API',
                        errors: [{
                            message: 'Limite de peticiones excedida'
                        }]
                    })
                );
            }

            return response;
        }

        const getIntelcomWorkerInformation = (records) => {
            const workerInformation = records.map((record) => {
                const fullName = record.field_2308_raw;
                const [first_name, ...last_name] = fullName.split(' ');
                return {
                    contingent_worker_id: record.field_2229,
                    first_name,
                    last_name: last_name.join(' ').trim(),
                    pin: record.field_2230_raw,
                    location: record.field_525_raw[0] ? record.field_525_raw[0].identifier : "",
                    agency_id: record.field_102_raw[0] ? record.field_102_raw[0].identifier : "",
                    country: "CAN",
                    status: "A"

                };

            })
            return workerInformation;
        }

        const generateCSVAcceptedClients = async (records, filename) => {
            const path = `${filename}.csv`;
            const output = [];
            const titles = ["Contingent_Worker_ID", "First_Name", "Last_Name", "PIN", "Location", "Agency_ID", "Country", "Status"].join();

            output.push(titles);

            records.forEach((record) => {
                const csvline = [...Object.values(record)];
                output.push(csvline.join());
            });

            fs.writeFileSync(path, output.join(os.EOL));
            const file = fs.createReadStream(path);

            let uploadResponse;

            try {
                uploadResponse = await Knack.upload({
                    type: 'file',
                    body: {
                        name: filename,
                        files: {
                            value: file,
                            options: {
                                filename: `${filename}.csv`,
                                contentType: 'text/csv'
                            }
                        }
                    }
                });

                uploadResponse = JSON.parse(uploadResponse);
            } catch (catched) {

                try {
                    const error = JSON.parse(catched.error);
                    uploadResponse = error;
                } catch (error) {
                    uploadResponse = catched.message;
                }
            }

            await uploadSFTP(path);

            fs.unlink(path, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });

            return {
                file: uploadResponse,

            };
        }

        const uploadSFTP = async (path) => {
            let sftp = new Client();
            await sftp.connect({
                host: process.env.SFTP_HOST,
                port: process.env.SFTP_PORT,
                username: process.env.SFTP_USERNAME,
                password: process.env.SFTP_PASSWORD,
                algorithms: {
                    kex: [
                        "diffie-hellman-group-exchange-sha1", "diffie-hellman-group1-sha1", "diffie-hellman-group14-sha1"
                    ]
                }
            }).then(() => {
                return sftp.fastPut(path, `/import/${path}`);
            })
                .then(() => {
                    return sftp.end();
                })
                .catch(err => {
                    console.error(err.message);
                });

        }

        const acceptOrRejectProposals = async (payload, action) => {

            const proposals = payload.proposalsInfo;
            const userEmail = payload.email;
            const requisitionID = payload.requisitionID;
            const requisition = payload.requisition;
            const requisitionJobTitle = payload.requisitionJobTitle;

            let url;
            if (action == "accept") {
                url = "https://us-api.knack.com/v1/pages/page_1349/views/view_3373/records/"
            } else {
                url = "https://us-api.knack.com/v1/pages/page_1350/views/view_3375/records/"
            }

            const suppliers = [];
            for (let proposal of proposals) {
                if (!suppliers.includes(proposal.supplier)) {
                    suppliers.push(proposal.supplier)
                }
            }

            // console.log("suppliers array: ", suppliers)

            const proposalsBySupplier = [];

            for (let supplier of suppliers) {
                const arrayCurrentSupplier = proposals.filter(proposal => proposal.supplier == supplier);
                proposalsBySupplier.push(arrayCurrentSupplier)
            }

            // console.log("array proposals group by suppliers: ", proposalsBySupplier)

            await Promise.map(proposalsBySupplier, async (groupSupplier) => {
                let emailMessage = "";
                let supplierEMail = "";
                await Promise.map(groupSupplier, async (proposal) => {

                    try {
                        if (proposal.proposalStatus != "Rejected") {
                            const form = { field_2189: "Yes" }
                            const options = {
                                uri: url + proposal.id,
                                method: 'PUT',
                                form: form,
                                headers: {
                                    'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                                    'X-Knack-REST-API-Key': process.env.KNACK_API_KEY
                                },
                                retry: 3,
                                accepted: [400, 404, 401, 403],
                                delay: 2000
                            };
                            await Request(options);

                            // code to update the update on field on all records
                            try {
                                const objectToUpdate = internals.KNACK_OBJECTS_IDS.proposalObject; //'object_12'
                                const idToUpdate = proposal.id;
                                let objects = {
                                    [internals.KNACK_OBJECTS_IDS.proposalObject]: "field_2268",//proposals
                                }
                                const updatedDate = new Date();

                                if (objects[objectToUpdate]) {

                                    await Knack.update({
                                        objectKey: objectToUpdate,
                                        id: idToUpdate,//   Supplier ID 5  Supplier Jheidy Soluntech         5
                                        body: { [objects[objectToUpdate]]: updatedDate }
                                    });

                                }

                            } catch (e) {
                                console.log('error', e);
                            }
                        }

                        emailMessage += `- ${proposal.proposalID} of worker: ${proposal.workerName} \n`;

                    } catch (error) {
                        console.log(error);
                    }

                    supplierEMail = proposal.supplierContactEmail;

                }, {
                    concurrency: 1
                });
                // send email to current supplier
                const statusMessage = action == "accept" ? "accepted" : "rejected";
                emailMessage = `the following proposals for the requisitions ${requisition} - ${requisitionJobTitle}, have been ${statusMessage}. \n` + emailMessage;
                const subject = `Proposals have been ${statusMessage}`;
                if (supplierEMail) {
                    await sendEmailFromNotification(emailMessage, supplierEMail, subject, "scene_1406", "view_3556");
                }
            }, {
                concurrency: 1
            });
            if (payload.blockView) {
                await Knack.update({
                    objectKey: internals.KNACK_OBJECTS_IDS.requisitions,
                    id: requisitionID,
                    body: {
                        field_2186: "No"
                    }
                });

                //Change scenes and view in production
                const userEmailMessageAction = action == "accept" ? "approval" : "rejection";
                const userEmailMessage = `Conexis has completed the Proposal ${userEmailMessageAction} process successfully.You can now return to the Requisition screen and start a new process.`;
                await sendEmailFromNotification(userEmailMessage, userEmail, `Proposals ${userEmailMessageAction} Finished`, "scene_1406", "view_3556");
            }
        }

        server.route({
            method: 'POST',
            path: '/process-proposals',
            handler: async function (request, h) {
                const payload = request.payload;
                // console.log("payload: ", payload)
                if (payload.blockView) {
                    await Knack.update({
                        objectKey: internals.KNACK_OBJECTS_IDS.requisitions,
                        id: payload.requisitionID,
                        body: {
                            field_2186: "Yes"
                        }
                    });
                }

                acceptOrRejectProposals(payload, payload.action);

                return { status: "ok" };
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                pre: [
                    { method: KnackAuth.authenticate_knack }
                ]
            }
        });

        const setDataToOpenPositionsChart = async () => {
            console.log("processing Data for Open positions");
            let buyers;
            try {
                buyers = await Knack.find({
                    objectKey: internals.KNACK_OBJECTS_IDS.Buyer,
                    filters: [{ field: "field_2203", operator: "is not", value: "Yes" }]
                });
            } catch (e) {
                console.log("error getting all the buyers that are allowed to be in the reporting module, skiping report update today")
                buyers = { records: [] }
            }

            // console.log("Number of Buyers: ", buyers.records.length)

            let authUser;
            let mspSuperAdminID;
            let userToken;
            try {
                const options = {
                    uri: `https://us-api.knack.com/v1/applications/${process.env.KNACK_APP_ID}/session`,
                    method: 'POST',
                    form: {
                        email: "developers@soluntech.com",
                        password: "Avvera333*"
                    },

                    json: true
                    ,
                    retry: 3,
                    accepted: [400, 404, 401, 403],
                    delay: 5000
                };

                authUser = await Request(options);

                mspSuperAdminID = authUser.session.user.profile_objects[0].entry_id;
                userToken = authUser.session.user.token;
            } catch (e) {
                console.log("error logging with msp super admin account skiping update of open positions chart today");
                return
            }

            // const mspSuperAdmin = await Knack.findById({
            //     objectKey: internals.KNACK_OBJECTS_IDS.mspSuperAdmin,
            //     id: mspSuperAdminID
            // });

            const openPositions = []
            await Promise.map(buyers.records, async (buyer) => {

                // console.log("in buyer")
                try {
                    await Knack.update({
                        objectKey: internals.KNACK_OBJECTS_IDS.mspSuperAdmin,
                        id: mspSuperAdminID,
                        body: {
                            field_2198: [buyer.id]
                        }
                    });
                } catch (e) {
                    console.log("error updating msp buyer super admin to the current buyer, skiped for buyer: ", buyer.field_1);
                    return
                }

                const optionsReport = {
                    uri: `https://us-api.knack.com/v1/scenes/scene_1430/views/view_3690/report`,
                    method: 'GET',
                    json: true,
                    headers: {
                        'X-Knack-Application-ID': process.env.KNACK_APP_ID,
                        'X-Knack-REST-API-Key': process.env.KNACK_API_KEY,
                        'Authorization': userToken
                    },
                    retry: 3,
                    accepted: [400, 404, 401, 403],
                    delay: 5000
                };
                let reportData;
                let NumberOfOpenPositions;
                try {
                    reportData = await Request(optionsReport);
                    NumberOfOpenPositions = reportData.reports[0].records.length ? reportData.reports[0].records[0].calc_0 : 0;
                } catch (e) {
                    console.log("error getting Data from the pivot table for the current buyer: ", buyer.field_1);
                    NumberOfOpenPositions = 0;
                }
                // console.log("current Report Data: ", reportData)

                const currentBuyerData = {
                    buyer: buyer.field_1,
                    numberOfOpenPositions: NumberOfOpenPositions
                }

                openPositions.push(currentBuyerData);

                // check in "Open Positions Data" object if there is any record from the current month connected to the current buyer
                let currentOpenPositions;
                try {
                    currentOpenPositions = await Knack.find({
                        objectKey: internals.KNACK_OBJECTS_IDS.OpenPositionsData,
                        filters: [
                            { field: "field_2206", operator: "is", value: buyer.id },
                            { field: "field_2205", operator: "is during the current", type: "month" }
                        ]
                    });
                } catch (e) {
                    console.log("error finding 'Open positions Data' records for the current month for the buyer: ", buyer.field_1)
                }

                if (currentOpenPositions) {
                    if (currentOpenPositions.records.length) {
                        // there is a record for this month update the record
                        if (NumberOfOpenPositions != currentOpenPositions.records[0].field_2207) {
                            try {
                                await Knack.update({
                                    objectKey: internals.KNACK_OBJECTS_IDS.OpenPositionsData,
                                    id: currentOpenPositions.records[0].id,
                                    body: {
                                        field_2207: NumberOfOpenPositions
                                    }
                                });
                            } catch (e) {
                                console.log("error updating 'Open positions Data' record for the current month for the buyer: ", buyer.field_1)
                            }
                        }
                    } else {
                        // there is no record for this month create the record
                        try {
                            await Knack.create({
                                objectKey: internals.KNACK_OBJECTS_IDS.OpenPositionsData,
                                body: {
                                    field_2206: buyer.id,
                                    field_2207: NumberOfOpenPositions
                                }
                            });
                        } catch (e) {
                            console.log("error creating new 'Open positions Data' record for the current month for the buyer: ", buyer.field_1)
                        }
                    }
                }


            }, {
                concurrency: 1
            });

            // console.log("final Data: ", openPositions)
            console.log("Finish Creating or updating all the Data of the 'open positions data' object for the current Date");

        }

        server.route({
            method: 'POST',
            path: '/data-open-positions',
            handler: async function (request, h) {

                setDataToOpenPositionsChart();

                return { status: "ok" };
            },
            config: {
                timeout: {
                    socket: 9000000
                },
                // pre: [
                //     { method: KnackAuth.authenticate_knack }
                // ]
            }
        });

        server.route({
            method: "POST",
            path: "/check-candidate-pinnumber",
            handler: async function (request, h) {
                const { candidates, proposalId } = request.payload;
                const withoutPinNumber = [];
                await Promise.map(
                    candidates,
                    async (candidate) => {
                        try {

                            const options = {
                                uri: `https://api.knack.com/v1/objects/object_30/records/${candidate.id}`,
                                method: "PUT",
                                headers: {
                                    "X-Knack-Application-ID": process.env.KNACK_APP_ID,
                                    "X-Knack-REST-API-Key": process.env.KNACK_API_KEY,
                                },
                                retry: 3,
                                accepted: [400, 404, 401, 403],
                                delay: 2000,
                            };
                            let candidateData = await Request(options);

                            // code to update the update on field on all records
                            try {
                                const objectToUpdate = internals.KNACK_OBJECTS_IDS.Worker; //'object_30'
                                const idToUpdate = candidate.id;
                                let objects = {
                                    [internals.KNACK_OBJECTS_IDS.Worker]: "field_2299", // worker
                                }
                                const updatedDate = new Date();

                                if (objects[objectToUpdate]) {

                                    await Knack.update({
                                        objectKey: objectToUpdate,
                                        id: idToUpdate,//   Supplier ID 5  Supplier Jheidy Soluntech         5
                                        body: { [objects[objectToUpdate]]: updatedDate }
                                    });

                                }

                            } catch (e) {
                                console.log('error', e);
                            }
                            candidateData = JSON.parse(candidateData);
                            if (candidateData.field_2248 === "") {
                                withoutPinNumber.push({ id: candidateData.id, name: candidateData.field_303, pinNumber: "" });
                            } else {
                                withoutPinNumber.push({ id: candidateData.id, name: candidateData.field_303, pinNumber: candidateData.field_2248 });
                            }
                            await Knack.delete({
                                objectKey: internals.KNACK_OBJECTS_IDS.proposalObject,
                                id: proposalId,
                            });

                        } catch (error) {
                            console.log(error);
                        }

                    },
                    {
                        concurrency: 1,
                    }
                );

                return { withoutPinNumber };
            },
            config: {
                payload: {
                    timeout: false,
                },

                timeout: {
                    socket: 9000000,
                },
                pre: [{ method: KnackAuth.authenticate_knack }],
            },
        });

        server.route({
            method: "POST",
            path: "/update-candidate-pinnumber",
            handler: async function (request, h) {
                const { candidates, newCandidates } = request.payload;
                const candidatesToUpdate = newCandidates.filter((candidate, index) => candidate.value !== candidates[index].pinNumber);

                await Promise.map(
                    candidatesToUpdate,
                    async (candidate) => {
                        try {
                            await Knack.update({
                                objectKey: internals.KNACK_OBJECTS_IDS.Worker,
                                id: candidate.name,
                                body: {
                                    field_2248: candidate.value,
                                },
                            });

                        } catch (error) {
                            console.log(error);
                        }

                    },
                    {
                        concurrency: 1,
                    }
                );

                return { msg: "ok" };
            },
            config: {
                payload: {
                    timeout: false,
                },

                timeout: {
                    socket: 9000000,
                },
                pre: [{ method: KnackAuth.authenticate_knack }],
            },
        });
        // add proposal for intelcom route 
        server.route({
            method: "POST",
            path: "/add-proposals-intelcom",
            handler: async function (request, h) {
                const proposal = request.payload.proposalToCreate;
                const userId = request.payload.userId
                const candidates = request.payload.candidates;
                const costCenter = request.payload.costCenter;
                const supplierCode = await getSupplierCode(proposal.field_102_raw[0])
                await addProposalsIntelcom(proposal, userId, candidates, costCenter, supplierCode);
                return {
                    status: "ok",
                    message: "Proposals created",
                };
            },
            config: {
                timeout: {
                    socket: 9000000,
                },
                pre: [{ method: KnackAuth.authenticate_knack }],
            },
        });
        //function to add new proposals
        const addProposalsIntelcom = async (proposal, userId, candidates, costCenter, supplierCode) => {
            await Promise.map(
                candidates,
                async (worker) => {
                    const mappingIdField = createMappingID(costCenter, supplierCode, worker.value);
                    try {
                        await Knack.create({
                            objectKey: internals.KNACK_OBJECTS_IDS.proposalObject,
                            body: {
                                field_102: proposal.field_102_raw.length > 0 ? proposal.field_102_raw[0].id : "",
                                field_873: proposal.field_873,
                                field_1246: proposal.field_1246,
                                //field_105: proposal.field_105_raw.id,
                                //field_270: proposal.field_270_raw.id, // revisar
                                //field_271: proposal.field_271_raw.id,
                                field_107: proposal.field_107_raw,
                                field_272: proposal.field_272_raw,
                                field_302: proposal.field_302_raw,
                                field_721: proposal.field_721_raw,
                                field_1903: proposal.field_1903_raw,
                                field_884: proposal.field_884_raw,
                                field_309: worker.name,
                                field_322: userId,
                                field_103: proposal.field_103_raw.length > 0 ? proposal.field_103_raw[0].id : "",
                                field_276: userId,
                                field_214: proposal.field_214,
                                field_276: proposal.field_276_raw.length > 0 ? proposal.field_276_raw[0].id : "",
                                field_677: proposal.field_677_raw[0].id,
                                field_1266: proposal.field_1266_raw.length > 0 ? proposal.field_1266_raw[0].id : "",
                                field_751: proposal.field_751 == '' ? 0 : proposal.field_751,
                                field_754: proposal.field_754 == '' ? 0 : proposal.field_754,
                                field_752: proposal.field_752 == '' ? 0 : proposal.field_752,
                                field_755: proposal.field_755 == '' ? 0 : proposal.field_755,
                                field_753: proposal.field_753 == '' ? 0 : proposal.field_753,
                                field_756: proposal.field_756 == '' ? 0 : proposal.field_756,
                                field_757: proposal.field_757 == '' ? 0 : proposal.field_757,
                                field_758: proposal.field_758 == '' ? 0 : proposal.field_758,
                                field_759: proposal.field_759 == '' ? 0 : proposal.field_759,
                                field_870: proposal.field_870,
                                field_1449: proposal.field_1449,
                                field_1072: proposal.field_1072,
                                ...mappingIdField
                            },
                        });
                    } catch (catched) {
                        //console.log("Error creating Card");
                        //console.log(JSON.parse(catched.error));

                        let error;

                        try {
                            error = catched.error
                                ? JSON.parse(catched.error)
                                : "Unexpected error creating Card";
                            console.error(`Error creating creating Card`);
                            console.error(error);
                            console.error(
                                "-------------------------------------------------------------"
                            );
                        } catch (e) {
                            console.error(catched);
                        }
                    }
                },
                {
                    concurrency: 1,
                }
            );
        }

        const getSupplierCode = async (supplier) => {
            try {

                const options = {
                    uri: `https://api.knack.com/v1/objects/object_2/records/${supplier.id}`,
                    method: "PUT",
                    headers: {
                        "X-Knack-Application-ID": process.env.KNACK_APP_ID,
                        "X-Knack-REST-API-Key": process.env.KNACK_API_KEY,
                    },
                    retry: 3,
                    accepted: [400, 404, 401, 403],
                    delay: 2000,
                };
                let response = await Request(options);

                // code to update the update on field on all records
                try {
                    const objectToUpdate = internals.KNACK_OBJECTS_IDS.Suppliers; //'object_2'
                    const idToUpdate = supplier.id;
                    let objects = {
                        [internals.KNACK_OBJECTS_IDS.Suppliers]: "field_2261", // supplier'
                    }
                    const updatedDate = new Date();

                    if (objects[objectToUpdate]) {

                        await Knack.update({
                            objectKey: objectToUpdate,
                            id: idToUpdate,//   Supplier ID 5  Supplier Jheidy Soluntech         5
                            body: { [objects[objectToUpdate]]: updatedDate }
                        });

                    }

                } catch (e) {
                    console.log('error', e);
                }
                response = JSON.parse(response);
                return response.field_2249;
            } catch (error) {
                console.log(error);
            }

        }

        const createMappingID = (costCenter, supplierCode, candidate) => {
            const checkCriterials = /^[0-9]{2}$/.test(supplierCode) && /^[a-zA-Z]{4}$/.test(costCenter) && /^[0-9]{4}$/.test(candidate)
            const mappingId = checkCriterials ? `${costCenter}${supplierCode}${candidate}` : null
            return mappingId ? { field_2229: mappingId } : {};
        }


        server.route({
            method: "POST",
            path: "/send-emails-to-supplier",
            handler: async function (request, h) {
                sendEmailsToProposerSupplir(request.payload);
                return { msg: "ok" };
            },
            config: {
                payload: {
                    timeout: false,
                },

                timeout: {
                    socket: 9000000,
                },
                pre: [{ method: KnackAuth.authenticate_knack }],
            },
        });

        const sendEmailsToProposerSupplir = async ({
            supplierId,
            proposalId,
            requisitionAndJobTitle,
            status,
            proposalNote,
        }) => {
            const capitalizeStatus =
                status.charAt(0).toUpperCase() + status.slice(1);
            const subject = `Your Proposal Was ${capitalizeStatus}`;
            const message = `Your Proposal ID <strong>${proposalId}</strong> for Requisition <strong>${requisitionAndJobTitle}</strong> was ${status} by the Buyer and has moved on to onboarding.
            Buyer Note:
            
            ${proposalNote}`;

            const emailsToSend = await getContactEmailsFromSupplier(supplierId);

            if (emailsToSend.length > 0) {
                await sendEmailsToSupplier(message, subject, emailsToSend);
            }
        }

        const getContactEmailsFromSupplier = async (supplierId) => {
            let supplier = {};
            let emails = [];
            try {
                supplier = await Knack.findById({
                    objectKey: internals.KNACK_OBJECTS_IDS.Suppliers,
                    id: supplierId,
                });
            } catch (catched) {
                errorCode = 500;
            }

            emails = [
                supplier["field_14_raw"].email,
                supplier["field_1412_raw"].email,
                supplier["field_1413_raw"].email,
            ];

            const emailsToSend = emails.filter(
                (email, index) => email.trim() !== "" && emails.indexOf(email) === index
            );

            return emailsToSend;
        };


        const sendEmailsToSupplier = async (message, subject, emailsToSend) => {
            await Promise.map(
                emailsToSend,
                async (email) => {
                    try {
                        await sendEmailFromNotification(
                            message,
                            email,
                            subject,
                            "scene_1406",
                            "view_3556"
                        );
                    } catch (catched) {
                        errors.push(`Error sending emails: ${email}`);
                    }
                },
                {
                    concurrency: 1,
                }
            );
        };

        server.route({
            method: "POST",
            path: "/send-email-of-requisition-filled",
            handler: async function (request, h) {
                sendEmailsToSuppliersAndProposer(request.payload);
                return { msg: "ok" };
            },
            config: {
                payload: {
                    timeout: false,
                },

                timeout: {
                    socket: 9000000,
                },
                pre: [{ method: KnackAuth.authenticate_knack }],
            },
        });


        const getContactEmailsFromSupplierDistribution = async (suppliers) => {
            let emails = [];
            await Promise.map(
                suppliers,
                async (supplier) => {
                    const emailsToSend = await getContactEmailsFromSupplier(supplier.id);
                    emails = [...emails, ...emailsToSend];
                },
                {
                    concurrency: 1,
                }
            );

            return emails
        }


        const sendEmailsToProposer = async (proposals, reqAndJob, filledNote) => {
            await Promise.map(
                proposals,
                async (proposal) => {

                    const proposerEmail = proposal["field_276.field_194_raw"];
                    const proposalID = proposal["field_145"];
                    if (proposerEmail) {

                        const message = `Your Proposal ID ${proposalID} for Requisition ${reqAndJob} was rejected because the requisition has been filled.

                        Note: ${filledNote}`;
                        const subject = 'Your Proposal Was Rejected';
                        try {
                            await sendEmailFromNotification(
                                message,
                                proposerEmail.email,
                                subject,
                                "scene_1406",
                                "view_3556"
                            );
                        } catch (catched) {
                            errors.push(`Error sending emails: ${email}`);
                        }
                    }
                },
                {
                    concurrency: 1,
                }
            );

        }


        const sendEmailsToSuppliersAndProposer = async ({ proposals, declineValue, requisitionId, suppliers, jobTitle, filledNote }) => {
            const messageSupplier = `Requisition ID ${requisitionId} - ${jobTitle} has been filled`;
            const subjectSupplier = `Requisition ID ${requisitionId} filled`;

            const emails = await getContactEmailsFromSupplierDistribution(suppliers);
            await sendEmailsToSupplier(messageSupplier, subjectSupplier, emails);

            if (declineValue === "Yes" && proposals.length > 0) {
                sendEmailsToProposer(proposals, `${requisitionId} - ${jobTitle}`, filledNote);
            }
        }
    }
};