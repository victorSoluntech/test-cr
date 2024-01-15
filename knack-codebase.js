function initFreshChat() {
    window.fcWidget.init({
        token: "a151f399-7e04-44f5-9751-490f6302149b",
        host: "https://wchat.freshchat.com",
        //externalId: Knack.getUserAttributes().id,
        //firstName: Knack.getUserAttributes().name,
        //email: Knack.getUserAttributes().email
    });
    // To set unique user id in your system when it is available
    window.fcWidget.setExternalId(Knack.getUserAttributes().id);

    // To set user name
    window.fcWidget.user.setFirstName(Knack.getUserAttributes().name);

    // To set user email
    window.fcWidget.user.setEmail(Knack.getUserAttributes().email);
}
function initialize(i, t) {
    var e;
    i.getElementById(t)
        ? initFreshChat()
        : (((e = i.createElement("script")).id = t),
            (e.async = !0),
            (e.src = "https://wchat.freshchat.com/js/widget.js"),
            (e.onload = initFreshChat),
            i.body.appendChild(e));
}
function initiateCall() {

    initialize(document, "freshchat-js-sdk");
    // To set unique user id in your system when it is available
    // window.fcWidget.setExternalId("john.doe1987");

    // // To set user name
    // window.fcWidget.user.setFirstName("John");

    // // To set user email
    // window.fcWidget.user.setEmail("john.doe@gmail.com");

    // To set user properties
    // window.fcWidget.user.setProperties({
    //     plan: "Pro",                 // meta property 1
    //     status: "Active"                // meta property 2
    // });
}
window.addEventListener
    ? window.addEventListener("load", initiateCall, !1)
    : window.attachEvent("load", initiateCall, !1);

LazyLoad.js(
    ["https://rum-static.pingdom.net/pa-5f6a0ec18e83fa0015000bb8.js"],
    function () {
        // console.log("monitor loaded")
    }
);

LazyLoad.js(
    ["https://rum-static.pingdom.net/pa-5f98475d68ed110013000152.js"],
    function () {
        //test for avvera, will be deleted soon
        // console.log("monitor loaded2")
    }
);

$(document).on("knack-record-update.view_979", function (event, view, record) {
    //location.reload();
    window.location.replace(
        "https://contraxvms.knack.com/mycontrax#requisition-dashboard/proposals2/"
    );
});

$(document).on("knack-record-update.view_980", function (event, view, record) {
    //location.reload();
    window.location.replace(
        "https://contraxvms.knack.com/mycontrax#requisition-dashboard/proposals2/"
    );
});

$(document).on("knack-record-update.view_981", function (event, view, record) {
    //location.reload();
    window.location.replace(
        "https://contraxvms.knack.com/mycontrax#requisition-dashboard/proposals2/"
    );
});

//view 812 is Proposal Dashboard -> Proposals -> form to respond to negotiation
$(document).on("knack-record-update.view_812", function (event, view, record) {
    //location.reload();
    window.location.replace(
        "https://contraxvms.knack.com/mycontrax#proposal-dashboard/proposals5/"
    );
});

//view 909 is Requisition DB -> Contracts -> View Contract -> Add Standard Onboarding Activities
$(document).on("knack-record-update.view_909", function (event, view, record) {
    location.reload();
});

//view 967 is Buyer Admin DB -> Contracts -> View Contract -> Add Standard Onboarding Activities
$(document).on("knack-record-update.view_967", function (event, view, record) {
    location.reload();
});

//view 927 is Enable Buyer Access form on Contrax Admin Dashboard
$(document).on("knack-record-create.view_927", function (event, view, record) {
    location.reload();
});

//view_1023 is "Fix T&E Start Date Form"
$(document).on("knack-record-update.view_1023", function (event, view, record) {
    location.reload();
});

//view_1073 is "Fix T&E Start Date Form" for Supplier Admin viewing Proposal DB -> Contract -> T&E line items
$(document).on("knack-record-update.view_1073", function (event, view, record) {
    location.reload();
});

//view_1415 is Contrax Admin DB -> Enable Supplier Admin Access
$(document).on("knack-record-create.view_1415", function (event, view, record) {
    location.reload();
});
//view_2475 is update contract to create PH invoice
$(document).on("knack-record-create.view_2475", function (event, view, record) {
    location.reload();
});
const UpdateFavicon = function () {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://favicon42.s3.us-east-2.amazonaws.com/conexs.ico'; // Update this reference with your favicon URL path
    document.getElementsByTagName('head')[0].appendChild(link);
}

$(document).on('knack-scene-render.any', function (event, scene) {
    UpdateFavicon();
});
//Change add another option text on candidate field for all add proposal forms on supplier side
$(document).on("knack-view-render.view_509", function (event, view, data) {
    $(".kn-add-option").text("+ Add Candidate");
});

$(document).on("knack-view-render.view_1081", function (event, view, data) {
    $(".kn-add-option").text("+ Add Candidate");
});

$(document).on("knack-view-render.view_1082", function (event, view, data) {
    $(".kn-add-option").text("+ Add Candidate");
});

$(document).on("knack-view-render.view_1080", function (event, view, data) {
    $(".kn-add-option").text("+ Add Candidate");
});

$(document).on("knack-view-render.view_1201", function (event, view, data) {
    $(".kn-add-option").text("+ Add Candidate");
});
//end change supplier side proposals

$(document).on("knack-view-render.any", function (event, view) {
    if (view.type != "login") {
        return;
    }
    console.log(view);
    $("input[name='email']").attr("placeholder", "Username");
    $("#email").after("<i class='fa fa-user'</i>");
    $("input[name='password']").attr("placeholder", "Password");
    $("#password").after("<i class='fa fa-lock'</i>");
    $(".login_form .kn-button").attr("value", "LOGIN");
    $(".login_form").prepend("<a class='forgot-password'>forgot password?</a>");
    $(".forgot-password").attr("href", $("#forgot-pass").attr("href"));
    $("#" + view.key + " form.login_form").append(
        "<div class='login-info'><ul><li>Customer Support</li><li><b>Email: customerhelp@conexis.io</b></li><li><b>Toll Free: (833) 780-0720</b></li><li><b>Monday - Friday (9:00 AM to 5:00 PM EST)</b></li></div>"
    );
});

// SOLUNTECH
//KnackInitAsync = function ($, callback) {
window.$ = $;
window.jQuery = $;
window.LazyLoad = LazyLoad;

LazyLoad.js(["https://global.localizecdn.com/localize.js"], function () {
    !(function (a) {
        if (!a.Localize) {
            a.Localize = {};
            for (
                var e = [
                    "translate",
                    "untranslate",
                    "phrase",
                    "initialize",
                    "translatePage",
                    "setLanguage",
                    "getLanguage",
                    "detectLanguage",
                    "getAvailableLanguages",
                    "untranslatePage",
                    "bootstrap",
                    "prefetch",
                    "on",
                    "off",
                    "hideWidget",
                    "showWidget",
                ],
                t = 0;
                t < e.length;
                t++
            )
                a.Localize[e[t]] = function () { };
        }
    })(window);
    Localize.initialize({
        key: "8QgjNVpSWcju3",
        rememberLanguage: true,
        // other options go here, separated by commas
    });
});

LazyLoad.js(
    [
        "https://s3.amazonaws.com/soluntech-www/KnackJS/soluntech-knack-lib-min.js",
        "https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"
    ],
    function () {
        var lib = new Soluntech({
            applicationID: atob(
                atob("TlRnelpHRXdZek0xT0RJMU5tWTJZVEpsWlRVNE9EZGs=")
            ),
            restAPIkey: atob(
                atob(
                    "TjJNME16TTVOakF0WWpZMU15MHhNV1UyTFRnMVlqUXRZVE5oWldZek1qWmxObVpr"
                )
            ),
            environment: "development",
            knackURL: "https://us-api.knack.com/v1/"
        });

        //window.lib = lib

        lib.set("OBJECTS_IDS", {
            Account: "object_5",
            BuyerInvoice: "object_45",
            Contract: "object_6",
            ContractInvoice: "object_35",
            SupplierInvoice: "object_44",
            TimeExpense: "object_33",
            lineItems: "object_37",
            contractAmendment: "object_47",
            proposalObject: "object_12",
            Worker: "object_30",
            Buyer: "object_1",
            Supplier: "object_2",
            BusinessUnit: "object_56",
            GLCode: "object_58",
            CostCenter: "object_25",
            BuyerAdmin: "object_24",
            SupplierAdmin: "object_13",
            Requester: "object_20",
            Approver: "object_21",
            BuyerFinance: "object_22",
            SupplierFinance: "object_39",
            Proposer: "object_23",
            Daily_scan: "object_62",
            ProcessLog: "object_68",
        });

        //lib.set("CONEXIS_SERVER", "https://avvera.download/api/v1/");
        lib.set("CONEXIS_SERVER", "https://conexisapi.conexisvms.com/api/v1/");
        //lib.set("CONEXIS_SERVER", "https://conexis.soluntech.com/api/v1/");
        // lib.set('CONEXIS_SERVER', 'https://de0ff3a520c4.ngrok.io/api/v1/');

        lib.addMethod("removeMessages", function (view) {
            $("#" + view + " form .is-error").remove();
            $("#" + view + " .is-error").remove();
            $("#" + view + " .success").remove();
        });

        lib.addMethod("showSuccessMessage", function (view, text) {
            $("#" + view + " form").prepend(
                $("<div>")
                    .addClass("kn-message success")
                    .append(
                        $("<span>")
                            .addClass("kn-message-body")
                            .append($("<p>").append($("<strong>").html(text)))
                    )
            );
        });

        lib.addMethod("customShowSuccessMessage", function (view, text) {
            lib.removeMessages(view);
            $("#" + view + " #custom-success-msg").prepend(
                $("<div>")
                    .addClass("kn-message success")
                    .append(
                        $("<span>")
                            .addClass("kn-message-body")
                            .append($("<p>").append($("<strong>").html(text)))
                    )
            );
        });

        lib.addMethod("showErrorMessage", function (view, text) {
            lib.removeMessages(view);
            // if (document.getElementById('')) {
            if ($("#" + view + " #custom-errors-msg").length > 0) {
                $("#custom-errors-msg .kn-message-body").append(
                    $("<p>").append($("<strong>").html(text))
                );
            } else {
                $("#" + view + " form").prepend(
                    $("<div>")
                        .attr("id", "custom-errors-msg")
                        .addClass("kn-message is-error")
                        .append(
                            $("<span>")
                                .addClass("kn-message-body")
                                .append($("<p>").append($("<strong>").html(text)))
                        )
                );
            }
        });

        lib.addMethod("customShowErrorMessage", function (view, text) {
            lib.removeMessages(view);
            // if (document.getElementById('')) {
            $("#" + view + " #custom-errors-msg").prepend(
                $("<div>")
                    .attr("id", "custom-errors-msg")
                    .addClass("kn-message is-error")
                    .append(
                        $("<span>")
                            .addClass("kn-message-body")
                            .append($("<p>").append($("<strong>").html(text)))
                    )
            );
        });

        lib.addMethod("showErrorMessageBottom", function (view, text, element) {
            if ($("#" + view + " #bottom-errors-msg").length > 0) {
                $("#bottom-errors-msg .kn-message-body").append(
                    $("<p>").append($("<strong>").html(text))
                );
            } else {
                element.prepend(
                    $("<div>")
                        .attr("id", "bottom-errors-msg")
                        .addClass("kn-message is-error")
                        .append(
                            $("<span>")
                                .addClass("kn-message-body")
                                .append($("<p>").append($("<strong>").html(text)))
                        )
                );
            }
        });

        lib.addMethod("selectAllSuppliers", function () {
            if ($(".select-all-suppliers").attr("checked")) {
                $(".select-supplier").attr("checked", true);
            } else {
                $(".select-supplier").attr("checked", false);
            }
        });

        $(document).on(
            "knack-view-render.view_1288",
            function (event, view, data) {
                $("#" + view.key + " table thead tr").prepend(
                    $("<th>").append(
                        $("<input>")
                            .addClass("select-all-suppliers")
                            .attr("type", "checkbox")
                            .click(lib.selectAllSuppliers)
                    )
                );

                $("#" + view.key + " table tbody tr:not(.kn-table-group)").prepend(
                    $("<td>").append(
                        $("<input>").addClass("select-supplier").attr("type", "checkbox")
                    )
                );

                $("#" + view.key + " table .kn-table-group td").attr("colspan", "12");
            }
        );

        $(document).on("knack-view-render.view_2990", function (event, view, data) {
            // console.log("adad");
            $("#" + view.key + " table thead tr").prepend(
                $("<th>").append(
                    $("<input>")
                        .addClass("select-all-suppliers")
                        .attr("type", "checkbox")
                        .click(lib.selectAllSuppliers)
                )
            );

            $("#" + view.key + " table tbody tr:not(.kn-table-group)").prepend(
                $("<td>").append(
                    $("<input>").addClass("select-supplier").attr("type", "checkbox")
                )
            );

            $("#" + view.key + " table .kn-table-group td").attr("colspan", "13");

            $("#view_2990 .kn-add-filter").click(function (e) {
                $(".kn-modal").addClass("custom-filter-modal");
            });
        }
        );

        lib.addMethod("runInvoicing", function (obj) {
            obj.token = Knack.getUserToken();
            return $.ajax({
                type: "POST",
                url: lib.CONEXIS_SERVER + "save",
                // url: "https://fca6-186-112-205-183.ngrok.io/api/v1/" + "save",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(obj),
            });
        });

        // Get more than 1000 records at once
        lib.addMethod('getAllRecords', function (searchDbObjectID, payload) {
            return new Promise(async (resolve, reject) => {
                try {
                    var records = await lib.find(searchDbObjectID, payload);
                    let filter = JSON.stringify(payload);
                    for (k = 1; k <= records.total_pages; k++) {
                        if (k !== 1) {
                            var other_records = await $.ajax({
                                type: 'GET',
                                headers: lib.headers,
                                url: lib.knackURL + 'objects/' + searchDbObjectID + '/records?rows_per_page=1000' + '&page=' + k + '&filters=' + filter
                            });
                            for (var oc_record of other_records.records) {
                                records.records.push(oc_record);
                            }
                        }
                    }
                    resolve(records)
                } catch (e) {
                    reject(e)
                }

            })
        });

        var getInvoices_HigherLimit = async (detailsView, tableView) => {
            console.log("Detail View: ", detailsView);
            console.log("Table View: ", tableView);
            if (!Knack.views[tableView]) {
                return false;
            } else {
                // var buyerInvoice = Knack.models.view_1296.toJSON().id;
                if (!Knack.models[detailsView]) return false;
                let invoiceDetails = Knack.models[detailsView].attributes;
                var buyer = lib.getFieldValue(invoiceDetails, "field_961", "connection").id;
                console.log("buyer:", buyer);
                try {
                    let filters = Knack.models[tableView].view.source.criteria.rules;
                    console.log("Prerender filters:", filters);
                    filters.push({ field: 'field_440', operator: 'is', value: buyer });
                    console.log("Added filter:", filters);
                    //[{field: 'field_xx',operator:'is',value: 'field_value'}]
                    let filterRecords = await lib.getAllRecords(lib.OBJECTS_IDS.TimeExpense, filters);
                    console.log(filterRecords);

                    let startDate = new Date(invoiceDetails.field_967_raw.unix_timestamp);
                    let endDate = new Date(invoiceDetails.field_968_raw.unix_timestamp);
                    let supplierField = "field_1844";

                    let processedRecords = filterRecords.records.map(teR => {
                        try {
                            let terStart = new Date(lib.getFieldValue(teR, "field_387", "number").unix_timestamp);
                            if (terStart >= startDate && terStart <= endDate) {
                                return returnServerFormat(teR, supplierField);
                            } else {
                                return false;
                            }
                        } catch (e) { console.log(e); return false; }
                    }).filter(r => r ? r : false);
                    console.log("Reformat Records: ", processedRecords);

                    return processedRecords;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            }
        };

        var returnServerFormat = (teR, supplierField) => {
            // Time & Expense Card fields:
            // Field_51 - Supplier
            // Field_377 - Contract
            return {
                id: teR.id,
                field_51_raw: [
                    {
                        id: lib.getFieldValue(teR, supplierField, "connection").id || "",
                        identifier: lib.getFieldValue(teR, supplierField, "connection").identifier,
                    },
                ],
                field_377_raw: [
                    {
                        id: lib.getFieldValue(teR, "field_377", "connection").id || "",
                        identifier: lib.getFieldValue(teR, "field_377", "connection").identifier,
                    },
                ],
            };
        };

        // lib.addTask('Render T&E', 'knack-scene-render.scene_670', async function (event, scene) {
        $(document).on("knack-scene-render.scene_670", async function (event, scene) {
            lib.showSpinner();

            lib.loadLibrary("async", async function () {
                var selectedSuppliers = $(".select-supplier:checkbox:checked");

                let checkedAll = $(".custom_btn").attr("checked");
                console.log("Checked All? ", checkedAll);

                if (selectedSuppliers.length == 0 && !checkedAll) {
                    $("#view_1298 .content h2").text(
                        "You must select at least one supplier."
                    );

                    return lib.hideSpinner();
                }

                // var teSelected = [];
                // for (var i = 0; i < selectedSuppliers.length; i++) {
                //     teSelected.push($(selectedSuppliers[i]).closest("tr")[0].id);
                // }
                var user = Knack.getUserAttributes();
                var buyer = Knack.models.view_1296.toJSON().field_961_raw[0].id;
                var buyerInvoice = Knack.models.view_1296.toJSON().id;
                // var records = Knack.models.view_1288.data.models.map(function (r) {
                //     return r.toJSON();
                // });
                // // var records = Knack.models.view_1295.data.models.map(function (r) { return r.toJSON(); });
                // records = records.filter(function (record) {
                //     if (teSelected.indexOf(record.id) > -1) {
                //         return true;
                //     } else {
                //         return false;
                //     }
                // });
                // records = records.map(function (r) {
                //     return {
                //         id: r.id,
                //         field_51_raw: [
                //             {
                //                 id: lib.getFieldValue(r, "field_51", "connection").id || "",
                //                 identifier: lib.getFieldValue(r, "field_51", "connection")
                //                     .identifier,
                //             },
                //         ],
                //         field_377_raw: [
                //             {
                //                 id:
                //                     lib.getFieldValue(r, "field_377", "connection").id || "",
                //                 identifier: lib.getFieldValue(r, "field_377", "connection")
                //                     .identifier,
                //             },
                //         ],
                //     };
                // });
                // console.log({ teSelected, user, buyer, buyerInvoice, records });
                // // console.log(JSON.stringify({teSelected, user, buyer, buyerInvoice, records}));

                let tableTotalRecords = Knack.models.view_1288.data.total_records;
                console.log("Total records on table: ", tableTotalRecords);
                var records = "";
                var teSelected = [];
                if (checkedAll && tableTotalRecords > 1000) {
                    console.log("Using higher limit function...");
                    let detailsView = "view_1296";
                    let tableView = "view_1288";
                    records = await getInvoices_HigherLimit(detailsView, tableView);
                    if (!records) {
                        $("#view_1298 .content h2").text(
                            "Error handling over 1000 records."
                        );
                        return lib.hideSpinner();
                    }
                    teSelected.length = 1000;
                    // lib.hideSpinner();
                    // return console.log("No need to continue");
                }
                else {
                    // lib.hideSpinner();
                    // return console.log("emergency break");
                    for (var i = 0; i < selectedSuppliers.length; i++) {
                        teSelected.push($(selectedSuppliers[i]).closest("tr")[0].id);
                    }
                    records = Knack.models.view_1288.data.models.map(function (r) {
                        return r.toJSON();
                    });
                    records = records.filter(function (record) {
                        if (teSelected.indexOf(record.id) > -1) {
                            return true;
                        } else {
                            return false;
                        }
                    });

                    let supplierField = "field_51";
                    records = records.map(function (teR) {
                        return returnServerFormat(teR, supplierField);
                    });
                }

                var obj = { teSelected, user, buyer, buyerInvoice, records };
                console.log(obj);
                // return;

                lib.runInvoicing(obj)
                    .then(function (resp) {
                        if (obj.teSelected.length > 100) {
                            $("#view_1298 .content h2").text(
                                "Your records will be proccessed, please wait a few minutes and refresh the page."
                            );
                            lib.hideSpinner();
                            setTimeout(function () {
                                lib.hideSpinner();
                                window.history.back();
                            }, 10000);
                        } else {
                            setTimeout(function () {
                                lib.hideSpinner();
                                window.history.back();
                            }, 3000);
                        }
                    })
                    .fail(function (err) {
                        $("#view_1298 .content h2").text(
                            "There was an error in the process please try again."
                        );
                        lib.hideSpinner();
                        setTimeout(function () {
                            lib.hideSpinner();
                            window.history.back();
                        }, 10000);
                    });
            });
        });

        $(document).on("knack-scene-render.scene_1239", async function (event, scene) {
            lib.showSpinner();

            lib.loadLibrary("async", async function () {
                var selectedSuppliers = $(".select-supplier:checkbox:checked");

                let checkedAll = $(".custom_btn").attr("checked");
                console.log("Checked All? ", checkedAll);

                if (selectedSuppliers.length == 0 && !checkedAll) {
                    $("#view_2997 .content h2").text(
                        "You must select at least one supplier."
                    );

                    return lib.hideSpinner();
                }

                // var teSelected = [];
                // for (var i = 0; i < selectedSuppliers.length; i++) {
                //     teSelected.push($(selectedSuppliers[i]).closest("tr")[0].id);
                // }
                var user = Knack.getUserAttributes();
                var buyer = Knack.models.view_2998.toJSON().field_961_raw[0].id;
                var buyerInvoice = Knack.models.view_2998.toJSON().id;
                // var records = Knack.models.view_2990.data.models.map(function (r) {
                //     return r.toJSON();
                // });
                // // var records = Knack.models.view_2999.data.models.map(function (r) { return r.toJSON(); });
                // records = records.filter(function (record) {
                //     if (teSelected.indexOf(record.id) > -1) {
                //         return true;
                //     } else {
                //         return false;
                //     }
                // });
                // records = records.map(function (r) {
                //     return {
                //         id: r.id,
                //         field_51_raw: [
                //             {
                //                 id: lib.getFieldValue(r, "field_51", "connection").id || "",
                //                 identifier: lib.getFieldValue(r, "field_51", "connection")
                //                     .identifier,
                //             },
                //         ],
                //         field_377_raw: [
                //             {
                //                 id:
                //                     lib.getFieldValue(r, "field_377", "connection").id || "",
                //                 identifier: lib.getFieldValue(r, "field_377", "connection")
                //                     .identifier,
                //             },
                //         ],
                //     };
                // });
                // console.log({ teSelected, user, buyer, buyerInvoice, records });
                // // console.log(JSON.stringify({teSelected, user, buyer, buyerInvoice, records}));

                let tableTotalRecords = Knack.models.view_2990.data.total_records;
                console.log("Total records on table: ", tableTotalRecords);
                var records = "";
                var teSelected = [];
                if (checkedAll && tableTotalRecords > 1000) {
                    console.log("Using higher limit function...");
                    let detailsView = "view_2998";
                    let tableView = "view_2990";
                    records = await getInvoices_HigherLimit(detailsView, tableView);
                    if (!records) {
                        $("#view_1298 .content h2").text(
                            "Error handling over 1000 records."
                        );
                        return lib.hideSpinner();
                    }
                    teSelected.length = 1000;
                    // lib.hideSpinner();
                    // return console.log("No need to continue");
                }
                else {
                    // lib.hideSpinner();
                    // return console.log("emergency break");
                    for (var i = 0; i < selectedSuppliers.length; i++) {
                        teSelected.push($(selectedSuppliers[i]).closest("tr")[0].id);
                    }
                    records = Knack.models.view_2990.data.models.map(function (r) {
                        return r.toJSON();
                    });
                    records = records.filter(function (record) {
                        if (teSelected.indexOf(record.id) > -1) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    let supplierField = "field_51";
                    records = records.map(function (teR) {
                        return returnServerFormat(teR, supplierField);
                    });
                }

                var obj = { teSelected, user, buyer, buyerInvoice, records };
                console.log(obj);
                // return;

                lib.runInvoicing(obj)
                    .then(function (resp) {
                        if (obj.teSelected.length > 100) {
                            $("#view_2997 .content h2").text(
                                "Your records will be proccessed, please wait a few minutes and refresh the page."
                            );
                            lib.hideSpinner();
                            setTimeout(function () {
                                lib.hideSpinner();
                                window.history.back();
                            }, 10000);
                        } else {
                            setTimeout(function () {
                                lib.hideSpinner();
                                window.history.back();
                            }, 3000);
                        }
                    })
                    .fail(function (err) {
                        $("#view_2997 .content h2").text(
                            "There was an error in the process please try again."
                        );
                        lib.hideSpinner();
                        setTimeout(function () {
                            lib.hideSpinner();
                            window.history.back();
                        }, 10000);
                    });
            });
        }
        );

        // lib.addTask('Delete Buyer Invoice', 'knack-view-render.view_1318', function (event, view, data) {
        $(document).on(
            "knack-view-render.view_1318",
            function (event, view, data) {
                var buyerInvoice = data.id;

                $("#" + view.key + " button:submit").click(function (e) {
                    e.preventDefault();

                    $(this).attr("disabled", true);
                    lib.showSpinner();

                    lib.loadLibrary("async", function () {
                        async.series(
                            [
                                function (callback) {
                                    lib
                                        .find(lib.OBJECTS_IDS.SupplierInvoice, [
                                            {
                                                field: "field_1000",
                                                operator: "is",
                                                value: buyerInvoice,
                                            },
                                        ])
                                        .then(function (response) {
                                            if (response.records.length > 0) {
                                                async.eachSeries(
                                                    response.records,
                                                    function (supplier, nextSupplier) {
                                                        lib
                                                            .delete(
                                                                lib.OBJECTS_IDS.SupplierInvoice,
                                                                supplier.id
                                                            )
                                                            .then(function (deleted) {
                                                                nextSupplier();
                                                            })
                                                            .fail(function () {
                                                                nextSupplier();
                                                            });
                                                    },
                                                    function (err) {
                                                        callback(null, "one");
                                                    }
                                                );
                                            } else {
                                                callback(null, "one");
                                            }
                                        });
                                },
                                function (callback) {
                                    lib
                                        .find(lib.OBJECTS_IDS.ContractInvoice, [
                                            {
                                                field: "field_974",
                                                operator: "is",
                                                value: buyerInvoice,
                                            },
                                        ])
                                        .then(function (response) {
                                            if (response.records.length > 0) {
                                                async.eachSeries(
                                                    response.records,
                                                    function (contract, nextContract) {
                                                        lib
                                                            .delete(
                                                                lib.OBJECTS_IDS.ContractInvoice,
                                                                contract.id
                                                            )
                                                            .then(function (deleted) {
                                                                nextContract();
                                                            })
                                                            .fail(function () {
                                                                nextContract();
                                                            });
                                                    },
                                                    function (err) {
                                                        callback(null, "one");
                                                    }
                                                );
                                            } else {
                                                callback(null, "one");
                                            }
                                        });
                                },
                            ],
                            function (err, results) {
                                lib
                                    .delete(lib.OBJECTS_IDS.BuyerInvoice, buyerInvoice)
                                    .then(function () {
                                        lib.refreshView("view_1269", function () {
                                            lib.hideSpinner();
                                            setTimeout(function () {
                                                $(".close-modal").click();
                                            }, 500);
                                        });
                                    })
                                    .fail(lib.handleError);
                            }
                        );
                    });
                });
            }
        );

        lib.addMethod("waitDetails", function (view, callback) {
            if (
                document.getElementById(view) &&
                Knack.models[view].toJSON().field_967
            ) {
                setTimeout(function () {
                    callback();
                }, 500);
            } else {
                setTimeout(function () {
                    lib.waitDetails(view, callback);
                }, 500);
            }
        });

        // // lib.addTask('Filter Period Start Date', 'knack-view-render.view_1288', function (event, view, data) {
        // $(document).on("knack-view-render.view_1288", function (event, view, data) {
        //     //scene_665
        //     lib.waitDetails("view_1276", function () {
        //         var invoiceDetails = Knack.models.view_1276.toJSON();

        //         var startDate = new Date(
        //             invoiceDetails.field_967_raw.unix_timestamp
        //         );
        //         var endDate = new Date(invoiceDetails.field_968_raw.unix_timestamp);
        //         var infoTable = data;

        //         infoTable.forEach(function (info) {
        //             var start = new Date(
        //                 lib.getFieldValue(info, "field_387", "number").unix_timestamp
        //             );

        //             var sd = new Date(start.date);

        //             if (start >= startDate && start <= endDate) {
        //                 // console.log(info.id);
        //             } else {
        //                 $("#view_1288 .kn-table tr#" + info.id).remove();
        //             }
        //         });

        //         var groups = $("#view_1288 table .kn-table-group td");
        //         for (var i = 0; i < groups.length; i++) {
        //             var children = $(groups[i]).closest("tr").nextUntil(".kn-table-group").length;
        //             if (children == 0) {
        //                 $(groups[i]).closest("tr").remove();
        //             }
        //         }

        //         // let detailsView = "view_1276";
        //         let tableView = "view_1288";
        //         addButton_FindAllTErecords(tableView);
        //         // let receivedRecords = await getInvoices_HigherLimit(detailsView, tableView);
        //         // console.log("log after function");

        //     });
        // });


        $(document).on("knack-view-render.view_1288", async function (event, view, data) {
            lib.waitDetails("view_1276", async function () {
                var invoiceDetails = Knack.models.view_1276.toJSON();
                var startDate = new Date(Date.parse(invoiceDetails.field_967_raw.date));
                var endDate = new Date(Date.parse(invoiceDetails.field_968_raw.date));
                const startDateBefore = moment(startDate).subtract(1, "days").format("MM-DD-YYYY");
                const endDateAfter = moment(endDate).add(1, "days").format("MM-DD-YYYY");
                let filters;
                const tableFilters = Knack.models['view_1288'].view.filters;
                if (JSON.stringify(tableFilters) == '{}' || tableFilters.length === 0) {
                    filters = {
                        "match": "and",
                        "rules": [
                            {
                                "field": "field_387",
                                "operator": "is after",
                                "value": {
                                    "date": startDateBefore
                                },
                                "field_name": "Period Start Date"
                            },
                            {
                                "match": "and",
                                "field": "field_387",
                                "operator": "is before",
                                "value": {
                                    "date": endDateAfter
                                },
                                "field_name": "Period Start Date"
                            },
                        ]
                    }

                    const fullURL = location.href.split("?")[0] + "?view_1288_page=1&view_1288_filters=" + encodeURI(JSON.stringify(filters));

                    console.log(startDateBefore)
                    console.log(endDateAfter)

                    location.replace(fullURL);

                }


                $('#view_1288 .kn-add-filter').click(function (e) {
                    $('.kn-filter-item:nth-child(1)').css({ "position": "absolute", "left": "100000px" });
                    $('.kn-filter-item:nth-child(2)').css({ "position": "absolute", "left": "100000px" });
                });

                $('#view_1288 .kn-edit-filter').click(function (e) {
                    $('.kn-filter-item:nth-child(1)').css({ "position": "absolute", "left": "100000px" });
                    $('.kn-filter-item:nth-child(2)').css({ "position": "absolute", "left": "100000px" });
                });

                $('#view_1288 .kn-filter-field_387:nth-child(1)').hide()
                $('#view_1288 .kn-filter-field_387:nth-child(2)').hide()

                //  var infoTable = data;
                // let detailsView = "view_1276";
                let tableView = "view_1288";
                addButton_FindAllTErecords(tableView);
                // let receivedRecords = await getInvoices_HigherLimit(detailsView, tableView);
                console.log("log after function");
            });
        });




        // ////TETST
        // $(document).on("knack-view-render.view_3838", function (event, view, data) {
        //     //scene_665
        //     lib.waitDetails("view_1276", function () {
        //         var invoiceDetails = Knack.models.view_1276.toJSON();

        //         var startDate = new Date(
        //             invoiceDetails.field_967_raw.unix_timestamp
        //         );
        //         var endDate = new Date(invoiceDetails.field_968_raw.unix_timestamp);
        //         var infoTable = data;

        //         infoTable.forEach(function (info) {
        //             var start = new Date(
        //                 lib.getFieldValue(info, "field_387", "number").unix_timestamp
        //             );

        //             var sd = new Date(start.date);

        //             if (start >= startDate && start <= endDate) {
        //                 console.log(info.id);
        //             } else {
        //                 $("#view_3838 .kn-table tr#" + info.id).remove();
        //             }
        //         });

        //         var groups = $("#view_3838 table .kn-table-group td");
        //         for (var i = 0; i < groups.length; i++) {
        //             var children = $(groups[i]).closest("tr").nextUntil(".kn-table-group").length;
        //             if (children == 0) {
        //                 $(groups[i]).closest("tr").remove();
        //             }
        //         }

        //         // let detailsView = "view_1276";
        //         let tableView = "view_3838";
        //         addButton_FindAllTErecords(tableView);
        //         // let receivedRecords = await getInvoices_HigherLimit(detailsView, tableView);
        //         // console.log("log after function");

        //     });
        // });

        ////

        $(document).on("knack-view-render.view_2990", function (event, view, data) {
            //scene_674
            lib.waitDetails("view_2963", function () {
                var invoiceDetails = Knack.models.view_2963.toJSON();

                var startDate = new Date(
                    invoiceDetails.field_967_raw.unix_timestamp
                );
                var endDate = new Date(invoiceDetails.field_968_raw.unix_timestamp);
                var infoTable = data;

                infoTable.forEach(function (info) {
                    var start = new Date(
                        lib.getFieldValue(info, "field_387", "number").unix_timestamp
                    );
                    var sd = new Date(start.date);

                    if (start >= startDate && start <= endDate) {
                        // console.log("ok");
                    } else {
                        $("#view_2990 .kn-table tr#" + info.id).remove();
                    }
                });

                var groups = $("#view_2990 table .kn-table-group td");

                for (var i = 0; i < groups.length; i++) {
                    var children = $(groups[i]).closest("tr").nextUntil(".kn-table-group").length;
                    if (children == 0) {
                        $(groups[i]).closest("tr").remove();
                    }
                }

                // let detailsView = "view_2963";
                let tableView = "view_2990";
                addButton_FindAllTErecords(tableView);
                // let receivedRecords = await getInvoices_HigherLimit(detailsView, tableView);
                // console.log("log after function");

            });
        }
        );

        function addButton_FindAllTErecords(tableView) {
            let defaultText = "Select ALL Available T&E Cards";
            let activeText = "ALL Available T&E Cards Selected";
            $(`#${tableView} .kn-records-nav`).append(`<div class="custom_btn kn-button" data_source="${tableView}"> ${defaultText} </div>`)

            let allRecordsBtn = $(".custom_btn");
            // console.log(allRecordsBtn);
            allRecordsBtn.click(function (e) {
                if ($(this).attr("checked")) {
                    $(this).attr("checked", false).removeClass("is-active").text(defaultText);
                    $(".select-all-suppliers").attr("checked", false);
                } else {
                    $(this).attr("checked", true).addClass("is-active").text(activeText);
                    $(".select-all-suppliers").attr("checked", true);
                }
                lib.selectAllSuppliers();
            });

            $(".select-supplier").click(function (e) {
                if (allRecordsBtn.attr("checked")) {
                    allRecordsBtn.attr("checked", false).removeClass("is-active").text(defaultText);
                }
            })
        };

        // lib.addTask('Edit details', 'knack-form-submit.view_1325', function (event, view, data) {
        $(document).on(
            "knack-form-submit.view_1325",
            function (event, view, data) {
                lib.refreshView("view_1276", function () {
                    lib.refreshView("view_1288");
                });
            }
        );

        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        // lib.addTask('Contrax T&ELine item & Tables Handler', 'knack-page-render.scene_411', function (e,v) {
        $(document).on("knack-page-render.scene_411", function (e, v) {
            // let tneCardDetails=Knack.models.view_633.attributes;
            // // console.log(tneCardDetails);
            // let numberOfWorkShifts=tneCardDetails.field_796_raw? tneCardDetails.field_796_raw : "";
            // // console.log(numberOfWorkShifts);
            // let workShiftsHeader=$("#view_631 table tr th:nth-child(7)");
            // let workShiftFields=$("#view_631 table tr:not(.kn-table-group) td:nth-child(7)");
            // if (numberOfWorkShifts==0 || numberOfWorkShifts=="") {
            //     workShiftsHeader.hide();
            //     workShiftFields.hide();
            // }
        });
        var records_view_631;
        var renderUpdate_view_631 = false;
        $(document).on(
            "knack-view-render.view_631",
            function (event, view, data) {
                //How to manipulate Inline-edit Dropdown options
                let workShiftFields = $(
                    "#view_631 table tr:not(.kn-table-group) td:nth-child(8)"
                );
                let costCenterFields = $(
                    "#view_631 table tr:not(.kn-table-group) td:nth-child(7)"
                );

                workShiftFields.each(function () {
                    let td = $(this);
                    $(this).click(async function () {
                        let tneCardDetails = Knack.models.view_633.attributes;
                        console.log(tneCardDetails);
                        let numberOfWorkShifts = tneCardDetails.field_796_raw
                            ? tneCardDetails.field_796_raw
                            : "";
                        console.log(numberOfWorkShifts);
                        if (numberOfWorkShifts == 3) {
                            //do nothing
                        } else {
                            lib.showSpinner();
                            await sleep(400);
                            let tdID = td.parent().attr("id");
                            let tdDropdown = $("#view_631_celleditor-field_799");
                            if (tdDropdown.length) {
                                $("#view_631_celleditor-field_799").css(
                                    "pointer-events",
                                    "none"
                                );
                                // await sleep(1600);
                                lib.hideSpinner();
                                if (numberOfWorkShifts == 0 || numberOfWorkShifts == "") {
                                    $(
                                        "#kn-input-field_799 option[value='Work Shift 1']"
                                    ).remove();
                                    $(
                                        "#kn-input-field_799 option[value='Work Shift 2']"
                                    ).remove();
                                    $(
                                        "#kn-input-field_799 option[value='Work Shift 3']"
                                    ).remove();
                                } else if (numberOfWorkShifts == 1) {
                                    $(
                                        "#kn-input-field_799 option[value='Work Shift 2']"
                                    ).remove();
                                    $(
                                        "#kn-input-field_799 option[value='Work Shift 3']"
                                    ).remove();
                                } else if (numberOfWorkShifts == 2) {
                                    $(
                                        "#kn-input-field_799 option[value='Work Shift 3']"
                                    ).remove();
                                }
                                let controlledEnv = false;
                                tdDropdown.change(function () {
                                    if (!controlledEnv) {
                                        if (numberOfWorkShifts == 1) {
                                            $(
                                                "#kn-input-field_799 option[value='Work Shift 2']"
                                            ).remove();
                                            $(
                                                "#kn-input-field_799 option[value='Work Shift 3']"
                                            ).remove();
                                        }
                                        if (numberOfWorkShifts == 2) {
                                            $(
                                                "#kn-input-field_799 option[value='Work Shift 3']"
                                            ).remove();
                                        }
                                    }
                                    controlledEnv = true;
                                    $("#view_631_celleditor_field_490_chzn").css(
                                        "pointer-events",
                                        "visible"
                                    );
                                });
                                tdDropdown.click(function () {
                                    controlledEnv = true;
                                });
                                await sleep(200);
                                $("#view_631_celleditor-field_799").css(
                                    "pointer-events",
                                    "visible"
                                );
                            }
                        }
                    });
                });

                costCenterFields.each(function () {
                    let td = $(this);
                    $(this).click(async function () {
                        let isUsingAmendments = Knack.models.view_633.attributes.field_2224.replace(/(<([^>]+)>)/ig, "");
                        isUsingAmendments = isUsingAmendments == "No" ? false : true;
                        console.log("is suing amendments: ", isUsingAmendments)
                        let amendmentTableRecords = [];
                        if (isUsingAmendments) {
                            amendmentTableRecords = Knack.models.view_1682.data.models.map(
                                function (r) {
                                    return r.toJSON();
                                }
                            );
                        }
                        console.log("click");
                        lib.showSpinner();
                        await sleep(400);
                        // let waitElem = await waitCellDropdown("view_631_celleditor-field_490",10);
                        // console.log(waitElem);
                        let tdDropdown = $("#view_631_celleditor-field_490");
                        let tdID = td.parent().attr("id");
                        // console.log(tdDropdown);
                        console.log(tdID);
                        if (tdDropdown.length) {
                            $("#view_631_celleditor_field_490_chzn").css(
                                "pointer-events",
                                "none"
                            );
                            // await sleep(1600);
                            lib.hideSpinner();
                            // tdDropdown.html("");
                            // tdDropdown.trigger("liszt:updated");
                            let tableLineItem = data.find(r => r.id == tdID);
                            let record = "";
                            if (tableLineItem) record = tableLineItem;
                            else {
                                record = await lib.findById(
                                    lib.OBJECTS_IDS.lineItems,
                                    tdID
                                );
                            }
                            let controlledEnv = false;
                            filterCostCenterOptions(
                                tdDropdown,
                                record,
                                amendmentTableRecords,
                                controlledEnv,
                                isUsingAmendments
                            );
                            // console.log(tdDropdown,
                            //   record,
                            //   amendmentTableRecords,
                            //   controlledEnv);
                            tdDropdown.change(function () {
                                controlledEnv = filterCostCenterOptions(
                                    tdDropdown,
                                    record,
                                    amendmentTableRecords,
                                    controlledEnv,
                                    isUsingAmendments
                                );
                                $("#view_631_celleditor_field_490_chzn").css(
                                    "pointer-events",
                                    "visible"
                                );
                            });
                            tdDropdown.click(function () {
                                controlledEnv = true;
                            });
                            // await sleep(200);
                            $("#view_631_celleditor_field_490_chzn").css(
                                "pointer-events",
                                "visible"
                            );
                        }
                    });
                });

                records_view_631 = data;
                // Inline-edit listener. Obtains before/after data.
                if (renderUpdate_view_631) return; //Prevents View from Looping when doing Inline-edit
                // lib.addTask('inlineEdit', 'knack-cell-update.view_631', async function (lineEvent, view, updatedRecord) {
                $(document).on(
                    "knack-cell-update.view_631",
                    async function (lineEvent, view, updatedRecord) {
                        // Filter the initially loaded records for the one with the same ID as the updated one
                        // console.log(records);
                        var recordBeforeUpdate = records_view_631.filter(
                            (recordFromRenderEvent) => {
                                return recordFromRenderEvent.id === updatedRecord.id;
                            }
                        )[0];
                        console.log(updatedRecord);

                        if (updatedRecord.field_484 !== recordBeforeUpdate.field_484) {
                            try {
                                await lib.update(
                                    lib.OBJECTS_IDS.lineItems,
                                    updatedRecord.id,
                                    JSON.stringify({
                                        field_490: "",
                                    })
                                );
                                lib.refreshView(view.key);
                            } catch (e) {
                                console.log(e);
                            }
                        }
                        // listenToAction(updatedRecord,recordBeforeUpdate,view);
                    }
                );
                renderUpdate_view_631 = true;
            }
        );

        function filterCostCenterOptions(
            tdDropdown,
            record,
            amendmentTableRecords,
            controlledEnv,
            isUsingAmendments
        ) {
            if (!controlledEnv) {
                console.log("Filtering Cost Center options...");
                let dateWorked = record.field_484;
                let startDate = "";
                let endDate = "";
                let caID = "";
                // console.log(record);
                lib.loadLibrary("moment", function () {
                    // console.log(amendmentTableRecords);
                    if (isUsingAmendments) {
                        for (var atrid of amendmentTableRecords) {
                            startDate = atrid.field_1139;
                            endDate = atrid.field_1148;
                            if (
                                moment(dateWorked).isBetween(startDate, endDate, "days", "[]")
                            ) {
                                // console.log("moment: ", atrid.field_1111);
                                caID = atrid;
                                break;
                            }
                        }
                        console.log("Amendment ID: ", caID.field_1111);

                        // console.log("Cost Centers: ",caID.field_1089);
                        tdDropdown.html("");
                        if (caID.field_1089_raw && caID.field_1089_raw.length) {
                            for (var costcenter of caID.field_1089_raw) {
                                // console.log(costcenter);
                                tdDropdown.append(
                                    `<option value="${costcenter.id}">${costcenter.identifier}</option>`
                                );
                            }
                        }
                        tdDropdown.trigger("liszt:updated");
                    } else {
                        console.log("do not using amendment")
                        const contract = Knack.models.view_3761.attributes;
                        tdDropdown.html("");
                        if (contract.field_494_raw && contract.field_494_raw.length) {
                            for (var costcenter of contract.field_494_raw) {
                                // console.log(costcenter);
                                tdDropdown.append(
                                    `<option value="${costcenter.id}">${costcenter.identifier}</option>`
                                );
                            }
                        }
                        tdDropdown.trigger("liszt:updated");
                    }
                    // $("#view_631_celleditor_field_490_chzn").css("pointer-events","visible");
                });
            }
            return true;
        }

        async function submitTimeCardViaBrowser(view, cardLineItems, contractAmendments) {
            lib.loadLibrary("async", "moment", async function () {
                var check = 0;
                for (var cardLine of cardLineItems) {
                    if (cardLine.field_495.length != 0) {
                        check++;
                    }
                }
                if (check == 0) {
                    let newCounter = 0;
                    for (var cardLine of cardLineItems) {
                        let dateWorked = cardLine.field_484;
                        dateWorked = moment(dateWorked, "L");

                        for (var contract of contractAmendments) {
                            let startDateS = moment(contract.field_1139, "L");
                            let endDateS = moment(contract.field_1148, "L");

                            if (moment(dateWorked).isBetween(startDateS, endDateS, "days", "[]")) {
                                newCounter++;
                                try {
                                    console.log("Attaching to contract: ", contract.field_1111);
                                    console.log(contract.id);
                                    let updLineItem = await lib.update(lib.OBJECTS_IDS.lineItems, cardLine.id, JSON.stringify(
                                        { field_1118: contract.id, }
                                    ));
                                    console.log("NewCode: worked");
                                    console.log("LineItem #", updLineItem.field_514);
                                } catch (e) {
                                    console.log("NewCode: failed");
                                    console.log(e);
                                }
                            }

                        }
                    }
                    console.log("NewCounter: ", newCounter);
                    lib.hideSpinner();
                    $("#" + view.key + " button:submit").submit();
                } else {
                    alert("Please delete all Line Items with invalid date ranges before submitting for approval.");
                    lib.hideSpinner();
                }
            });
        }

        lib.addMethod("waitToken", function (n, callback) {
            const regex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/
            if (n < 16) {
                let token = Knack.getUserToken();
                if (token.match(regex)) {
                    callback(token, null);
                } else {
                    n++;
                    setTimeout(function () {
                        lib.waitToken(n, callback);
                    }, 500);
                }
            } else {
                callback(null, "error getting token")
            }

        });

        let switchToModern = true;
        if (switchToModern) {
            console.log("NEW Function Running on view_1681");
            // Updating function to modern ES
            $(document).on("knack-view-render.view_1681", function (event, view, data) {
                $("#" + view.key + " button:submit").click(function (e) {
                    e.preventDefault();
                    console.log("TimeCard ID #", Knack.models.view_633.attributes.field_420);

                    // check when the contract is not using amendment bypass submittimecard endpoint
                    const isUsingAmendments = Knack.models.view_633.attributes.field_2224.replace(/(<([^>]+)>)/ig, "");
                    if (isUsingAmendments == "No") {
                        console.log("not using amendment buyer")
                        $("#" + view.key + " button:submit").submit();
                        return
                    }

                    var selectValue = $(`#${view.key}-field_499`);
                    var contractAmendments = Knack.models.view_1682.data.models.map(function (r) { return r.toJSON(); });

                    if (selectValue[0].value != "Submit for Approval" || contractAmendments.length == 0) {
                        $("#" + view.key + " button:submit").submit();
                    } else {
                        lib.showSpinner();
                        var cardLineItems = Knack.models.view_631.data.models.map(function (r) { return r.toJSON(); });

                        // let testURLdebug = ""
                        // let userEmail = Knack.getUserAttributes().email;
                        // if (userEmail == "zag@careerconnectionsinc.com") {
                        //     console.log("usign zag account")
                        //     testURLdebug = "https://f1e69a07d371.ngrok.io/api/v1/" + "submitTimeCard";
                        // } else {
                        //     testURLdebug = lib.CONEXIS_SERVER + "submitTimeCard"
                        // }
                        lib.waitToken(0, async function (token, error) {
                            if (error) {
                                lib.hideSpinner();
                                alert("error getting token")
                                return
                            }
                            let payload = { contractAmendments: contractAmendments, cardLineItems: cardLineItems };
                            // payload.token = Knack.getUserToken();
                            payload.token = token;

                            try {
                                // let ngrokURL = "https://2a462fe16df2.ngrok.io/api/v1/";
                                $.ajax({
                                    type: "POST",
                                    url: lib.CONEXIS_SERVER + "submitTimeCard",
                                    //url: testURLdebug,
                                    // url: ngrokURL+"submitTimeCard",
                                    contentType: "application/json",
                                    dataType: "json",
                                    data: JSON.stringify(payload),
                                })
                                    .then(function (response) {
                                        console.log("Server Reply: ", response);
                                        lib.hideSpinner();
                                        if (response.error) {
                                            if (response.status == "fail") alert(response.error);
                                            else {
                                                let msgStr = response.error + '\n'
                                                    + "Please try submitting once more.";
                                                alert(msgStr);
                                                // +"You can Cancel and try again to repeat the process. Are you sure you wish to proceed with Submit?";
                                                // if (window.confirm(msgStr)) {
                                                //     console.log("Submit!");
                                                //     $("#" + view.key + " button:submit").submit();
                                                // }else console.log("Cancel");
                                            }
                                        } else {
                                            // if (userEmail == "zag@careerconnectionsinc.com") {
                                            //     console.log("zag no haga submit")
                                            // } else {
                                            //     console.log("Submit!");
                                            //     $("#" + view.key + " button:submit").submit();
                                            // }

                                            console.log("Submit!");
                                            $("#" + view.key + " button:submit").submit();
                                        }
                                    })
                                    .fail(function (err) {
                                        lib.hideSpinner();
                                        alert(`Failed to connect to Server. Please resubmit your timecard. ${err.status}, ${JSON.parse(err.responseText).message}`);
                                        console.log("error conecting to server: ", err);
                                    });
                            } catch (e) {
                                lib.hideSpinner();
                                console.log(e);
                            }
                        });
                        // return false;
                        // }else console.log("following normal process");

                        // submitTimeCardViaBrowser(view,cardLineItems,contractAmendments);

                    }
                });
            });
        } else {
            // lib.addTask('Contrax T&ELine item & Contract Amendment Automation', 'knack-view-render.view_1681', function (event, view, data) {
            console.log("OLD Function Running on view_1681");
            $(document).on("knack-view-render.view_1681", function (event, view, data) {
                $("#" + view.key + " button:submit").click(function (e) {
                    e.preventDefault();
                    let t0 = performance.now();
                    var selectValue = $("#view_1681-field_499");
                    var contractAmendments = Knack.models.view_1682.data.models.map(function (r) { return r.toJSON(); });

                    if (selectValue[0].value != "Submit for Approval" || contractAmendments.length == 0) {
                        $("#" + view.key + " button:submit").submit();
                    } else {
                        lib.showSpinner();

                        var cardLineItems = Knack.models.view_631.data.models.map(function (r) { return r.toJSON(); });

                        lib.loadLibrary("async", "moment", function () {
                            var check = 0;

                            async.eachSeries(cardLineItems, function (cardLine, nextCardLine) {
                                if (cardLine.field_495.length != 0) {
                                    check++;
                                    nextCardLine();
                                } else {
                                    nextCardLine();
                                }
                            });

                            if (check == 0) {
                                let newCounter = 0, oldCounter = 0;
                                async.eachSeries(cardLineItems, function (cardLine, nextCardLine) {
                                    var date = new Date(cardLine.field_484_raw.unix_timestamp);

                                    let dateWorked = cardLine.field_484;
                                    dateWorked = moment(dateWorked, "L");

                                    // debugger;

                                    async.eachSeries(contractAmendments, function (contract, nextContract) {
                                        var startDate = new Date(contract.field_1139_raw.unix_timestamp);
                                        var endDate = new Date(contract.field_1148_raw.unix_timestamp);
                                        ////
                                        let startDateS = moment(contract.field_1139, "L");
                                        let endDateS = moment(contract.field_1148, "L");

                                        if (moment(dateWorked).isBetween(startDateS, endDateS, "days", "[]")) {
                                            console.log("NewCode: worked");
                                            newCounter++;
                                            lib.update(lib.OBJECTS_IDS.lineItems, cardLine.id, JSON.stringify(
                                                { field_1118: contract.id, }
                                            ))
                                                .then(function (res) {
                                                    nextCardLine();
                                                });
                                        } else {
                                            console.log("NewCode: failed");
                                            nextContract();
                                        }
                                        //////
                                        if (date >= startDate && date <= endDate) {
                                            console.log("OldCode: worked");
                                            oldCounter++;
                                            // lib.update(lib.OBJECTS_IDS.lineItems, cardLine.id, JSON.stringify({
                                            //     field_1118: contract.id
                                            // })).then(function (res) {
                                            //     nextCardLine();
                                            // });
                                        } else {
                                            console.log("OldCode: failed");
                                            // nextContract();
                                        }
                                    },
                                        function (err) {
                                            nextCardLine();
                                        }
                                    );
                                },
                                    function (err) {
                                        console.log("NewCounter: ", newCounter);
                                        console.log("OldCounter: ", oldCounter);
                                        lib.hideSpinner();
                                        let t1 = performance.now();
                                        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
                                        $("#" + view.key + " button:submit").submit();
                                    }
                                );
                            } else {
                                alert("Please delete all Line Items with invalid date ranges before submitting for approval.");
                                lib.hideSpinner();
                            }
                        });
                    }
                });
            });
        }

        lib.addMethod("waitFormViewform", function (view, callback) {
            if (document.querySelector(view)) {
                console.log("wait view success form: ", document.querySelector(view))
                callback();
            } else {
                setTimeout(function () {
                    lib.waitFormViewform(view, callback);
                }, 500);
            }
        });

        // lib.addTask('Check date', 'knack-view-render.view_589', function (event, view, data) {
        $(document).on(
            "knack-view-render.view_589",
            function (event, view, data) {
                lib.waitFormViewform(`#${view.key} button`, function () {
                    $("#" + view.key + " button:submit").click(function (e) {
                        e.preventDefault();
                        var input = $("#view_589-field_387");
                        var contractDetails = Knack.models.view_588.attributes.field_402;

                        lib.loadLibrary("moment", function () {
                            var date = moment(input[0].value, "MM-DD-YYYY");
                            date = date.format("dddd");

                            if (contractDetails.length != 0) {
                                if (contractDetails == "M-S" && date == "Monday") {
                                    $("#" + view.key + " button:submit").submit();
                                } else if (contractDetails == "S-S" && date == "Sunday") {
                                    $("#" + view.key + " button:submit").submit();
                                } else {
                                    alert(
                                        "Period start date must align with the Buyer's work week preference listed above."
                                    );
                                }
                            } else {
                                $("#" + view.key + " button:submit").submit();
                            }
                        });
                    });
                });
            }
        );

        // lib.addTask('Check date', 'knack-view-render.view_1023', function (event, view, data) {
        $(document).on(
            "knack-view-render.view_1023",
            function (event, view, data) {
                $("#" + view.key + " button:submit").click(function (e) {
                    e.preventDefault();
                    var input = $("#view_1023-field_387");
                    var contractDetails =
                        Knack.models.view_633.attributes.field_402_raw;

                    lib.loadLibrary("moment", function () {
                        var date = moment(input[0].value, "MM-DD-YYYY");
                        date = date.format("dddd");

                        if (contractDetails.length != 0) {
                            if (contractDetails == "M-S" && date == "Monday") {
                                $("#" + view.key + " button:submit").submit();
                            } else if (contractDetails == "S-S" && date == "Sunday") {
                                $("#" + view.key + " button:submit").submit();
                            } else {
                                alert(
                                    "Period start date must align with the Buyer's work week preference listed above."
                                );
                            }
                        } else {
                            $("#" + view.key + " button:submit").submit();
                        }
                    });
                });
            }
        );

        // lib.addTask('Populate Contract Amendment field', 'knack-scene-render.scene_814', function (event, view, data) {
        $(document).on(
            "knack-scene-render.scene_814",
            function (event, view, data) {
                var contractAmendments = Knack.models.view_1678.data.models.map(
                    function (r) {
                        return r.toJSON();
                    }
                );

                $("#view_1664-field_1154")
                    .append(
                        `<option value="${contractAmendments[0].id}">Selected value ${contractAmendments[0].id}</option>`
                    )
                    .val(contractAmendments[0].id)
                    .change();

                lib
                    .findById(
                        lib.OBJECTS_IDS.contractAmendment,
                        contractAmendments[0].id
                    )
                    .then(function (response) {
                        lib.showSpinner();
                        $("#view_1664 #field_1109").val(response.field_1109); //PO NUMBER
                        $("#view_1664-field_1113").val(response.field_1113); //Worker Status
                        $("#view_1664_field_1186_chzn").val(response.field_1186); //job Owner
                        $("#view_1664 #field_1085").val(response.field_1085); //Base Pay Rate per Hour
                        $("#view_1664 #field_1086").val(response.field_1086); //Contract Bill Rate
                        $("#view_1664 #field_1087").val(response.field_1087); //Contract Overtime Rate
                        $("#view_1664 #field_1088").val(response.field_1088); // Contract Double Time Rate
                        $("#view_1664 #field_1843").val(
                            Knack.models.view_3382.attributes.field_1802
                        ); //Self Serve Contract?
                        $("#view_1664 #field_2024").val(
                            Knack.models.view_3382.attributes.field_1262
                        ); //Permanent Hire?
                        $("#view_1664 #field_1843").change();
                        $("#view_1664 #field_2024").change();

                        if (response.field_1105 == "% Fee") {
                            $("input:radio[name=view_1664-field_1105]:nth(1)").attr(
                                "checked",
                                true
                            );
                            $("#view_1664 #field_1107").val(response.field_1107);
                            $("input:radio[name=view_1664-field_1105]:nth(0)").click();
                            $("input:radio[name=view_1664-field_1105]:nth(1)").click();
                        } else if (response.field_1105 == "Dollar Fee") {
                            $("input:radio[name=view_1664-field_1105]:nth(0)").attr(
                                "checked",
                                true
                            );
                            $("#view_1664 #field_1106").val(response.field_1106);
                            $("input:radio[name=view_1664-field_1105]:nth(1)").click();
                            $("input:radio[name=view_1664-field_1105]:nth(0)").click();
                        }

                        lib.hideSpinner();
                    });
            }
        );

        // lib.addTask('Decline Unsuccessful Proposals', 'knack-scene-render.scene_713', function (event, scene) {
        $(document).on("knack-scene-render.scene_713", function (event, scene) {
            $("#view_1466 button:submit").click(function (e) {
                e.preventDefault();
                var requisition = $("#field_576");
                var decline = $("#field_1203");
                var table = Knack.models.view_1795.data.models.map(function (r) {
                    return r.toJSON();
                });

                if (
                    requisition.val() == "Yes" &&
                    decline.val() == "Yes" &&
                    table.length > 0
                ) {
                    lib.showSpinner();
                    lib.loadLibrary("async", function () {
                        async.eachSeries(
                            table,
                            function (record, nextRecord) {
                                lib
                                    .update(
                                        lib.OBJECTS_IDS.proposalObject,
                                        record.id,
                                        JSON.stringify({
                                            field_214: "Declined",
                                        })
                                    )
                                    .then(function () {
                                        nextRecord();
                                    })
                                    .fail(function () {
                                        nextRecord();
                                    });
                            },
                            function (err) {
                                lib.hideSpinner();
                                if (err) {
                                    lib.handleError(err);
                                    return;
                                }
                                $("#view_1466 button:submit").submit();
                            }
                        );
                    });
                } else {
                    $("#view_1466 button:submit").submit();
                }
            });
        });

        $(document).on("knack-form-submit.view_1466", async function (e, v, record) {
            const requisition = $("#field_576");

            if (requisition.val() == "Yes") {
                const declineValue = $("#field_1203").val();
                const proposals = Knack.models.view_1795.data.models.map(function (r) {
                    return r.toJSON();
                });

                const obj = {
                    proposals,
                    declineValue,
                    requisitionId: record.field_88,
                    suppliers: record.field_90_raw,
                    jobTitle: record.field_87,
                    filledNote: record.field_1202,
                    token: Knack.getUserToken(),
                }
                await $.ajax({
                    type: "POST",
                    url: lib.CONEXIS_SERVER + "send-email-of-requisition-filled",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(obj),
                });
            }
        })

        // lib.addTask('Populate Charges codes dropdown', 'knack-scene-render.scene_685', function (event, scene) {
        $(document).on("knack-scene-render.scene_685", function (event, scene) {
            var view = "";
            $("#kn-input-field_490").hide();

            if ($("#view_1349").length) {
                view = "#view_1349";
            } else if ($("#view_1348").length) {
                view = "#view_1348";
            } else if ($("#view_1350").length) {
                view = "#view_1350";
            } else if ($("#view_1351").length) {
                view = "#view_1351";
            }

            $(view + "-field_484").change(function () {
                var dateWorked = new Date($(view + "-field_484").val());
                var table = Knack.models.view_1861.data.models.map(function (r) {
                    return r.toJSON();
                });
                var possibleCodes = [];

                lib.loadLibrary("async", function () {
                    async.eachSeries(
                        table,
                        function (record, nextRecord) {
                            var startDate = new Date(record.field_1139);
                            var endDate = new Date(record.field_1148);

                            if (dateWorked >= startDate && dateWorked <= endDate) {
                                if (record.field_1089.length != 0) {
                                    record.field_1089_raw.forEach(function (codes) {
                                        possibleCodes.push(codes.id);
                                    });
                                }
                            }
                            nextRecord();
                        },
                        function (err) {
                            lib.hideSpinner();
                            if (err) {
                                lib.handleError(err);
                                return;
                            }

                            if (possibleCodes.length > 0) {
                                $("#kn-input-field_490").show();
                                $("#kn-input-field_490 select").css("height", "30px");
                                $(view + "-field_490").show();
                                $(view + "_field_490_chzn").hide();
                                $(view + "-field_490").val(possibleCodes[0]);

                                var options = $(view + "-field_490 option");

                                for (var i = 0; i < options.length; i++) {
                                    if (possibleCodes.includes(options.eq(i).val()) == false) {
                                        $(view + "-field_490 option")
                                            .eq(i)
                                            .hide();
                                    }
                                }
                            } else {
                                $("#kn-input-field_490").hide();
                                $("#kn-input-field_490").val("");
                            }
                        }
                    );
                });
            });
        });

        //EDIT

        lib.addMethod("checkDates", function (view) {
            var dateWorked = new Date($("#" + view.key + "-field_484").val());
            var table = Knack.views.view_1863.model.data.models.map(function (r) {
                return r.toJSON();
            });
            var possibleCodes = [];

            lib.loadLibrary("async", function () {
                async.eachSeries(
                    table,
                    function (record, nextRecord) {
                        var startDate = new Date(record.field_1139);
                        var endDate = new Date(record.field_1148);

                        if (dateWorked >= startDate && dateWorked <= endDate) {
                            if (record.field_1089.length != 0) {
                                record.field_1089_raw.forEach(function (codes) {
                                    possibleCodes.push(codes.id);
                                });
                            }
                        }
                        nextRecord();
                    },
                    function (err) {
                        lib.hideSpinner();
                        if (err) {
                            lib.handleError(err);
                            return;
                        }

                        if (possibleCodes.length > 0) {
                            $("#kn-input-field_490").show();
                            $("#kn-input-field_490 select").css("height", "30px");
                            $("#" + view.key + "-field_490").show();
                            $("#" + view.key + "_field_490_chzn").hide();
                            $("#" + view.key + "-field_490").val(possibleCodes[0]);

                            var options = $("#" + view.key + "-field_490 option");

                            for (var i = 0; i < options.length; i++) {
                                if (possibleCodes.includes(options.eq(i).val()) == false) {
                                    $("#" + view.key + "-field_490 option")
                                        .eq(i)
                                        .hide();
                                }
                            }
                        } else {
                            $("#kn-input-field_490").hide();
                            $("#kn-input-field_490").val("");
                        }
                    }
                );
            });
        });

        // lib.addTask('Populate Charges codes dropdown', 'knack-view-render.view_1352', function (event, view) {
        $(document).on("knack-view-render.view_1352", function (event, view) {
            $("#kn-input-field_490").hide();
            lib.checkDates(view);

            $("#" + view.key + "-field_484").change(function () {
                lib.checkDates(view);
            });
        });

        lib.addMethod("addWorkerToUrl", function (applicantViews, tablesViews) {
            var applicant = Knack.models[applicantViews[0]].toJSON();
            var workerDetails = null;

            if (applicantViews.length > 1) {
                workerDetails = Knack.models[applicantViews[1]].toJSON();
            }
            var tablesSelector = "";

            for (var i = 0; i < tablesViews.length; i++) {
                tablesSelector += "#" + tablesViews[i] + " table tbody tr";

                if (i < tablesViews.length - 1) {
                    tablesSelector += ", ";
                }
            }

            $(tablesSelector).each(function (key, value) {
                var link = $(value).find("td:nth-child(1) a");
                var newHref =
                    link.attr("href") +
                    "?id=" +
                    applicant.id +
                    "&name=" +
                    applicant.field_303;
                // let linkCon=link.attr('href').includes('?')? '&' : '?';
                // var newHref = link.attr('href') +linkCon+ 'id=' + applicant.id + '&name=' + applicant.field_303;
                //
                if (workerDetails) {
                    newHref += "&wpid=" + workerDetails.id;
                }

                link.attr("href", newHref);
            });
        });

        // lib.addTask('Add applicant ID to invite link', 'knack-scene-render.scene_1039', function (event, scene) {
        $(document).on("knack-scene-render.scene_1039", function (event, scene) {
            lib.addWorkerToUrl(["view_2466", "view_2465"], ["view_2372"]);
        });

        // lib.addTask('Add applicant ID to invite link', 'knack-scene-render.scene_999', function (event, scene) {
        $(document).on("knack-scene-render.scene_999", function (event, scene) {
            lib.addWorkerToUrl(["view_2267"], ["view_2246", "view_2281"]);
        });

        lib.addMethod("urlParams", function () {
            var vars = {};
            var parts = window.location.href.replace(
                /[?&]+([^=&]+)=([^&]*)/gi,
                function (m, key, value) {
                    vars[key] = value;
                }
            );

            return vars;
        });

        // lib.addTask('Set form', 'knack-scene-render.scene_1001', function (event, scene) {
        $(document).on("knack-scene-render.scene_1001", function (event, scene) {
            var applicant = lib.urlParams();

            if (!applicant.id) {
                alert("Error loading form, please try again.");
                return $(".close-modal").click();
            }

            var form = $("#view_2375 form");

            form
                .find("#vview_2375_field_309_chzn .chzn-single span")
                .text(applicant.name);

            var select = form.find("#view_2375-field_309");

            select
                .html(
                    '<option value="' +
                    applicant.id +
                    '">' +
                    applicant.name +
                    "</option>"
                )
                .ready(function () {
                    select.val(applicant.id).change();
                });

            if (applicant.wpid) {
                var selectwp = form.find("#view_2375-field_1330");

                selectwp
                    .html(
                        '<option value="' +
                        applicant.wpid +
                        '">' +
                        applicant.wpid +
                        "</option>"
                    )
                    .ready(function () {
                        selectwp.val(applicant.wpid).change();
                    });
            }
        });

        lib.addMethod("addRequisitionToUrl", function (reqView, tablesViews) {

            lib.waitFormView(reqView, function () {
                var requisition = Knack.models[reqView].toJSON();
                //console.log("requisition: ", requisition)
                var tablesSelector = "";

                for (var i = 0; i < tablesViews.length; i++) {
                    tablesSelector += "#" + tablesViews[i] + " table tbody tr";

                    if (i < tablesViews.length - 1) {
                        tablesSelector += ", ";
                    }
                }

                $(tablesSelector).each(function (key, value) {
                    var link = $(value).find("td").last().find("a");
                    var linkHref = link.attr("href");
                    if (linkHref) {
                        let linkCon = linkHref.includes("?") ? "&" : "?";
                        // console.log(linkCon);
                        var newHref =
                            link.attr("href") +
                            linkCon +
                            "id=" +
                            requisition.id +
                            "&ph=" +
                            requisition.field_867 +
                            "&ws=" +
                            requisition.field_773;
                        // var newHref = link.attr('href') + '&id=' + requisition.id + '&ph=' + requisition.field_867 + '&ws=' + requisition.field_773;
                        // console.log(link.attr('href').includes('?'));
                        link.attr("href", newHref);
                    }
                });
            });

        });

        // Function to select or deselect all checkboxes
        lib.addMethod("selectAllProducts", function (view) {
            if ($("#" + view + " .select-all-products").attr("checked")) {
                $("#" + view + " .select-product").attr("checked", true);
            } else {
                $("#" + view + " .select-product").attr("checked", false);
            }
        });

        lib.addMethod(
            "sendInvites",
            function (
                checksView,
                submitView,
                emailURL,
                requisition,
                workerField,
                errorMsg
            ) {
                lib.removeMessages(submitView);

                var checks = $("#" + checksView + " .select-product:checked");

                if (checks.length == 0) {
                    return lib.showErrorMessage(submitView, errorMsg);
                }

                lib.loadLibrary("async", function () {
                    lib.showSpinner();

                    var obj = {
                        field_103: requisition.id,
                        field_873: requisition.field_867,
                        field_1246: requisition.field_773,
                    };

                    async.eachSeries(
                        checks,
                        function (check, next) {
                            var applicant = $(check).closest("tr").attr("id");
                            obj[workerField] = applicant;

                            $.ajax({
                                type: "POST",
                                headers: lib.headers,
                                url: emailURL,
                                dataType: "json",
                                data: JSON.stringify(obj),
                            })
                                .then(function (response) {
                                    next();
                                })
                                .fail(function (err) {
                                    next(err);
                                });
                        },
                        function (err) {
                            lib.hideSpinner();

                            if (err) {
                                return lib.showErrorMessage(
                                    submitView,
                                    "There was an error assigning applicants, please try again."
                                );
                            }

                            lib.showSuccessMessage(submitView, "Applicants assigned!");
                        }
                    );
                });
            }
        );

        lib.addMethod(
            "assignInvites",
            function (
                checksView,
                submitView,
                emailURL,
                requisition,
                workerField,
                errorMsg
            ) {
                lib.removeMessages(submitView);

                var checks = $("#" + checksView + " .select-product:checked");

                if (checks.length == 0) {
                    return lib.showErrorMessage(submitView, errorMsg);
                }

                lib.loadLibrary("async", function () {
                    lib.showSpinner();

                    var obj = {
                        field_103: requisition,
                    };

                    async.eachSeries(
                        checks,
                        function (check, next) {
                            var applicant = $(check).closest("tr").attr("id");
                            obj[workerField] = applicant;

                            $.ajax({
                                type: "POST",
                                headers: lib.headers,
                                url: emailURL,
                                dataType: "json",
                                data: JSON.stringify(obj),
                            })
                                .then(function (response) {
                                    next();
                                })
                                .fail(function (err) {
                                    next(err);
                                });
                        },
                        function (err) {
                            lib.hideSpinner();

                            if (err) {
                                return lib.showErrorMessage(
                                    submitView,
                                    "There was an error assigning, please try again."
                                );
                            }

                            lib.showSuccessMessage(submitView, "Applicants assigned!");
                        }
                    );
                });
            }
        );

        // lib.addTask('Table buyer applicants', 'knack-view-render.view_2383', function (event, scene) {
        $(document).on("knack-view-render.view_2383", function (event, scene) {
            $("#view_2383 table thead tr").prepend(
                $("<th>").append(
                    $("<input>")
                        .addClass("select-all-products")
                        .attr({
                            type: "checkbox",
                        })
                        .click(function () {
                            lib.selectAllProducts("view_2383");
                        })
                )
            );
            $("#view_2383 table tbody tr:not(.kn-table-group)").prepend(
                $("<td>").append(
                    $("<input>").addClass("select-product").attr({
                        type: "checkbox",
                    })
                )
            );
        });

        // lib.addTask('Table contrax applicant', 'knack-view-render.view_2389', function (event, scene) {
        $(document).on("knack-view-render.view_2389", function (event, scene, data) {


            lib.addRequisitionToUrl("view_2387", ["view_2389"]);


            //console.log("data: ", data)
            $("#view_2389 table thead tr").prepend(
                $("<th>").append(
                    $("<input>")
                        .addClass("select-all-products")
                        .attr({
                            type: "checkbox",
                        })
                        .click(function () {
                            lib.selectAllProducts("view_2389");
                        })
                )
            );
            $("#view_2389 table tbody tr:not(.kn-table-group)").prepend(
                $("<td>").append(
                    $("<input>").addClass("select-product").attr({
                        type: "checkbox",
                    })
                )
            );
        });

        lib.addTask(
            "renderView",
            "knack-view-render.view_2383",
            function (e, v, data) {
                if (Knack.models.view_2387) {
                    // console.log("table1: exists");
                    lib.addRequisitionToUrl("view_2387", ["view_2383"]);
                } else {
                    // console.log("table1: doesn't exists");
                }
            }
        );
        // lib.addTask(
        //     "renderView",
        //     "knack-view-render.view_2389",
        //     function (e, v, data) {
        //         lib.addRequisitionToUrl("view_2387", ["view_2389"]);
        //         if (Knack.models.view_2387) {
        //             // console.log("table1: exists");
        //             //lib.addRequisitionToUrl("view_2387", ["view_2389"]);
        //         } else {
        //             // console.log("table1: doesn't exists");
        //         }
        //     }
        // );
        // lib.addTask('Add applicant ID to invite link', 'knack-scene-render.scene_1040', function (event, scene) {
        $(document).on("knack-scene-render.scene_1040", function (event, scene) {
            lib.addRequisitionToUrl("view_2387", ["view_2383", "view_2389"]);

            $("#view_2429, #view_2430").prepend(
                $("<form>").css("margin-bottom", "10px")
            );

            var requisition = Knack.models.view_2387.toJSON();

            $("#view_2429 .kn-link").click(function (e) {
                e.preventDefault();

                lib.sendInvites(
                    "view_2383",
                    "view_2429",
                    "https://api.knack.com/v1/pages/page_1041/views/view_2385/records",
                    requisition,
                    "field_1330",
                    "Please select at least one buyer applicant."
                );
            });

            $("#view_2430 .kn-link").click(function (e) {
                e.preventDefault();

                lib.sendInvites(
                    "view_2389",
                    "view_2430",
                    "https://api.knack.com/v1/pages/scene_1047/views/view_2410/records",
                    requisition,
                    "field_309",
                    "Please select at least one contrax applicant."
                );
            });
        });

        // lib.addTask('Table contrax applicant assign', 'knack-view-render.view_2551', function (event, scene) {
        $(document).on("knack-view-render.view_2551", function (event, scene) {
            $("#view_2551 table thead tr").prepend(
                $("<th>").append(
                    $("<input>")
                        .addClass("select-all-products")
                        .attr({
                            type: "checkbox",
                        })
                        .click(function () {
                            lib.selectAllProducts("view_2551");
                        })
                )
            );

            $("#view_2551 table tbody tr:not(.kn-table-group)").prepend(
                $("<td>").append(
                    $("<input>").addClass("select-product").attr({
                        type: "checkbox",
                    })
                )
            );
            $("#view_2551 table tbody td:last-child").hide();
            $("#view_2551 table th:last-child").hide();
        });
        // lib.addTask('Assign applicant ID to invite link', 'knack-scene-render.scene_1101', function (event, scene) {
        $(document).on("knack-scene-render.scene_1101", function (event, scene) {
            // lib.addRequisitionToUrl('view_2387', ['view_2383', 'view_2389']);

            $("#view_2554, #view_2555").prepend(
                $("<form>").css("margin-bottom", "10px")
            );

            var requisition = Knack.models.view_2544.toJSON().id;

            $("#view_2551 table tbody td:last-child").hide();
            $("#view_2551 table th:last-child").hide();

            $("#view_2554 .kn-link").click(function (e) {
                e.preventDefault();

                lib.assignInvites(
                    "view_2551",
                    "view_2554",
                    "https://api.knack.com/v1/pages/scene_1104/views/view_2552/records",
                    requisition,
                    "field_309",
                    "Please select at least one contrax applicant."
                );
            });
        });

        lib.addMethod("setRequisitionForm", function (formView) {
            var requisition = lib.urlParams();

            if (!requisition.id) {
                alert("Error loading form, please try again.");
                return $(".close-modal").click();
            }

            var form = $("#" + formView + " form");

            var select = form.find("#" + formView + "-field_103");

            select
                .html(
                    '<option value="' +
                    requisition.id +
                    '">' +
                    requisition.id +
                    "</option>"
                )
                .ready(function () {
                    select.val(requisition.id).change();
                });

            var user = Knack.getUserAttributes();

            if (user.roles.indexOf("object_40") > -1) {
                form.find("#field_1748").val("Yes").change();
            }

            form.find("#field_873").val(requisition.ph).change();
            form.find("#field_1246").val(requisition.ws).change();
        });

        // lib.addTask('Set form', 'knack-scene-render.scene_1041', function (event, scene) {
        $(document).on("knack-scene-render.scene_1041", function (event, scene) {
            lib.setRequisitionForm("view_2385");
            $("#view_2385").show();
            $("#view_2386").show();
            $("#view_3763").hide();
        });

        // lib.addTask('Set form', 'knack-scene-render.scene_1047', function (event, scene) {
        $(document).on("knack-scene-render.scene_1047", function (event, scene) {
            lib.setRequisitionForm("view_2410");
            $("#view_2410").show();
            $("#view_2411").show();
            $("#view_3764").hide();
        });

        // lib.addTask('Hide crumbtrail', 'knack-scene-render.any', function (event, scene) {
        $(document).on("knack-scene-render.any", function (event, scene) {
            if (
                scene.key == "scene_993" ||
                scene.key == "scene_998" ||
                scene.key == "scene_1023" ||
                scene.key == "scene_1030" ||
                scene.key == "scene_1031" ||
                scene.key == "scene_1032"
            ) {
                $(".kn-crumbtrail").css("visibility", "hidden");
            } else {
                $(".kn-crumbtrail").css("visibility", "visible");
            }

            if (
                scene.key == "scene_1023" ||
                scene.key == "scene_1030" ||
                scene.key == "scene_1031" ||
                scene.key == "scene_1032"
            ) {
                $(".back-link, .kn-back-link").remove();
            }
        });

        // lib.addTask('Connect worker user', 'knack-view-render.view_2361', function (event, view) {
        $(document).on("knack-view-render.view_2361", function (event, view) {
            var form = $("#" + view.key + " form");
            var submit = form.find("button:submit");

            submit.click(function (e) {
                e.preventDefault();

                lib.showSpinner();

                var email = form.find("#field_1339").val().trim();

                if (email == "") {
                    return console.log("no hay email");
                    lib.hideSpinner();
                    return form.submit();
                }

                lib
                    .find(lib.OBJECTS_IDS.Worker, [
                        {
                            field: "field_304",
                            operator: "is",
                            value: email,
                        },
                    ])
                    .then(function (response) {
                        if (response.records.length == 0) {
                            lib.hideSpinner();
                            form.submit();
                        } else {
                            var worker = response.records[0].id;
                            var workerSelect = form.find("#view_2361-field_1332");

                            workerSelect
                                .html(
                                    '<option value="' + worker + '">' + worker + "</option>"
                                )
                                .val(worker)
                                .ready(function () {
                                    lib.hideSpinner();
                                    form.submit();
                                });
                        }
                    })
                    .fail(lib.handleError);
            });
        });

        // lib.addTask('Submit form on render', 'knack-scene-render.scene_998', function (event, scene) {
        $(document).on("knack-scene-render.scene_998", function (event, scene) {
            $("#view_2242 form").submit();
        });

        // lib.addTask('Copy charge codes', 'knack-form-submit.view_2473', function (event, view, record) {
        $(document).on(
            "knack-form-submit.view_2473",
            function (event, view, record) {
                lib.showSpinner();

                var poNumber = "";

                if (record.field_494 != "") {
                    var chargeCodes = record.field_494_raw;

                    for (var i = 0; i < chargeCodes.length; i++) {
                        poNumber += chargeCodes[i].identifier;

                        if (i < chargeCodes.length - 1) {
                            poNumber += ", ";
                        }
                    }
                }

                lib
                    .update(
                        lib.OBJECTS_IDS.Contract,
                        record.id,
                        JSON.stringify({
                            field_940: poNumber,
                        })
                    )
                    .always(function () {
                        lib.hideSpinner();
                    });
            }
        );

        lib.addMethod("selectAllTE", function () {
            if ($(".select-all-te").attr("checked")) {
                $(".select-te").attr("checked", true);
            } else {
                $(".select-te").attr("checked", false);
            }
        });

        lib.addMethod("waitFormView", function (view, callback) {
            if (document.getElementById(view)) {
                console.log("wait view success: ", document.getElementById(view))
                callback();
            } else {
                setTimeout(function () {
                    lib.waitFormView(view, callback);
                }, 1000);
            }
        });

        // var waitCellDropdown = async (elem,timer) => {
        //     let retElem = document.getElementById(elem);
        //     for (var i = 0; i < timer+1; i++) {
        //         if (document.getElementById(elem) || i == timer) {
        //             // retElem = $("#view_631_celleditor-field_490");
        //             retElem = document.getElementById(elem);
        //             break;
        //         }
        //         await sleep(100);
        //     }
        //
        //     return retElem;
        // }

        var RENDERED = [];
        lib.addMethod("setTEView", function (table1, table2, formView) {
            lib.loadLibrary("async", async function () {
                var visibleTable = document.getElementById(table1) ? table1 : table2;

                var tes = Knack.models[visibleTable].data.models.map(function (r) {
                    return r.toJSON();
                });

                tes = tes.filter(function (te) {
                    var valid =
                        te.field_386 == "Under Review - Buyer" ||
                        te.field_386 == "Correction Required";
                    return valid;
                });

                $("#" + visibleTable + " table thead tr").prepend(
                    $("<th>").append(
                        $("<input>")
                            .addClass("select-all-te")
                            .attr("type", "checkbox")
                            .click(lib.selectAllTE)
                    )
                );

                $("#" + visibleTable + " table tbody tr:not(.kn-table-group)")
                    .prepend(
                        $("<td>").append(
                            $("<input>").addClass("select-te").attr("type", "checkbox")
                        )
                    )
                    .ready(function () {
                        $("#" + visibleTable + " table tbody tr").each(function (
                            key,
                            value
                        ) {
                            var exists = false;
                            tes.forEach(function (te) {
                                if (te.id == value.id) {
                                    exists = true;
                                }
                            });

                            if (!exists) {
                                $(value).find("input:checkbox").remove();
                            }
                        });
                    });

                $("#" + visibleTable + " table .kn-table-group td").attr(
                    "colspan",
                    "11"
                );

                console.log("form view: ", formView)
                lib.waitFormViewform(`#${formView} form`, function () {

                    var form = $("#" + formView + " form");
                    console.log("form in setteview: ", form)
                    var submit = form.find("button:submit");

                    console.log("submit button: ", submit)

                    submit.unbind("click");

                    submit.click(async function (e) {
                        console.log("inside click")
                        e.preventDefault();

                        lib.removeMessages(formView);
                        submit.attr("disabled", true);
                        lib.showSpinner();

                        var selectedTEs = $(".select-te:checked");

                        if (selectedTEs.length == 0) {
                            submit.attr("disabled", false);
                            lib.showErrorMessage(
                                formView,
                                "Select at least one Time & Expense Card"
                            );
                            lib.hideSpinner();
                            return;
                        }


                        if (selectedTEs.length < 50) {
                            submit.attr("disabled", false);
                            lib.showErrorMessage(
                                formView,
                                "The system requires a minimum of 50 Timecards for batch approvals. Please approve individually or wait until you have the minimum requirement"
                            );
                            lib.hideSpinner();
                            return;
                        }

                        let TEselectedIDS = [];
                        for (let i = 0; i < selectedTEs.length; i++) {
                            TEselectedIDS.push(selectedTEs[i].parentNode.parentNode.id)
                            //console.log(selectedTEs[i].parentNode.parentNode.id)
                        }
                        console.log("selected ids: ", TEselectedIDS)


                        try {
                            var obj = {
                                selectedTEs: TEselectedIDS,
                                token: Knack.getUserToken(),
                                loggedInID: Knack.getUserAttributes().id,
                                loggedInEmail: Knack.user.attributes.values.field_36.email
                            };
                            const response = await $.ajax({
                                type: "PUT",
                                url: lib.CONEXIS_SERVER + "approveSelectedTimeCards",
                                //url: "https://httpstat.us/500",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(obj),
                            })

                            lib.showSuccessMessage(
                                formView,
                                "Processing selected Time Cards, you will receive an email once the process has finished"
                            );

                            disabledViews(visibleTable, "inprocess");
                            lib.hideSpinner();


                        } catch (e) {
                            submit.attr("disabled", false);
                            lib.showErrorMessage(
                                formView,
                                "Error connecting to server,please try again later!"
                            );
                            //lib.refreshView(visibleTable);
                            lib.hideSpinner();
                        }
                        // async.eachSeries(
                        //     selectedTEs,
                        //     function (input, next) {
                        //         var tr = $(input).closest("tr");

                        //         $.ajax({
                        //             type: "PUT",
                        //             headers: lib.headers,
                        //             url:
                        //                 "https://api.knack.com/v1/pages/scene_415/views/view_645/records/" +
                        //                 tr.attr("id"),
                        //             dataType: "json",
                        //             data: JSON.stringify({
                        //                 field_528: "Approve",
                        //                 field_845: Knack.getUserAttributes().id,
                        //             }),
                        //         })
                        //             .then(function (response) {
                        //                 next();
                        //             })
                        //             .fail(function (err) {
                        //                 next(err);
                        //             });
                        //     },
                        //     function (err) {
                        //         submit.attr("disabled", false);
                        //         lib.showSuccessMessage(
                        //             formView,
                        //             "Selected T&E successfully approved."
                        //         );
                        //         lib.refreshView(visibleTable);
                        //         lib.hideSpinner();
                        //     }
                        // );
                    });
                });

                if (RENDERED.indexOf(visibleTable) > -1) {
                    return;
                }

                RENDERED.push(visibleTable);
            });
        });

        // lib.addTask('Render table', 'knack-view-render.view_1858', function (event, view, records) {
        $(document).on(
            "knack-view-render.view_1858",
            function (event, view, records) {
                lib.waitFormView("view_2568", function () {
                    lib.setTEView("view_1858", "view_1859", "view_2568");
                });
            }
        );
        $(document).on("knack-view-render.view_1858", async function (event, view, records) {
            const response = await $.ajax({
                type: 'GET',
                url: lib.CONEXIS_SERVER + 'is_process_runing',
                dataType: 'json',
            });
            if (response.process) {
                console.log("response status is approving TE: ", response.process)
                let actualState = response.process.isApprovingTE;
                if (actualState) {
                    disabledViews(view.key, "inprocess");
                    $("#view_2568 form").find("button:submit").attr("disabled", true)
                    let elemClasses = "custom_notification";

                    let element = `<div class="${elemClasses}">
                        <p><i class="fa fa-info-circle"></i> "The Time and Expense Card approval is currently in-progress.\
                        You will receive an email upon completion of the process. \
                        please check back when this is completed to run the process again"</p>
                        </div>`

                    $("#" + view.key).prepend(element);

                }
            } else {
                console.log("Server error verifying actual status: ", response);
            }
        });

        // lib.addTask('Render table', 'knack-view-render.view_1859', function (event, view, records) {
        $(document).on(
            "knack-view-render.view_1859",
            function (event, view, records) {
                lib.waitFormView("view_2568", function () {
                    lib.setTEView("view_1858", "view_1859", "view_2568");
                });
            }
        );
        $(document).on("knack-view-render.view_1859", async function (event, view, records) {
            const response = await $.ajax({
                type: 'GET',
                url: lib.CONEXIS_SERVER + 'is_process_runing',
                dataType: 'json',
            });
            if (response.process) {
                console.log("response status is approving TE: ", response.process)
                let actualState = response.process.isApprovingTE;
                if (actualState) {
                    disabledViews(view.key, "inprocess");
                    $("#view_2568 form").find("button:submit").attr("disabled", true)
                    let elemClasses = "custom_notification";

                    let element = `<div class="${elemClasses}">
                        <p><i class="fa fa-info-circle"></i> "The Time and Expense Card approval is currently in-progress.\
                        You will receive an email upon completion of the process. \
                        please check back when this is completed to run the process again"</p>
                        </div>`

                    $("#" + view.key).prepend(element);

                }
            } else {
                console.log("Server error verifying actual status: ", response);
            }
        });

        // lib.addTask('Render table', 'knack-view-render.view_642', function (event, view, records) {
        $(document).on(
            "knack-view-render.view_642",
            function (event, view, records) {
                lib.waitFormView("view_2569", function () {
                    lib.setTEView("view_642", "view_x", "view_2569");
                });
            }
        );
        // con-130
        $(document).on("knack-view-render.view_642", async function (event, view, records) {

            const response = await $.ajax({
                type: 'GET',
                url: lib.CONEXIS_SERVER + 'is_process_runing',
                dataType: 'json',
            });
            if (response.process) {
                console.log("response status is approving TE: ", response.process)
                let actualState = response.process.isApprovingTE;
                if (actualState) {
                    disabledViews(view.key, "inprocess");
                    $("#view_2569 form").find("button:submit").attr("disabled", true)
                    let elemClasses = "custom_notification";

                    let element = `<div class="${elemClasses}">
                                    <p><i class="fa fa-info-circle"></i> "The Time and Expense Card approval is currently in-progress.\
                                    You will receive an email upon completion of the process. \
                                    please check back when this is completed to run the process again"</p>
                                    </div>`

                    $("#" + view.key).prepend(element);

                }
            } else {
                console.log("Server error verifying actual status: ", response);
                // let elemClasses = "custom_notification error";

                // let element = `<div class="${elemClasses}">
                // <p><i class="fa fa-info-circle"></i> "Error Connecting to server"</p>
                // </div>`

                // $("#" + view.key).prepend(element);
            }
        });

        // lib.addTask('Render T&E tables', 'knack-scene-render.scene_870s', function (event, scene) {
        $(document).on("knack-scene-render.scene_870s", function (event, scene) {
            if (
                RENDERED.indexOf("view_1858") > -1 ||
                RENDERED.indexOf("view_1859") > -1
            ) {
                return;
            }
            lib.setTEView("view_1858", "view_1859", "view_2568", true);
        });

        // lib.addTask('Render T&E tables', 'knack-scene-render.scene_39xs', function (event, scene) {
        // $(document).on("knack-scene-render.scene_39xs", function (event, scene) {
        //     lib.setTEView("view_642", "view_x", "view_2569", true);
        // });

        lib.addMethod("setSupplierChildForm", function (view, form) {
            var supplierSelect = $(`#${view}-field_51`);

            $(`#${form}-field_315`)
                .val(supplierSelect.val())
                .change()
                .trigger("liszt:updated");
        });

        // lib.addTask('Supplier field in child form', 'knack-view-render.view_1792', function (event, view, records) {
        $(document).on(
            "knack-view-render.view_1792",
            function (event, view, records) {
                lib.setSupplierChildForm("view_1791", view.key);
            }
        );

        lib.addMethod(
            "validateStartEndDates",
            function (
                e,
                view,
                form,
                status,
                startField,
                endField,
                validationMessage
            ) {
                lib.removeMessages(view);

                if (status.val() != "2. Active") {
                    return;
                }

                e.preventDefault();

                var startDate = form.find(`#${view}-${startField}`).val();
                var endDate = form.find(`#${view}-${endField}`).val();

                if (startDate == "") {
                    return lib.showErrorMessage(view, "Actual Start Date is required.");
                }

                if (endDate == "") {
                    return lib.showErrorMessage(view, "End Date is required.");
                }

                startDate = moment(startDate, "L");
                endDate = moment(endDate, "L");

                if (endDate <= startDate) {
                    return lib.showErrorMessage(view, validationMessage);
                }

                form.submit();
            }
        );

        lib.addMethod(
            "validateEndDates",
            function (e, view, form, startField, endField, validationMessage) {
                e.preventDefault();

                lib.removeMessages(view);

                var startDate = form.find(`#${view}-${startField}`).val();
                var endDate = form.find(`#${view}-${endField}`).val();

                if (startDate == "") {
                    return lib.showErrorMessage(
                        view,
                        "Current Contract End Date is required."
                    );
                }

                if (endDate == "") {
                    return lib.showErrorMessage(
                        view,
                        "Amendment End Date is required."
                    );
                }

                startDate = moment(startDate, "L");
                endDate = moment(endDate, "L");

                if (endDate <= startDate) {
                    return lib.showErrorMessage(view, validationMessage);
                }

                form.submit();
            }
        );

        lib.addMethod(
            "validateDates",
            function (
                view,
                statusField,
                startField,
                endField,
                validationMessage,
                contract
            ) {
                lib.loadLibrary("moment", function () {
                    var form = $(`#${view} form`);
                    var status = form.find(`#${view}-${statusField}`);
                    var submit = form.find("button:submit");

                    submit.click(function (e) {
                        if (contract == 0) {
                            lib.validateStartEndDates(
                                e,
                                view,
                                form,
                                status,
                                startField,
                                endField,
                                validationMessage
                            );
                        } else {
                            lib.validateEndDates(
                                e,
                                view,
                                form,
                                startField,
                                endField,
                                validationMessage
                            );
                        }
                    });
                });
            }
        );

        // lib.addTask('validateDates', 'knack-view-render.view_1780', function (event, view, record) {
        $(document).on(
            "knack-view-render.view_1780",
            function (event, view, record) {

                $("#kn-input-field_1840").change(function (e) {
                    $(`#${view.key} #kn-input-field_1147 #view_1780-field_1147`).val(record.field_54)
                });
                lib.validateDates(
                    view.key,
                    "field_55",
                    "field_1190",
                    "field_1147",
                    "End Date must be after Actual Start Date.",
                    0
                );
            }
        );

        // lib.addTask('validateDates', 'knack-view-render.view_1776', function (event, view, record) {
        $(document).on(
            "knack-view-render.view_1776",
            function (event, view, record) {
                lib.validateDates(
                    view.key,
                    "field_55",
                    "field_1190",
                    "field_1147",
                    "End Date must be after Actual Start Date.",
                    0
                );
            }
        );

        // lib.addTask('validateDates', 'knack-view-render.view_1664', function (event, view, record) {
        $(document).on(
            "knack-view-render.view_1664",
            function (event, view, record) {
                // lib.validateDates(
                //     view.key,
                //     "",
                //     "field_1138",
                //     "field_1091",
                //     "Amendment End Date must be after Current Contract End Date.",
                //     1
                // );


                var form = $(`#${view.key} form`);
                var submit = form.find("button:submit");

                lib.removeMessages(view.key);

                $("#kn-input-field_1085 label").append('<span class="kn-required"> *</span>')
                $("#kn-input-field_1086 label").append('<span class="kn-required"> *</span>')
                $("#kn-input-field_1087 label").append('<span class="kn-required"> *</span>')
                $("#kn-input-field_1088 label").append('<span class="kn-required"> *</span>')

                let payrate = $("#kn-input-field_1085 input");
                let billrate = $("#kn-input-field_1086 input");
                let overtimerate = $("#kn-input-field_1087 input");
                let doubleTimeRate = $("#kn-input-field_1088 input");
                console.log("runing new implementation")

                submit.click(function (e) {
                    e.preventDefault();
                    lib.loadLibrary("moment", function () {
                        lib.removeMessages(view.key);

                        console.log("submit click")
                        let payrateval = payrate.val();
                        let billrateval = billrate.val();
                        let overtimerateval = overtimerate.val();
                        let doubleTimeRateval = doubleTimeRate.val();

                        var startDate = form.find(`#${view.key}-field_1138`).val();
                        var endDate = form.find(`#${view.key}-field_1091`).val();

                        if (startDate == "") {
                            return lib.showErrorMessage(
                                view.key,
                                "Current Contract End Date is required."
                            );
                        }

                        if (endDate == "") {
                            return lib.showErrorMessage(
                                view.key,
                                "Amendment End Date is required."
                            );
                        }

                        startDate = moment(startDate, "L");
                        endDate = moment(endDate, "L");

                        if (endDate <= startDate) {
                            return lib.showErrorMessage(view.key, "Amendment End Date must be after Current Contract End Date.");
                        }

                        if (!payrateval || !billrateval || !overtimerateval || !doubleTimeRateval) {
                            alert("All the Contract Rates must be entered in order to submit the form, please fill in all the rates")
                        } else {
                            form.submit();
                            // console.log("en form submit")
                        }
                    });
                });

            }
        );

        // lib.addTask('validateDates', 'knack-view-render.view_1666', function (event, view, record) {
        $(document).on(
            "knack-view-render.view_1666",
            function (event, view, record) {
                lib.validateDates(
                    view.key,
                    "",
                    "field_1138",
                    "field_1091",
                    "Amendment End Date must be after Current Contract End Date.",
                    1
                );
            }
        );

        $(document).on(
            "knack-scene-render.scene_686",
            function (event, view, data) {
                var workShifts = Knack.models.view_2781.toJSON();
                var form = $(`#view_1352 form`);
                var ws1 = form.find("#kn-input-field_761");
                var ws2 = form.find("#kn-input-field_798");
                var ws3 = form.find("#kn-input-field_799");

                switch (workShifts.field_797) {
                    case 0:
                        ws1.hide();
                        ws2.hide();
                        ws3.hide();
                        break;
                    case 1:
                        ws2.hide();
                        ws3.hide();
                        break;
                    case 2:
                        ws1.hide();
                        ws3.hide();
                        break;
                    case 3:
                        ws1.hide();
                        ws2.hide();
                        break;
                }
            }
        );

        // lib.addTask('Validate payment amount', 'knack-scene-render.scene_1181', function (event, scene) {
        $(document).on("knack-scene-render.scene_1181", function (event, scene) {
            var details = Knack.models.view_2809.toJSON();

            var rpms = details.field_1661_raw || 0;
            var rb = details.field_1612_raw || 0;

            var formView = "view_2807";
            var form = $(`#${formView} form`);
            var amountInput = form.find("#field_1610");
            var submit = form.find("button:submit");

            submit.click(function (e) {
                e.preventDefault();

                //lib.removeMessages(formView);
                $("#custom-errors-msg").remove();

                var amount = amountInput.val() == "" ? 0 : amountInput.val();
                amount = amount.replace("$", "");
                amount = parseFloat(amount);

                if (amount > rpms && !details.field_1710_raw) {
                    return lib.showErrorMessage(
                        formView,
                        "The payment amount is greater than the remaining payable amount to suppliers. Additional buyer payments must be added first."
                    );
                }

                if (amount > rb) {
                    return lib.showErrorMessage(
                        formView,
                        "The payment amount cannot be greater than the remaining balance of this supplier invoice."
                    );
                }

                form.submit();
            });
        });

        // lib.addTask('refresh views', 'knack-form-submit.view_2807', function () {
        $(document).on("knack-form-submit.view_2807", function () {
            lib.refreshView("view_2809");
        });

        lib.addMethod("selectAllSuppliersPayments", function () {
            if ($(".select-all-suppliers-payments").attr("checked")) {
                $(".select-supplier-payment").attr("checked", true);
            } else {
                $(".select-supplier-payment").attr("checked", false);
            }
        });

        lib.addMethod("waitTotalsRowSuppliersTable", function (callback) {
            if ($(`#view_2805 table .kn-table-totals`).length > 0) {
                callback();
            } else {
                setTimeout(() => {
                    lib.waitTotalsRowSuppliersTable(callback);
                }, 100);
            }
        });

        // lib.addTask('Apply Supplier Payment', 'knack-view-render.view_2805', function (event, view, records) {
        $(document).on(
            "knack-view-render.view_2805",
            function (event, view, records) {
                lib.waitTotalsRowSuppliersTable(function () {
                    console.log(records);
                    $(`#${view.key} table thead tr`).prepend(
                        $("<th>").append(
                            $("<input>")
                                .addClass("select-all-suppliers-payments")
                                .attr("type", "checkbox")
                                .click(lib.selectAllSuppliersPayments)
                        )
                    );

                    $(`#${view.key} table tbody tr`).prepend($("<td>"));

                    records.forEach((supp) => {
                        if (supp.field_1612_raw && supp.field_1612_raw > 0) {
                            $(`#${view.key} table tr#${supp.id} td`)
                                .first()
                                .append(
                                    $("<input>")
                                        .addClass("select-supplier-payment")
                                        .attr("type", "checkbox")
                                );
                        }
                    });
                });
            }
        );

        lib.addMethod("addSupplierInvoicesPayment", function (obj) {
            obj.token = Knack.getUserToken();
            return $.ajax({
                type: "POST",
                url: lib.CONEXIS_SERVER + "apply-supplier-payments",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(obj),
            });
        });

        // lib.addTask('Send Selected Supplier Payments', 'knack-scene-render.scene_1191', function (event, scene) {
        $(document).on("knack-scene-render.scene_1191", function (event, scene) {
            var selectedSupplierInvoices = $(
                "#view_2805 table .select-supplier-payment:checked"
            ).closest("tr");

            if (selectedSupplierInvoices.length == 0) {
                return $("#view_2851 h2").text(
                    "At least one supplier invoice must be selected."
                );
            }

            var invoice = Knack.models.view_2841.toJSON();
            var supplierInvoices = Knack.models.view_2805.data.models.map(function (
                r
            ) {
                return r.toJSON();
            });

            supplierInvoices = supplierInvoices.filter(function (supp) {
                var selected = false;

                selectedSupplierInvoices.each(function (key, value) {
                    if (supp.id == value.id) {
                        selected = true;
                    }
                });

                return selected;
            });

            var totalRemainingBalance = 0;

            supplierInvoices.forEach(function (supp) {
                totalRemainingBalance += supp.field_1612_raw || 0;
            });

            console.log(totalRemainingBalance);

            if (
                invoice.field_1661_raw < totalRemainingBalance &&
                !invoice.field_1710_raw
            ) {
                return $("#view_2851 h2").text(
                    "Total of selected invoices is greater than the remaining payable amount to suppliers. Additional buyer payments must be added first."
                );
            }

            $("#view_2851 h2").text("Payments processing, please wait…");

            lib.showSpinner();

            var obj = {
                user: Knack.getUserAttributes(),
                suppliers: supplierInvoices,
                date: $("#add-supplier-invoice-date").val(),
            };

            lib
                .addSupplierInvoicesPayment(obj)
                .then(function (response) {
                    console.log(response);
                    $("#view_2851 h2").text(
                        "Process complete. Returning to previous page..."
                    );

                    lib.hideSpinner();
                    setTimeout(() => {
                        $("#view_2850 form").submit();
                    }, 3000);
                })
                .fail(function (error) {
                    console.log(error);
                    $("#view_2851 h2").text("There was an error, please try again.");
                    lib.hideSpinner();
                });
        });

        lib.addMethod("setSupplierDropdown", function (formView, parentView) {
            var workerForm = $(`#connection-form-view form`);
            var parentForm = $(`#${parentView} form`);

            var parentSupplier = parentForm.find(`#${parentView}-field_51`);
            var workerSupplier = workerForm.find(`#${formView}-field_315`);

            if (parentSupplier.val() == "") {
                workerForm.find("button:submit").hide();
                return lib.showErrorMessage(
                    "connection-form-view",
                    "Select a supplier in the Add Contract form"
                );
            }

            workerSupplier.val(parentSupplier.val());
        });

        // lib.addTask('Populate supplier dropdown', 'knack-view-render.view_1024', function (event, view, data) {
        $(document).on(
            "knack-view-render.view_1024",
            function (event, view, data) {
                lib.setSupplierDropdown(view.key, "view_996");
            }
        );

        // lib.addTask('Populate supplier dropdown', 'knack-view-render.view_1792', function (event, view, data) {
        $(document).on(
            "knack-view-render.view_1792",
            function (event, view, data) {
                lib.setSupplierDropdown(view.key, "view_1791");
            }
        );

        // lib.addTask('Populate supplier dropdown', 'knack-view-render.view_2732', function (event, view, data) {
        $(document).on(
            "knack-view-render.view_2732",
            function (event, view, data) {
                lib.setSupplierDropdown(view.key, "view_2731");
            }
        );

        //Sebastian validate Contract End Dates
        $(document).on(
            "knack-view-render.view_2731",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on(
            "knack-view-render.view_2512",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on(
            "knack-view-render.view_2438",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on(
            "knack-view-render.view_1757",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on(
            "knack-view-render.view_1756",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on(
            "knack-view-render.view_1212",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on('knack-view-render.view_996', function (event, view, data) {
            validateFormContractDates(view.key);
        });
        $(document).on('knack-view-render.view_1791', function (event, view, data) {
            validateFormContractDates(view.key);
        });
        $(document).on(
            "knack-view-render.view_1758",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on(
            "knack-view-render.view_1759",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on(
            "knack-view-render.view_1428",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on(
            "knack-view-render.view_1427",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on(
            "knack-view-render.view_2928",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );
        $(document).on('knack-view-render.view_3441', function (event, view, data) {
            validateFormContractDates(view.key);
        });
        $(document).on(
            "knack-view-render.view_1200",
            function (event, view, data) {
                validateFormContractDates(view.key);
            }
        );

        function validateFormContractDates(view) {
            console.log("listener for view: " + view);
            var form = $(`#${view} form`);
            var button = form.find("button:submit");
            let startdateField = $("#kn-input-field_53 input");
            let enddateField = $("#kn-input-field_54 input");
            let startdateField2 = $("#kn-input-field_93 input");
            let enddateField2 = $("#kn-input-field_348 input");
            console.log(startdateField)
            console.log(enddateField)

            if (Knack.views[view].model.attributes.field_2052 && Knack.views[view].model.attributes.field_2052 == "Yes") {
                console.log("perm hire ")
                return
            }

            button.click(function (e) {
                e.preventDefault();
                lib.removeMessages(view);
                let pStartDate = startdateField.val();
                let pEndDate = enddateField.val();
                let pStartDate2 = startdateField2.val();
                let pEndDate2 = enddateField2.val();
                console.log(pStartDate)
                console.log(pEndDate)


                if (

                    (pStartDate2 !== null && pEndDate2 !== null && pStartDate2 !== undefined)
                ) {
                    console.log(pStartDate2)
                    console.log(pEndDate2)
                    console.log("text")
                    lib.loadLibrary("moment", function () {
                        // pStartDate = moment(pStartDate).format("MM-DD-YYYY");
                        // pEndDate = moment(pEndDate).format("MM-DD-YYYY");
                        // pStartDate2 = moment(pStartDate2).format("MM-DD-YYYY"); //old
                        // pEndDate2 = moment(pEndDate2).format("MM-DD-YYYY"); // old
                        // let datesValid = moment(pEndDate).isAfter(pStartDate);

                        pStartDate2 = moment.utc(pStartDate2, 'MM-DD-YYYY[T]HH:mm[Z]').format(); //new
                        pEndDate2 = moment.utc(pEndDate2, 'MM-DD-YYYY[T]HH:mm[Z]').format(); // new

                        let datesValid2 = moment(pEndDate2).isAfter(pStartDate2); // true

                        if (!datesValid2) {
                            console.log("text")
                            lib.showErrorMessage(
                                view,
                                "Planned end date must be after planned start date."
                            );
                            return
                            // lib.showErrorMessageBottom(
                            //   view,
                            //   "Planned end date must be after planned start date.",
                            //   button.parent()
                            // );
                        } else {
                            form.submit();
                            return
                        }
                    });
                }

                if (

                    (pStartDate !== null && pEndDate !== null && pStartDate !== undefined)
                ) {
                    console.log(pStartDate)
                    console.log("text")
                    console.log(pEndDate)
                    lib.loadLibrary("moment", function () {
                        // pStartDate = moment(pStartDate).format("MM-DD-YYYY");
                        // pEndDate = moment(pEndDate).format("MM-DD-YYYY");
                        // pStartDate = moment(pStartDate).format("MM-DD-YYYY"); // old
                        // pEndDate = moment(pEndDate).format("MM-DD-YYYY"); // old
                        // let datesValid = moment(pEndDate).isAfter(pStartDate);

                        pStartDate = moment.utc(pStartDate, 'MM-DD-YYYY[T]HH:mm[Z]').format(); // new
                        pEndDate = moment(pEndDate, 'MM-DD-YYYY[T]HH:mm[Z]').format(); // new

                        let datesValid = moment(pEndDate).isAfter(pStartDate); // true

                        if (!datesValid) {
                            console.log("text")
                            lib.showErrorMessage(
                                view,
                                "Planned end date must be after planned start date."
                            );
                            return
                            // lib.showErrorMessageBottom(
                            //   view,
                            //   "Planned end date must be after planned start date.",
                            //   button.parent()
                            // );
                        } else {
                            form.submit();
                            return
                        }
                    });
                }
                else {
                    form.submit();
                    // if (pStartDate == '') {
                    //     lib.showErrorMessage(view, 'Actual Start Date is required.');
                    //     lib.showErrorMessageBottom(view,'Actual Start Date is required.', button.parent());
                    // }
                    // if (pEndDate == '') {
                    //     lib.showErrorMessage(view, 'End Date is required.');
                    //     lib.showErrorMessageBottom(view,'End Date is required.', button.parent());
                    // }
                }
            });
        }

        lib.addMethod("getBuyerConnectionsSearch", function (obj) {
            lib.loadLibrary("async", function () {
                var filter = function (buyer) {
                    lib.showSpinner();

                    async.parallel(
                        {
                            suppliers: function (callback) {
                                lib
                                    .find(lib.OBJECTS_IDS.Supplier, [
                                        {
                                            field: "field_20",
                                            operator: "is",
                                            value: buyer,
                                        },
                                    ])
                                    .then(function (result) {
                                        callback(null, result.records);
                                    });
                            },
                            businessUnits: function (callback) {

                                lib
                                    .find(lib.OBJECTS_IDS.BusinessUnit, [
                                        {
                                            field: "field_1627",
                                            operator: "is",
                                            value: buyer,
                                        },
                                    ])
                                    .then(function (result) {
                                        callback(null, result.records);
                                    });
                            },
                            glCodes: function (callback) {
                                lib
                                    .find(lib.OBJECTS_IDS.GLCode, [
                                        {
                                            field: "field_1635",
                                            operator: "is",
                                            value: buyer,
                                        },
                                    ])
                                    .then(function (result) {
                                        callback(null, result.records);
                                    });
                            },
                            costCenters: function (callback) {
                                lib
                                    .find(lib.OBJECTS_IDS.CostCenter, [
                                        {
                                            field: "field_356",
                                            operator: "is",
                                            value: buyer,
                                        },
                                    ])
                                    .then(function (result) {
                                        callback(null, result.records);
                                    });
                            },
                        },
                        function (err, results) {
                            console.log(results);
                            var supplierDrp = $(
                                `#${obj.searchView} select[name="${obj.supplierDrpdId}"]`
                            );
                            var businessUnitDrp = $(
                                `#${obj.searchView} select[name="${obj.businnesUnitDrpdId}"]`
                            );
                            var businessUnitLst = businessUnitDrp
                                .siblings()
                                .find(".chzn-results");
                            var glCodeDrp = $(
                                `#${obj.searchView} select[name="${obj.glCodeDrpdId}"]`
                            );
                            var costCenterDrp = $(
                                `#${obj.searchView} select[name="${obj.costCenterDrpdId}"]`
                            );

                            setTimeout(function () {
                                $(".search-choice").remove();
                                supplierDrp.html('<option value="">Select</option>');
                                businessUnitDrp.html("");
                                businessUnitLst.html("");
                                glCodeDrp.html('<option value="">Select</option>');
                                costCenterDrp.html('<option value="">Select</option>');

                                results.suppliers.forEach(function (val) {
                                    supplierDrp.append(
                                        `<option value="${val.id}">${val.field_10}</option>`
                                    );
                                });

                                results.glCodes.forEach(function (val) {
                                    glCodeDrp.append(
                                        `<option value="${val.id}">${val.field_1628}</option>`
                                    );
                                });

                                results.costCenters.forEach(function (val) {
                                    costCenterDrp.append(
                                        `<option value="${val.id}">${val.field_252}</option>`
                                    );
                                });

                                //console.log("bussines untis results: ", results.businessUnits)

                                var nbu = 0;
                                results.businessUnits.forEach(function (val) {
                                    businessUnitDrp.append(
                                        `<option value="${val.id}">${val.field_1576}</option>`
                                    );

                                    businessUnitLst.append(
                                        `<li id="kn_conn_field_1571_chzn_o_${nbu}" class="active-result" style="">${val.field_1576}</li>`
                                        //`<li id="kn_conn_field_1571_chzn_o_${val.currentFrontID}" class="active-result" style="">${val.field_1576}</li>`//test
                                    );
                                    nbu++;
                                });
                                businessUnitDrp.trigger("liszt:updated");
                                lib.hideSpinner();
                            }, 1000);
                        }
                    );
                };
                if (obj.buyerView) {
                    var selectedBuyer = Knack.models[obj.buyerView].toJSON();
                    console.log(selectedBuyer);
                    filter(
                        lib.getFieldValue(selectedBuyer, "field_439", "connection").id
                    );
                } else {
                    var buyerDrp = $(
                        `#${obj.searchView} select[name="${obj.buyerDrpdId}"]`
                    );

                    buyerDrp.change(function () {
                        var selectedBuyer = buyerDrp.val();
                        filter(selectedBuyer);
                    });
                }
            });
        });

        lib.addMethod("waitBuyer", function (callback) {
            if (
                document.getElementById("view_2891") &&
                Knack.models.view_2891.toJSON().id != undefined
            ) {
                setTimeout(function () {
                    callback();
                }, 500);
            } else {
                setTimeout(function () {
                    lib.waitBuyer(callback);
                }, 500);
            }
        });

        var testURL = lib.CONEXIS_SERVER;
        // var testURL='https://8d1f66bb.ngrok.io/api/v1/';
        //CONEXIS_SERVER
        //Scanning feature
        $(document).on(
            "knack-view-render.view_2940",
            async function (event, view, data) {
                let userEmail = Knack.getUserAttributes().email;
                // let userEmail="sebastian@soluntech.com" //Knack.getUserAttributes().email;
                let scanUrl = testURL + "scan_amendments" + `?email=${userEmail}`;
                // let lineItemRecords=await lib.find(lib.OBJECTS_IDS.lineItems,"");
                // console.log(lineItemRecords.records);

                $("#view_2940 a")
                    .addClass("is-primary")
                    .click(async function (e) {
                        e.preventDefault();

                        $.ajax({
                            type: "GET",
                            url: scanUrl,
                            contentType: "application/json",
                        })
                            .then(function (response) {
                                console.log("success");
                                console.log(response);
                                if (response.message == "critical")
                                    response = "Security Compromised. Prevent Scan Feature.";
                                else if (response.message == "procedure")
                                    response = "Daily Scan already ran its course today.";
                                else if (response.message == "unexpected")
                                    response =
                                        "Unexpected error occur while updating Daily Scan!";
                                else
                                    response =
                                        "Scan running, please wait for email Completion Notification.";
                                alert(response);
                            })
                            .fail(function (err) {
                                console.log("error");
                                console.log(err);
                                alert(
                                    "Unexpected error occur. Please confirm Server status."
                                );
                            });
                    });
            }
        );

        // lib.addTask('filter by buyer search', 'knack-view-render.view_2886', function (event, view) {
        $(document).on("knack-view-render.view_2886", function (event, view) {
            lib.getBuyerConnectionsSearch({
                buyerView: false,
                searchView: view.key,
                buyerDrpdId: "field_47",
                supplierDrpdId: "field_51",
                businnesUnitDrpdId: "field_1571",
                glCodeDrpdId: "field_1644",
                costCenterDrpdId: "field_494",
            });
        });

        // lib.addTask('filter by buyer search', 'knack-view-render.view_2906', function (event, view) {
        $(document).on("knack-view-render.view_2906", async function (event, view) {
            lib.getBuyerConnectionsSearch({
                buyerView: false,
                searchView: view.key,
                buyerDrpdId: "field_1723",
                // buyerDrpdId: "field_440",
                supplierDrpdId: "field_51",
                businnesUnitDrpdId: "field_1571",
                glCodeDrpdId: "field_1644",
                costCenterDrpdId: "field_494",
            });
            //prevent export
            $("#view_2906 .kn-export-button").click(function (e) {
                const numberRecords = $("#view_2906 .kn-entries-summary").text().trim().split(" ").pop();
                if (numberRecords > 5000) {
                    alert("The report you are requesting to export has greater than the allowable limit of 5,000 lines. Please narrow your search criteria and retry.")
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    $(".close-modal").click()
                }
            });
            // // test
            // var recordsTest = await lib.find("object_37", [
            //     { field: "field_1723", operator: "is", value: "5bfecfdd31782f6061574545" }
            // ]);
            // console.log("test records: ", recordsTest)
        });

        // lib.addTask('filter by buyer search', 'knack-view-render.view_2890', function (event, view) {
        $(document).on("knack-view-render.view_2890", function (event, view) {
            lib.waitBuyer(function () {
                lib.getBuyerConnectionsSearch({
                    buyerView: "view_2891",
                    searchView: view.key,
                    buyerDrpdId: "field_47",
                    supplierDrpdId: "field_51",
                    businnesUnitDrpdId: "field_1571",
                    glCodeDrpdId: "field_1644",
                    costCenterDrpdId: "field_494",
                });
            });
        });

        // lib.addTask('filter by buyer search', 'knack-view-render.view_2909', function (event, view) {
        $(document).on("knack-view-render.view_2909", function (event, view) {
            lib.waitBuyer(function () {
                lib.getBuyerConnectionsSearch({
                    buyerView: "view_2891",
                    searchView: view.key,
                    buyerDrpdId: "field_47",
                    supplierDrpdId: "field_51",
                    businnesUnitDrpdId: "field_1571",
                    glCodeDrpdId: "field_1644",
                    costCenterDrpdId: "field_494",
                });
            });
            //prevent export
            $("#view_2909 .kn-export-button").click(function (e) {
                //*[@id="view_2909"]/div[2]/div[1]/div[2]/div[1]/div[1]/text()[2]
                const numberRecords = $("#view_2909 .kn-entries-summary").text().trim().split(" ").pop();
                if (numberRecords > 5000) {
                    alert("The report you are requesting to export has greater than the allowable limit of 5,000 lines. Please narrow your search criteria and retry.")
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    $(".close-modal").click()
                }
            });
        });

        lib.addMethod("connectCreatedUsers", async function (user) {
            lib.loadLibrary("async", async function () {
                lib.showSpinner();

                var email = user.field_36_raw.email;

                async.parallel(
                    {
                        buyerAdmin: function (callback) {
                            lib
                                .find(lib.OBJECTS_IDS.BuyerAdmin, [
                                    {
                                        field: "field_199",
                                        operator: "is",
                                        value: email,
                                    },
                                ])
                                .then(function (result) {
                                    callback(null, result.records);
                                });
                        },
                        supplierAdmin: function (callback) {
                            lib
                                .find(lib.OBJECTS_IDS.SupplierAdmin, [
                                    {
                                        field: "field_111",
                                        operator: "is",
                                        value: email,
                                    },
                                ])
                                .then(function (result) {
                                    callback(null, result.records);
                                });
                        },
                        requester: function (callback) {
                            lib
                                .find(lib.OBJECTS_IDS.Requester, [
                                    {
                                        field: "field_179",
                                        operator: "is",
                                        value: email,
                                    },
                                ])
                                .then(function (result) {
                                    callback(null, result.records);
                                });
                        },
                        buyerFinance: function (callback) {
                            lib
                                .find(lib.OBJECTS_IDS.BuyerFinance, [
                                    {
                                        field: "field_189",
                                        operator: "is",
                                        value: email,
                                    },
                                ])
                                .then(function (result) {
                                    callback(null, result.records);
                                });
                        },
                        approver: function (callback) {
                            lib
                                .find(lib.OBJECTS_IDS.Approver, [
                                    {
                                        field: "field_184",
                                        operator: "is",
                                        value: email,
                                    },
                                ])
                                .then(function (result) {
                                    callback(null, result.records);
                                });
                        },
                        supplierFinance: function (callback) {
                            lib
                                .find(lib.OBJECTS_IDS.SupplierFinance, [
                                    {
                                        field: "field_536",
                                        operator: "is",
                                        value: email,
                                    },
                                ])
                                .then(function (result) {
                                    callback(null, result.records);
                                });
                        },
                        proposer: function (callback) {
                            lib
                                .find(lib.OBJECTS_IDS.Proposer, [
                                    {
                                        field: "field_194",
                                        operator: "is",
                                        value: email,
                                    },
                                ])
                                .then(function (result) {
                                    callback(null, result.records);
                                });
                        },
                    },
                    async function (err, results) {
                        var buyerAdmin = results.buyerAdmin[0].id;
                        var supplierAdmin = results.supplierAdmin[0].id;

                        await lib.update(
                            lib.OBJECTS_IDS.Requester,
                            results.requester[0].id,
                            JSON.stringify({
                                field_661: buyerAdmin,
                            })
                        );

                        await lib.update(
                            lib.OBJECTS_IDS.Approver,
                            results.approver[0].id,
                            JSON.stringify({
                                field_663: buyerAdmin,
                            })
                        );

                        await lib.update(
                            lib.OBJECTS_IDS.BuyerFinance,
                            results.buyerFinance[0].id,
                            JSON.stringify({
                                field_664: buyerAdmin,
                            })
                        );

                        await lib.update(
                            lib.OBJECTS_IDS.SupplierFinance,
                            results.supplierFinance[0].id,
                            JSON.stringify({
                                field_670: supplierAdmin,
                            })
                        );

                        await lib.update(
                            lib.OBJECTS_IDS.Proposer,
                            results.proposer[0].id,
                            JSON.stringify({
                                field_669: supplierAdmin,
                            })
                        );

                        lib.hideSpinner();
                    }
                );
            });
        });

        // lib.addTask('Connect Users', 'knack-form-submit.view_2905', function (event, view, user) {
        $(document).on(
            "knack-form-submit.view_2905",
            async function (event, view, user) {
                await lib.connectCreatedUsers(user);
                var email = user.field_36_raw.email;
                console.log("email before: ", user.field_179_raw && user.field_179_raw.email)
                console.log("email after: ", email)
                lib.add_user_email(email);
            }
        );

        // lib.addTask('Set Date field', 'knack-view-render.view_2843', function (event, view) {
        $(document).on("knack-view-render.view_2843", function (event, view) {
            lib.loadLibrary("moment", function () {
                var today = moment().format("YYYY-MM-DD");
                $(`#${view.key}`).prepend(`
                       <div class="kn-input kn-input-date_time control" id="kn-input-field_1607" data-input-id="field_1607">
                           <label for="field_1607" class="label kn-label"><span>Payment Date</span></label>
                           <div class="kn-datetime">
                               <div>
                                   <input id="add-supplier-invoice-date" name="date" type="date" value="${today}" class="knack-date input control hasDatepicker" autocomplete="off">
                               </div>
                               <input name="key" type="hidden" value="field_1607">
                           </div>
                           <p class="kn-instructions" style="display: none;"></p>
                       </div>
                   `);
            });
        });

        // lib.addTask('Hide a header-bar in login screen', 'knack-scene-render.scene_106', function(event, scene) {
        $(document).on("knack-scene-render.scene_106", function (event, scene) {
            let user = Knack.user.attributes;
            let userLoggued = Object.keys(user).length != 0;
            if (userLoggued) {
                $(".kn-info-bar").attr("style", "");
            } else {
                $(".kn-info-bar").attr(
                    "style",
                    "visibility: hidden;opacity: 0;height: 0;"
                );
            }
        });

        lib.addTask(
            "Css",
            "knack-view-render.view_3246",
            function (event, view, data) {
                $("#view_3246 div.kn-detail-body").css({
                    "padding-top": "6px",
                    "padding-bottom": "0px",
                });
                $("#view_3246 a.kn-link-page").addClass("kn-button");
                $("#view_3246 a.kn-link-page .level span span").css({
                    "text-decoration": "none",
                    "font-size": "15px",
                });
                $("#view_3246 .fa").css({
                    "font-size": "14px",
                    "padding-bottom": "3px",
                });
            }
        );

        $(document).on("knack-view-render.view_3406", function (event, view) {
            //$(document).on('knack-view-render.view_3106', function (event, view) {

            const dropdown = $(`#${view.key} #kn-input-field_1823 option`);
            for (let i = 1; i < dropdown.length; i++) {
                let text = dropdown[i].text;
                let currentNumber = dropdown[i].text[0];
                let newText = text.replace(currentNumber, i)
                dropdown[i].text = newText
            }
        });

        // lib.addTask("Validate Form", "knack-view-render.view_3106", function (event, view) {
        $(document).on("knack-view-render.view_3106", function (event, view) {
            //$(document).on('knack-view-render.view_3106', function (event, view) {

            const dropdown = $(`#${view.key} #kn-input-field_1823 option`);
            for (let i = 1; i < dropdown.length; i++) {
                let text = dropdown[i].text;
                let currentNumber = dropdown[i].text[0];
                let newText = text.replace(currentNumber, i)
                dropdown[i].text = newText
            }

            $("#view_3106 button").click((e) => {
                let startDateStr = Knack.models.view_3108.attributes.field_1139;
                let tyeEndDateStr =
                    Knack.models.view_3107.data.models[0].attributes.field_484;
                let endDateStr = $("#view_3106-field_1827").val();
                e.preventDefault();
                lib.loadLibrary("moment", function () {
                    console.log(
                        `startDateStr ${startDateStr} endDateStr ${endDateStr}`
                    );
                    let endDate = moment(endDateStr, "MM-DD-YYYY");
                    let tyeEndDate = moment(tyeEndDateStr, "MM-DD-YYYY");
                    let startDate = moment(startDateStr, "MM-DD-YYYY");
                    if (endDate.isSameOrBefore(startDate)) {
                        lib.removeMessages("view_3106");
                        lib.showErrorMessage(
                            "view_3106",
                            "End date must be after this amendment’s start date."
                        );
                    } else {
                        if (endDate.isBefore(tyeEndDate)) {
                            lib.removeMessages("view_3106");
                            lib.showErrorMessage(
                                "view_3106",
                                "End date must be after any submitted T&E for this contract."
                            );
                        } else {
                            $("#view_3106 form").submit();
                        }
                    }
                });
            });
        }
        );

        //var urlcsv = 'https://avvera.download/api/v1/';
        //var urlcsv = 'https://conexisapi.conexisvms.com/api/v1/';
        //var urlcsv = 'https://c6c6-186-154-61-113.ngrok.io/api/v1/';
        var urlcsv = lib.CONEXIS_SERVER;
        /**
         * Insert BlockUI library
         */
        lib.insertLibrary(
            "blockUI",
            "https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
        );

        //lib.addTask('Process CSV File', 'knack-view-render.view_3182', function (e, v, record) {
        $(document).on("knack-view-render.view_3182", function (e, v, record) {
            var form = $(`#${v.key} form`);
            var fileInput = form.find("#field_1486_upload");
            var submit = form.find("button:submit");

            submit.click(function (ev) {
                ev.preventDefault();
                var fileInput1 = $("input[name='field_1486']");
                console.log(fileInput1.val());
                if (fileInput1.val()) {
                    //if (fileInput[0].files.length > 0 && fileInput[0].files[0].name.toLowerCase().includes('.csv')) {
                    $("#success-upload-response-text").text("");
                    $("#errors-upload-response-text").text("");
                    $("#errors-upload-response").html("");
                    form.submit();
                    //} else {
                    //  alert('the file must be .CSV');
                    //}
                    lib.refreshView("view_3181");
                } else {
                    alert("File required");
                }

                Knack.views["view_3181"].model.fetch();
            });
        });

        //lib.addTask('Process CSV File', 'knack-form-submit.view_3182', function (e, v, record) {
        $(document).on("knack-form-submit.view_3182", function (e, v, record) {
            lib.loadLibrary("jquery", "async", "moment", "blockUI", function () {
                lib.refreshView("view_3181");

                lib.$.blockUI({
                    message: '<h3 id="progress-message">Uploading CSV</h3>',
                });

                //if (Knack.user.attributes.values.email.email == "jheidy@soluntech.com") {
                //     console.log("using developers account")
                //   urlcsv = 'https://0cad-181-53-13-157.ngrok.io/api/v1/';
                //}

                //console.log(JSON.stringify(record));
                const buyer = Knack.views["view_3251"].model.attributes.id;
                lib.waitToken(0, async function (token, error) {
                    if (error) {
                        alert("error getting token")
                        return
                    }
                    var obj = {
                        record: record,
                        buyer: buyer,
                        token: token,
                    };
                    async function updateStatusError(record) {
                        try {
                            console.log("updating record")
                            await lib.update(
                                "object_54",
                                record.id,
                                JSON.stringify({
                                    field_1910: "Error",
                                })
                            );
                        } catch (error) {
                            console.log("error updating related import", error);
                        }
                    }
                    async function uploadCVS(obj, record) {
                        try {

                            const response = await $.ajax({
                                type: "POST",
                                // url: "https://dcef-186-112-194-233.ngrok.io/api/v1/" + "csv",
                                url: urlcsv + "csv",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(obj),
                            });
                            //$('#progress-message').text('Uploading CSV file. You are going to receive a email once it is finished.');
                            setTimeout(function () {
                                lib.$.unblockUI();
                            }, 1500);

                            if (response.status == "ok") {
                                // message in view when successfull parsed and read csv
                                lib.removeMessages("view_3182");
                                $("#view_3182" + " .kn-form-confirmation").prepend(
                                    $("<div>")
                                        .addClass("kn-message success")
                                        .append(
                                            $("<span>")
                                                .addClass("kn-message-body")
                                                .append($("<p>").append($("<strong>").html(response.message)))
                                        )
                                );
                            } else {
                                // message in view when imported csvfile contains format errors
                                lib.refreshView("view_3234");
                                lib.refreshView("view_3181");

                                lib.removeMessages("view_3182");

                                let errorList = $("<ul></ul>");
                                for (let errorMsg of response.message) {
                                    errorList.append($(`<li>${errorMsg}</li>`))
                                }
                                $("#view_3182" + " .kn-form-confirmation").prepend(
                                    $("<div>")
                                        .attr("id", "custom-errors-msg")
                                        .addClass("kn-message is-error")
                                        .append(
                                            $("<span>")
                                                .addClass("kn-message-body")
                                                .append($("<p>").append($("<strong>").html(errorList)))
                                        )
                                );
                            }
                        } catch (error) {
                            $("#progress-message").text(
                                "Error Connecting to the server, Please try again!"
                            );
                            await updateStatusError(record);
                            lib.refreshView("view_3234");
                            lib.refreshView("view_3181");

                            lib.removeMessages("view_3182");
                            $("#view_3182 .kn-form-confirmation").prepend(
                                $("<div>")
                                    .attr("id", "custom-errors-msg")
                                    .addClass("kn-message is-error")
                                    .append(
                                        $("<span>")
                                            .addClass("kn-message-body")
                                            .append($("<p>").append($("<strong>").html("Error Connecting to the server, Please try again!")))
                                    )
                            );

                            setTimeout(function () {
                                lib.$.unblockUI();
                            }, 2000);
                        }
                    }
                    uploadCVS(obj, record);
                });
            });
        });

        //lib.addTask('Pending Line Items', 'knack-view-render.view_3221', function (e, v, record) {
        $(document).on("knack-view-render.view_3221", function (e, v, record) {
            const records = Knack.models.view_3221.data.models.map(function (r) {
                return r.toJSON();
            });
            if (records.length > 0) {
                $("#view_3221 table thead tr").prepend(
                    $('<th><input type="checkbox" id="checkall"></th>')
                );

                $("#view_3221 table tbody tr:not(.kn-table-group)").prepend(
                    $("<td>").append(
                        $("<input>").addClass("select-lineItem").attr({
                            type: "checkbox",
                        })
                    )
                );

                $("#view_3221 table tbody tr.kn-table-group").prepend(
                    $("<td>").append(
                        $("<input>").addClass("select-lineItem-group").attr({
                            type: "checkbox",
                        })
                    )
                );

                $("#checkall").click(function () {
                    $(".select-lineItem").prop("checked", $(this).is(":checked"));
                    $(".select-lineItem-group").prop("checked", $(this).is(":checked"));
                });

                $(".select-lineItem-group").click(function () {
                    var parent = $(this).closest("tr");
                    var selectedTrs;
                    var groupCheckbox = $(this);
                    if (parent.hasClass("kn-group-level-1")) {
                        selectedTrs = parent.nextUntil(".kn-group-level-1");
                        selectedTrs.each(function () {
                            $(this)
                                .find("input")
                                .attr("checked", groupCheckbox.is(":checked"));
                        });
                    } else {
                        selectedTrs = parent.nextUntil(".kn-group-level-2");
                        selectedTrs = selectedTrs.filter(function (testElement, elem) {
                            console.log(testElement);
                            return elem.className === "";
                        });

                        selectedTrs.each(function () {
                            $(this)
                                .find("input")
                                .attr("checked", groupCheckbox.is(":checked"));
                        });
                    }
                });

                $(".select-lineItem").each(function () {
                    var trid = $(this).parents("tr").attr("id");
                    //console.log(trid);
                    $(this).attr("id", trid);
                });
            }
        });

        //var urltecard = 'https://d5e37ee4199c.ngrok.io/api/v1/';
        var urltecard = lib.CONEXIS_SERVER;

        $(document).on(
            "knack-view-render.view_3335",
            function (event, view, record) {
                console.log("scene");
                var form = $("#view_3335 form");

                var button = form.find("button:submit");

                button.click(function (e) {
                    e.preventDefault();
                    //console.log("click");
                    var selectedCs = $(".select-lineItem:checked");

                    lib.removeMessages("view_3335");
                    if (selectedCs.length == 0) {
                        lib.showErrorMessage(
                            "view_3335",
                            "Select at least one Line Item."
                        );

                        return false;
                    }

                    form.submit();
                });
            }
        );

        //lib.addTask('Process Records form', 'knack-form-submit.view_3335', function (event, view, data) {
        const validateFieldCustom = (object, field) => {
            if (object[field]) {
                return object[`${field}_raw`]
            } else {
                return []
            }
        }
        $(document).on(
            "knack-form-submit.view_3335",
            function (event, view, data) {
                lib.refreshView("view_3342");

                var records = Knack.models.view_3221.data.models.map(function (r) {
                    return r.toJSON();
                });
                var teSelected = [];
                var selectedCs = $(".select-lineItem:checked");
                for (var i = 0; i < selectedCs.length; i++) {
                    teSelected.push($(selectedCs[i]).closest("tr")[0].id);
                }

                records = records.filter(function (record) {
                    if (teSelected.indexOf(record.id) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                });

                records = records.map(function (r) {
                    let recordObject = {
                        field_760_raw: r.field_760_raw,
                        field_849: r.field_849,
                        id: r.id,
                    };
                    recordObject['field_760.field_47_raw'] = r['field_760.field_47_raw'];
                    recordObject['field_760.field_338_raw'] = r['field_760.field_338_raw'];
                    recordObject['field_1329'] = r['field_1329'];
                    recordObject['field_760.field_51_raw'] = r['field_760.field_51_raw'];
                    //recordObject['field_760.field_494_raw'] = r['field_760.field_494_raw'];
                    recordObject['field_760.field_494_raw'] = validateFieldCustom(r, "field_494");
                    return recordObject
                });
                //console.log("records: ", records);
                $.ajax({
                    type: "POST",
                    url: urltecard + "tecard",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({
                        records: records,
                        userId: Knack.getUserAttributes().id,
                        processLogId: data.id,
                        token: Knack.getUserToken(),
                    }),
                }).then(function (response) {
                    $("#view_3335 form").after(
                        $("<div>")
                            .addClass("kn-message success")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append(
                                        $("<p>").append(
                                            $("<strong>").html(
                                                "Process started. Once finished you will receive an email."
                                            )
                                        )
                                    )
                            )
                    );
                    lib.refreshView("view_3339");
                    //lib.refreshView("view_3221");
                }).fail(function (failed) {
                    lib.update(lib.OBJECTS_IDS.ProcessLog, data.id,
                        JSON.stringify({
                            field_1955: "Error",
                        }))

                    //lib.refreshView("view_3339"); 
                    $("#view_3335 form").after(
                        $("<div>")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append(
                                        $("<p>").append(
                                            $("<strong>").html(
                                                "Error connecting to server, please try again later"
                                            )
                                        )
                                    )
                            )
                    );
                    console.log(failed, "error")
                });
            }
        );

        //lib.addTask('Proposal for Permanent Hire & Work Shifts Logic Fields', 'knack-view-render.view_3274', function (event, scene) {
        $(document).on("knack-view-render.view_3274", function (event, scene) {
            //  $(document).on('knack-scene-render.scene_344', function (event, scene) {
            // lib.waitDetails('view_508', function (params) {
            $("#view_3274 #field_873").val(
                Knack.models.view_508.attributes.field_867
            );
            $("#view_3274 #field_1246").val(
                Knack.models.view_508.attributes.field_773
            );
            $("#view_3274 #field_1246").change();
            $("#view_3274 #field_873").change();

            $(".kn-add-option")[0].addEventListener("click", function (e) {
                $(".kn-modal-bg").css("display", "none")
                $(".kn-add-option").css("display", "none")
                setTimeout(function () {
                    $(".kn-modal-bg").css("display", "block")
                    $(".kn-add-option").css("display", "block")
                }, 5000)
            });
            // });
            //  })
        });
        //  $(document).on('knack-view-render.view_3274', function (event, scene) {
        $(document).on("knack-scene-render.scene_344", function (event, scene) {
            // lib.waitDetails('view_508', function (params) {
            $("#view_3274 #field_873").val(
                Knack.models.view_508.attributes.field_867
            );
            $("#view_3274 #field_1246").val(
                Knack.models.view_508.attributes.field_773
            );
            $("#view_3274 #field_1246").change();
            $("#view_3274 #field_873").change();
            // });
            //  })
        });

        lib.addMethod("addCheckboxes", function (view, className) {
            let hasCheckBox = $("#" + view + " #checkall");
            if (!hasCheckBox.length) {
                $("#" + view + " table thead tr").prepend(
                    $('<th><input type="checkbox" id="checkall"></th>')
                );

                $("#" + view + " table tbody tr:not(.kn-table-group)").prepend(
                    $("<td>").append(
                        $("<input>").addClass(className).attr({
                            type: "checkbox",
                        })
                    )
                );

                $("#" + view + " table tbody tr.kn-table-group").prepend(
                    $("<td>").append(
                        $("<input>")
                            .addClass(className + "-group")
                            .attr({
                                type: "checkbox",
                            })
                    )
                );
            }
        });

        //lib.addTask('Candidates Pop-Up', 'knack-scene-render.scene_1324', function (event, view, data) {
        $(document).on(
            "knack-scene-render.scene_1324",
            function (event, view, data) {
                $("#kn-modal-bg-0").on("remove", function () {
                    window.view_3328_selected = new Set();
                    window.blackList = new Set();
                });

                $("#view_3283").prepend("<form> </form>");

                $("#view_3283 a")
                    .eq(0)
                    .click(function (e) {
                        e.preventDefault();
                        lib.removeMessages("view_3283");

                        records = Knack.models.view_3328.results_model.data.models.map(
                            function (r) {
                                return r.toJSON();
                            }
                        );
                        var candidateSelected = [];
                        var selectedCs = $(".select-candidate:checked");
                        for (var i = 0; i < selectedCs.length; i++) {
                            candidateSelected.push($(selectedCs[i]).closest("tr")[0].id);
                        }

                        records = records.filter(function (record) {
                            if (candidateSelected.indexOf(record.id) > -1) {
                                return true;
                            } else {
                                return false;
                            }
                        });

                        console.log(records);
                        if (records.length > 50) {
                            lib.showErrorMessage(
                                "view_3283",
                                "Maximum of 50 candidates per proposal form"
                            );
                            return false;
                        }

                        if (records.length == 0) {
                            lib.showErrorMessage(
                                "view_3283",
                                "At least one candidate must be selected"
                            );
                            return false;
                        }

                        for (var i = 0; i < records.length; i++) {
                            console.log(records[i].id);
                            let l = $("#view_3274_field_1969_chzn ul.chzn-results li")
                                .length;
                            if (
                                $(`#view_3274-field_1969 option[value='${records[i].id}']`)
                                    .length == 0
                            ) {
                                $("#view_3274_field_1969_chzn ul.chzn-results").append(
                                    `<li id="view_3274_field_1969_chzn_o_${l}" class="result-selected" style="">${records[i].field_303}</li>`
                                );
                                $("#view_3274-field_1969").append(
                                    `<option value="${records[i].id}" selected="selected">${records[i].field_303}</option>`
                                );
                                //$('#view_3274-field_1969').find('option[value="'+candidateSelected[i]+'"]').attr('selected', true);
                            } else {
                                $("#view_3274-field_1969")
                                    .find('option[value="' + records[i].id + '"]')
                                    .attr("selected", true);
                            }
                        }

                        $("#view_3274-field_1969").trigger("liszt:updated");
                        //$('#view_3274-field_1969').val(candidateSelected)
                        $(".close-modal").click();
                    });
            }
        );

        //didUpdate View
        $(document).on(
            "knack-view-render.view_3328",
            async function (event, view, data) {
                var records = Knack.models[view.key].results_model.data.models.map(
                    function (r) {
                        return r.toJSON();
                    }
                );
                if (records.length > 0) {
                    lib.addCheckboxes(view.key, "select-candidate");
                }

                if (!window.view_3328_selected) {
                    window.view_3328_selected = new Set();
                }
                if (!window.blackList) {
                    window.blackList = new Set();
                }

                let selectedItems = $("#view_3274-field_1969").val();
                if (selectedItems) {
                    selectedItems.forEach((i) => {
                        if (!window.blackList.has(i)) {
                            window.view_3328_selected.add(i);
                        }
                    });
                }

                window.view_3328_selected.forEach(function (c) {
                    $('#view_3328 table tbody tr[id="' + c + '"]')
                        .find("input")
                        .prop("checked", true);
                });

                $("#checkall").click(function () {
                    $(".select-candidate").prop("checked", $(this).is(":checked"));
                });

                $(".select-candidate").change(function () {
                    let id = $(this).closest("tr")[0].id;
                    if (this.checked) {
                        window.view_3328_selected.add(id);
                        window.blackList.delete(id);
                    } else {
                        window.view_3328_selected.delete(id);
                        window.blackList.add(id);
                    }
                });
            }
        );

        $(document).on(
            "knack-form-submit.view_3327",
            async function (event, view, data) {
                let id = data.id;
                let name = data.field_303;
                let count = $("#view_3274_field_1969_chzn .chzn-results li").length;
                $("#view_3274-field_1969").append(
                    `<option value="${id}">${name}</option>`
                );
                $("#view_3274_field_1969_chzn .chzn-results").append(
                    `<li id="view_3274_field_1969_chzn_o_${count}" class="active-result" style="">${name}</li>`
                );
            }
        );

        //var urlproposal = 'https://0639ba78b38a.ngrok.io/api/v1/';
        var urlproposal = lib.CONEXIS_SERVER;
        //lib.addTask('Add Proposal', 'knack-form-submit.view_3274', async function (event, view, proposal) {
        // lib.addMethod("waitToken", function (callback) {
        //     const regex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/
        //     let token = Knack.getUserToken();
        //     if (token.match(regex)) {
        //         callback(token);
        //     } else {
        //         setTimeout(function () {
        //             lib.waitToken(callback);
        //         }, 500);
        //     }
        // });
        // $(document).on(
        //     "knack-form-submit.view_3274",
        //     async function (event, view, proposal) {
        //         lib.loadLibrary(
        //             "jquery",
        //             "async",
        //             "moment",
        //             "blockUI",
        //             async function () {
        //                 const multipleCandidatesField = $("#view_3274 form")
        //                     .find("#field_1970")
        //                     .val();
        //                 if (multipleCandidatesField == "Yes") {
        //                     lib.$.blockUI({
        //                         message:
        //                             '<h3 id="progress-message">Proposals being added… please wait, this can take a few minutes</h3><p>',
        //                     });
        //                     lib.waitToken(0, async function (token, error) {
        //                         if (error) {
        //                             alert("error getting token!");
        //                             return
        //                         }
        //                         await $.ajax({
        //                             type: "POST",
        //                             url: urlproposal + "addproposal",
        //                             contentType: "application/json",
        //                             dataType: "json",
        //                             data: JSON.stringify({
        //                                 proposalToCreate: proposal,
        //                                 userId: Knack.getUserAttributes().id,
        //                                 token: token,
        //                             }),
        //                         })
        //                             .then(function (response) {
        //                                 lib.refreshView("view_1004");
        //                                 setTimeout(function () {
        //                                     lib.$.unblockUI();
        //                                 }, 1500);
        //                             })
        //                             .fail(function (err) {
        //                                 console.error(err);
        //                                 $("#progress-message").text(
        //                                     `There is an error, please try again: ${err.status}, token: ${token}`
        //                                 );
        //                                 setTimeout(function () {
        //                                     lib.$.unblockUI();
        //                                 }, 1500);
        //                             });
        //                     });
        //                 }
        //             }
        //         );
        //     }
        // );
        $(document).on(
            "knack-form-submit.view_3274",
            async function (event, view, proposal) {
                event.preventDefault()
                lib.loadLibrary(
                    "jquery",
                    "async",
                    "moment",
                    "blockUI",
                    async function () {
                        const multipleCandidatesField = $("#view_3274 form")
                            .find("#field_1970")
                            .val();
                        const supplier = $("#view_508 .field_89 .kn-detail-body").text();
                        if (supplier === "Intelcom Courier Canada") {
                            addPropolsalsIntelcom(proposal, multipleCandidatesField);
                        } else {
                            addPropolsalsOtherSupplier(proposal, multipleCandidatesField);
                        }
                    }
                );
            }
        );

        function addPropolsalsOtherSupplier(proposal, multipleCandidatesField) {
            if (multipleCandidatesField == "Yes") {
                lib.$.blockUI({
                    message:
                        '<h3 id="progress-message">Proposals being added… please wait, this can take a few minutes</h3><p>',
                });
                lib.waitToken(0, async function (token, error) {
                    if (error) {
                        alert("error getting token!");
                        return
                    }
                    await $.ajax({
                        type: "POST",
                        url: urlproposal + "addproposal",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify({
                            proposalToCreate: proposal,
                            userId: Knack.getUserAttributes().id,
                            token: token,
                        }),
                    })
                        .then(function (response) {
                            lib.refreshView("view_1004");
                            setTimeout(function () {
                                lib.$.unblockUI();
                            }, 1500);
                            location.reload();
                        })
                        .fail(function (err) {
                            console.error(err);
                            $("#progress-message").text(
                                `There is an error, please try again: ${err.status}, token: ${token}`
                            );
                            setTimeout(function () {
                                lib.$.unblockUI();
                            }, 1500);
                            location.reload();
                        });
                });
            } else {
                location.reload();
            }
        }
        const urlproposal2 = "https://595a-186-116-86-162.ngrok.io/api/v1/"
        function addPropolsalsIntelcom(proposal, multipleCandidatesField) {
            lib.waitToken(0, async function (token, error) {
                if (error) {
                    alert("error getting token!");
                    return
                }
                lib.$.blockUI({
                    message:
                        '<h3 id="progress-message">Check candidates Pin Number, this can take a few minutes</h3><p>',
                });
                let candidates;
                if (multipleCandidatesField === "Yes") {
                    candidates = proposal.field_1969_raw;
                } else {
                    candidates = proposal.field_309_raw
                }

                const response = await $.ajax({
                    type: "POST",
                    url: urlproposal + "check-candidate-pinnumber",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({
                        candidates,
                        proposalId: proposal.id,
                        token: token,
                    }),
                })

                lib.refreshView("view_1004");
                setTimeout(function () {
                    lib.$.unblockUI();
                }, 1500);

                $("#view_3835 a")[0].click()
                setTimeout(function () {
                    addPinNumberForm(response.withoutPinNumber, token, proposal, candidates)
                }, 1500);

            });
        }

        function addPinNumberForm(candidates, token, proposal) {
            const formElements = candidates.map((candidate) => {
                const elements = `<ul class="kn-form-group columns kn-form-group-1">
                                    <li class="kn-form-col column is-constrained">
                                      <div class="kn-input kn-input-number control">
                                        <label class="label kn-label">
                                            <span>${candidate.name}</span>
                                        </label>
                                        <div class="control">
                                             <input value="${candidate.pinNumber}" id="${candidate.id}" class="pinnumber-input input" name="${candidate.id}" />
                                        </div>
                                       </div>
                                        </li>
                                        </ul>`
                return elements
            });

            const formTest = `<form id="pinnumber-form">
                                ${formElements.join("")}
                                <div class="kn-submit">
                                    <button class="kn-button is-primary" id="pinumber-btn">Submit</button>
                                </div>
                            </form>`
            $("#kn-scene_1505").append(formTest)
            $("#pinumber-btn").click(async function (e) {
                $("#pinumber-btn").hide()
                e.preventDefault();
                const inputsPinNumber = $("#pinnumber-form").serializeArray();
                const checkInput = inputsPinNumber.every(inpuPinNumber => /^[0-9]{4}$/.test(inpuPinNumber.value));
                if (checkInput) {
                    await $.ajax({
                        type: "POST",
                        url: urlproposal + "update-candidate-pinnumber",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify({
                            newCandidates: inputsPinNumber,
                            candidates,
                            token: token,
                        }),
                    })
                    const costCenter = $("#view_508 .field_525 .kn-detail-body").text()
                    $(".close-modal").click();
                    lib.$.blockUI({
                        message:
                            '<h3 id="progress-message">Proposals being added… please wait, this can take a few minutes</h3><p>',
                    });

                    await sendProposalsToCreate(proposal, token, inputsPinNumber, costCenter);
                } else {
                    $("#custom-errors-msg").remove()
                    $("#pinnumber-form").prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Pin Number must be 4 digits")))
                            )
                    );
                }

            });
        }

        async function sendProposalsToCreate(proposal, token, candidates, costCenter) {
            await $.ajax({
                type: "POST",
                url: urlproposal + "add-proposals-intelcom",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    proposalToCreate: proposal,
                    candidates,
                    costCenter,
                    userId: Knack.getUserAttributes().id,
                    token: token,
                }),
            })
                .then(function (response) {
                    lib.refreshView("view_1004");
                    setTimeout(function () {
                        lib.$.unblockUI();
                    }, 1500);
                    location.reload();
                })
                .fail(function (err) {
                    console.error(err);
                    $("#progress-message").text(
                        `There is an error, please try again: ${err.status}, token: ${token}`
                    );
                    setTimeout(function () {
                        lib.$.unblockUI();
                    }, 1500);
                    location.reload();
                });
        }


        //lib.addTask('Process imported line items', 'knack-view-render.view_3225', function (event, view, record) {
        $(document).on(
            "knack-view-render.view_3225",
            function (event, view, record) {
                if ($(`#${view.key} .kn-records-nav .is-active`).text() == "Processed") {
                    $("#view_3261").hide()
                    return
                }
                $("#view_3261").show()

                lib.addCheckboxes(view.key, "select-imported-li");
                var lineItems = $(".select-imported-li");

                for (var i = 0; i < lineItems.length; i++) {
                    const trr = $(lineItems[i]).closest("tr");
                    var spanfind = $(trr).find('span[class="col-18"] span');
                    //console.log("fdf", spanfind)
                    if (spanfind.length == 1) {
                        $(lineItems[i]).prop("disabled", true);
                    } else {
                        $(lineItems[i]).prop("disabled", false);
                    }
                }

                lineItems = $(lineItems).filter(function () {
                    return !this.disabled;
                });

                $("#checkall").click(function () {
                    $(lineItems).prop("checked", $(this).is(":checked"));
                });
            }
        );

        //var urldelete = 'https://4bcb24d632fa.ngrok.io/api/v1/'
        var urldelete = lib.CONEXIS_SERVER;

        $(document).on("knack-scene-render.scene_1347", function (event, scene) {
            $("button[type=submit]").submit();
        });

        $(document).on("knack-scene-render.scene_1348", function (event, scene) {
            $("button[type=submit]").submit();
        });

        $(document).on("knack-scene-render.scene_1349", function (event, scene) {
            lib.waitFormViewform("#view_3373 .kn-button", function () {
                $("button[type=submit]").submit();
            });
        });

        $(document).on("knack-form-submit.view_3373", async function (event, view, data) {
            sendEmailsToSupplier(data, "accepted");
            console.log(data);
        });

        $(document).on("knack-form-submit.view_3375", async function (event, view, data) {

            sendEmailsToSupplier(data, "rejected");
            console.log(data);
        });



        async function sendEmailsToSupplier(data, status) {
            const { field_102_raw, field_145, field_301, field_2189_raw, field_292 } = data
            if (!field_2189_raw) {
                try {
                    const obj = {
                        supplierId: field_102_raw[0].id,
                        proposalId: field_145,
                        requisitionAndJobTitle: field_301,
                        status,
                        proposalNote: field_292,
                        token: Knack.getUserToken(),
                    };
                    console.log(obj);

                    $.ajax({
                        type: "POST",
                        url: lib.CONEXIS_SERVER + "send-emails-to-supplier",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(obj),
                    });

                } catch (e) {

                    alert("Error connecting to server,please try again later!");
                    lib.hideSpinner();
                }
            }
        }

        //lib.addTask('Delete imported line items form', 'knack-view-render.view_3261', function (event, view, record) {
        $(document).on(
            "knack-view-render.view_3261",
            function (event, view, record) {
                const submit = $("#" + view.key + " button:submit");
                submit.click(async function (e) {
                    lib.removeMessages(view.key);
                    e.preventDefault();
                    var records = Knack.models.view_3225.data.models.map(function (r) {
                        return r.toJSON();
                    });
                    var lineitemSelected = [];
                    var selectedCs = $(".select-imported-li:checked");
                    for (var i = 0; i < selectedCs.length; i++) {
                        lineitemSelected.push($(selectedCs[i]).closest("tr")[0].id);
                    }

                    records = records.filter(function (record) {
                        if (lineitemSelected.indexOf(record.id) > -1) {
                            return true;
                        } else {
                            return false;
                        }
                    });

                    if (records.length == 0) {
                        lib.showErrorMessage(
                            "view_3261",
                            "At least one line item must be selected."
                        );
                        return false;
                    }

                    records = records.map(function (r) {
                        let recordObject = {
                            id: r.id,
                        };
                        return recordObject
                    });

                    submit.attr("disabled", true);
                    lib.showSpinner();
                    // records.token = Knack.getUserToken();

                    var obj = {
                        records: records,
                        token: Knack.getUserToken(),
                        userID: Knack.getUserAttributes().id,
                        loggedInEmail: Knack.user.attributes.values.field_36.email
                    };

                    await $.ajax({
                        type: "DELETE",
                        url: urldelete + "deletelineitem",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(obj),
                    }).then(function (response) {
                        lib.showSuccessMessage(view.key, "Deleting Line items you will receive an email when the process finish.");
                        lib.refreshView("view_3225");
                        // submit.attr("disabled", false);
                        disabledViews(view.key, "inprocess");
                        lib.hideSpinner();
                        /*setTimeout(function () {
 
                                   lib.$.unblockUI();
                               }, 1500);*/
                    }).fail(function (r) {
                        lib.showErrorMessage(view.key, "Error connecting to server, please try again later!");
                        submit.attr("disabled", false);
                        lib.hideSpinner();
                    });
                });
            }
        );

        lib.addMethod("SelectAllCheckboxes", function () {
            if ($(".select-all").attr("checked")) {
                $(".select-proposal").attr("checked", true);
            } else {
                $(".select-proposal").attr("checked", false);
            }
        });

        var checkboxes_search;
        $(document).on("knack-view-render.view_3385", function (event, view, proposals) {
            if (proposals.length > 0) {
                $("#" + view.key + " table thead tr").prepend(
                    $("<th>").append(
                        $("<input>")
                            .addClass("select-all")
                            .attr({
                                type: "checkbox",
                                checked: false,
                            })
                            .click(lib.SelectAllCheckboxes)
                    )
                );

                $("#" + view.key + " table tbody tr").prepend(
                    $("<td>").append(
                        $("<input>").addClass("select-proposal").attr({
                            type: "checkbox",
                            checked: false,
                        })
                    )
                );

                if (checkboxes_search) {
                    for (var i = 0; i < checkboxes_search.length; i++) {
                        $(
                            "#view_3385 tr#" +
                            checkboxes_search[i].id +
                            " .select-proposal"
                        ).attr("checked", true);
                    }
                }
            } else {
                $("#view_3385 .kn-td-nodata").show();
                setTimeout(function () {
                    $("#view_3385 .kn-td-nodata").show();
                }, 400);
            }
            $("#view_3385 .kn-button.search").hide();
            $("#view_3385 td:nth-last-child(-n+2)").hide();
            $("#view_3385 th:nth-last-child(-n+2)").hide();
            $("#view_3385 .table-keyword-search p").append(
                '<a class="kn-button" id="custom_search_view_2285">search</a>'
            );
            $("#custom_search_view_2285").click(function (ev) {
                ev.preventDefault();
                checkboxes_search = $(".select-proposal:checked").closest("tr");
                $("#view_3385 .kn-button.search").click();
            });

            var current_shift = $(
                "#view_3385 .kn-records-nav.below .js-filter-menu ul li.is-active"
            ).text();
            switch (current_shift) {
                case "0 Work Shifts":
                    $("#view_3388 #field_2043").val("4");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "1 Work Shift":
                    $("#view_3388 #field_2043").val("1");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "2 Work Shifts":
                    $("#view_3388 #field_2043").val("2");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "3 Work Shifts":
                    $("#view_3388 #field_2043").val("3");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "Permanent Hire":
                    $("#view_3388 #field_2043").val("5");
                    $("#view_3388 #field_2042").val("Yes");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
            }
        }
        );

        $(document).on("knack-view-render.view_3496", function (event, view, proposals) {
            if (proposals.length > 0) {
                $("#" + view.key + " table thead tr").prepend(
                    $("<th>").append(
                        $("<input>")
                            .addClass("select-all")
                            .attr({
                                type: "checkbox",
                                checked: false,
                            })
                            .click(lib.SelectAllCheckboxes)
                    )
                );

                $("#" + view.key + " table tbody tr").prepend(
                    $("<td>").append(
                        $("<input>").addClass("select-proposal").attr({
                            type: "checkbox",
                            checked: false,
                        })
                    )
                );

                if (checkboxes_search) {
                    for (var i = 0; i < checkboxes_search.length; i++) {
                        $(
                            "#view_3496 tr#" +
                            checkboxes_search[i].id +
                            " .select-proposal"
                        ).attr("checked", true);
                    }
                }
            } else {
                $("#view_3496 .kn-td-nodata").show();
                setTimeout(function () {
                    $("#view_3496 .kn-td-nodata").show();
                }, 400);
            }
            $("#view_3496 .kn-button.search").hide();
            $("#view_3496 td:nth-last-child(-n+2)").hide();
            $("#view_3496 th:nth-last-child(-n+2)").hide();
            $("#view_3496 .table-keyword-search p").append(
                '<a class="kn-button" id="custom_search_view_2285">search</a>'
            );
            $("#custom_search_view_2285").click(function (ev) {
                ev.preventDefault();
                checkboxes_search = $(".select-proposal:checked").closest("tr");
                $("#view_3496 .kn-button.search").click();
            });

            var current_shift = $(
                "#view_3496 .kn-records-nav.below .js-filter-menu ul li.is-active"
            ).text();
            switch (current_shift) {
                case "0 Work Shifts":
                    $("#view_3388 #field_2043").val("4");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "1 Work Shift":
                    $("#view_3388 #field_2043").val("1");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "2 Work Shifts":
                    $("#view_3388 #field_2043").val("2");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "3 Work Shifts":
                    $("#view_3388 #field_2043").val("3");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "Permanent Hire":
                    $("#view_3388 #field_2043").val("5");
                    $("#view_3388 #field_2042").val("Yes");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
            }
        }
        );

        var current_payload_approval = undefined;
        $(document).on("knack-page-render.scene_1353", function (event, view) {
            var initial_contract_information =
                Knack.views.view_3418.model.attributes;
            var buyer = initial_contract_information.id;
            $("#view_3388-field_1954").val(buyer);
            $("#view_3388-field_1954").trigger("liszt:updated");
            $("#view_3388 #field_2049").val(
                initial_contract_information.field_1763
            );
            $("#view_3388 #field_2067").val(
                initial_contract_information.field_1416
            );
            $("#view_3388 #field_2049").trigger("change");
            $("#view_3388 #field_2067").trigger("change");

            var form = $("#view_3388 form");
            var button = form.find("button:submit");
            button.click(function (e) {
                e.preventDefault();
                lib.loadLibrary("moment", function () {
                    checkboxes_search = $(".select-proposal:checked").closest("tr");
                    if (checkboxes_search && checkboxes_search.length > 0) {
                        var planned_start_date = moment(
                            $("#view_3388-field_2044").val(),
                            "MM/DD/YYYY"
                        );
                        var planned_end_date = moment($("#view_3388-field_2045").val(), "MM/DD/YYYY");
                        var permanent_hire = $("#view_3388 #field_2042").val();
                        var proposal_convert_reject = $("input[name=view_3388-field_2086]:checked").val();
                        if (planned_end_date.isAfter(planned_start_date) || permanent_hire == "Yes" || proposal_convert_reject == "Reject Proposals") {
                            var proposals = [];
                            if (Knack.views.view_3385) {
                                var proposal_base = Knack.views.view_3385.model.data.models;
                            } else if (Knack.views.view_3496) {
                                var proposal_base = Knack.views.view_3496.model.data.models;
                            } else if (Knack.views.view_3809) {
                                var proposal_base = Knack.views.view_3809.model.data.models;
                            }
                            for (var i = 0; i < checkboxes_search.length; i++) {
                                current_proposal_base = proposal_base.find(function (elem) {
                                    return elem.attributes.id == checkboxes_search[i].id;
                                });
                                current_proposal_base = current_proposal_base.attributes;
                                var current_proposal = {
                                    id_proposal: current_proposal_base.id,
                                    payload: {
                                        field_47: $("#view_3388-field_1954").val(), //buyer
                                        field_1802: $("#view_3388 #field_2049").val(), // self serve
                                        field_2051: $("#view_3388 #field_2043").val(), // work shift logic
                                        field_2052: $("#view_3388 #field_2042").val(), // permanent hire
                                        field_1417: $("#view_3388 #field_2067").val(), // requires final msp approval
                                        field_872: $("#view_3388 #field_2041").val(), // final salary
                                        field_2006: $("#view_3388 #field_2068").val(), // buyer search fee
                                        field_2007: $("#view_3388 #field_2069").val(), // supplier search fee
                                        field_53: $("#view_3388-field_2044").val(), // planned start date
                                        field_54: $("#view_3388-field_2045").val(), // planned end date
                                        field_2053: $(
                                            '#view_3388 #kn-input-field_2050 input[name="view_3388-field_2050"]:checked'
                                        ).val(), // onboarding steps
                                        field_43: $("#view_3388 #field_2028").val(), // contract bill rate
                                        field_478: $("#view_3388 #field_2029").val(), // contract overtime rate
                                        field_479: $("#view_3388 #field_2030").val(), // contract double time rate
                                        field_42: $("#view_3388 #field_2031").val(), // base per rate per hour
                                        field_800: $(
                                            '#view_3388 #kn-input-field_2046 input[name="view_3388-field_2046"]:checked'
                                        ).val(), // dollar or msp fee
                                        field_801: $("#view_3388 #field_2047").val(), // dollar or msp fee nominal value
                                        field_802: $("#view_3388 #field_2048").val(), // dollar or msp fee percentage value
                                        field_341:
                                            current_proposal_base.field_103_raw &&
                                            current_proposal_base.field_103_raw[0] &&
                                            current_proposal_base.field_103_raw[0].id, // requisition,
                                        field_340: current_proposal_base.id, //proposal
                                        field_762: $("#view_3388 #field_2032").val(), //proposed bill rate shift 1
                                        field_763: $("#view_3388 #field_2033").val(), //overtime rate shift 1
                                        field_764: $("#view_3388 #field_2034").val(), //double time shift 1
                                        field_765: $("#view_3388 #field_2035").val(), //Proposed Bill Rate Shift 2
                                        field_766: $("#view_3388 #field_2036").val(), //Overtime Rate Shift 2
                                        field_767: $("#view_3388 #field_2037").val(), //Double Time Rate Shift 2
                                        field_768: $("#view_3388 #field_2038").val(), //Proposed Bill Rate Shift 3
                                        field_769: $("#view_3388 #field_2039").val(), //Overtime Rate Shift 3
                                        field_770: $("#view_3388 #field_2040").val(), //Double Time Rate Shift 3
                                        field_940: $("#view_3388 #field_2074").val(), //PO Number /CAC
                                        field_2224: initial_contract_information.field_2223 // is using amendment?
                                    },
                                };
                                //delete empty fields to avoid errors on submission
                                for (let field in current_proposal.payload) {
                                    if (
                                        !current_proposal.payload[field] ||
                                        current_proposal.payload[field] == ""
                                    ) {
                                        delete current_proposal.payload[field];
                                    }
                                }
                                proposals.push(current_proposal);
                            }
                            var type = "";
                            if (proposal_convert_reject == "Reject Proposals") {
                                type = "reject";
                            } else {
                                type = "approve";
                            }
                            var payload = {
                                token: Knack.getUserToken(),
                                proposals: proposals,
                                type: type
                            };
                            current_payload_approval = payload;
                            form.submit();
                        } else {
                            lib.showErrorMessage(
                                "view_3388",
                                "End date must be after start date"
                            );
                            $("html, body").animate(
                                {
                                    scrollTop: $("#view_3388").offset().top,
                                },
                                1000
                            );
                        }
                    } else {
                        alert("At least one proposal must be selected.");
                    }
                });
            });
        });

        lib.addMethod("checkProposalRefresh", function (id_log) {
            setTimeout(async function () {
                var log = await lib.findById(lib.OBJECTS_IDS.ProcessLog, id_log);
                if (log.field_1955 == "Processed") {
                    location.reload();
                } else {
                    lib.checkProposalRefresh(id_log);
                }
            }, 2000);
        });

        $(document).on(
            "knack-form-submit.view_3388",
            async function (event, view, log) {
                current_payload_approval.id_log = log.id;
                try {
                    await $.ajax({
                        type: "POST",
                        url: lib.CONEXIS_SERVER + "convert-proposals-bulk",
                        // url: 'https://f6276ab1722c.ngrok.io/api/v1/convert-proposals-bulk',
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(current_payload_approval),
                    });
                    lib.checkProposalRefresh(log.id);
                } catch (e) {
                    alert("Error on server bulk. Refresh page and repeat the process");
                }
            }
        );


        // start
        // create notification element with the corresponding classes.
        var getNotificationElem = (serverResponse) => {
            let message = "";
            let elemClasses = "custom_notification";
            if (serverResponse.status == "fail") {
                elemClasses += " error";
                message = serverResponse.error;
            } else if (serverResponse.status == "inprocess") {
                elemClasses += " warning";
                message = serverResponse.message;
            } else if (serverResponse.status == "noprocess") {
                message = serverResponse.message;
            }

            let warningElem = `
                <div class="${elemClasses}">
                    <p><i class="fa fa-info-circle"></i> ${message}</p>
                </div>
              `;
            return $(warningElem);
        }
        // get the actual state of the contract approval or reject process from server
        const getProcessState = async () => {
            try {
                const response = await $.ajax({
                    type: 'GET',
                    url: lib.CONEXIS_SERVER + 'is_process_runing',
                    dataType: 'json',
                });
                if (response.process) {
                    let actualState = response.process.isProcessActive;
                    if (actualState) {
                        return {
                            status: "inprocess", message: "The contract approval is currently in-progress.\
                            You will receive an email upon completion of the process. \
                            please check back when this is completed to run the process again"};
                    } else {
                        return {
                            status: "noprocess", message: "The contract approval process might take more than 10 minutes.\
                             You will have to wait for this process to finish before running it again"};
                    }
                } else {
                    console.log("Server error verifying actual status: ", response);
                    return { status: "fail", error: response.error };
                }
            } catch (e) {
                console.log("Unexpected error: ", e);
                return { status: "fail", error: "Failed to connect to server. Please try again later." };
            }
        }
        // custom notification element added to the top of the page:
        $(document).on("knack-view-render.view_1641", async function (event, view, data) {
            const response = await getProcessState();
            $("#" + view.key).prepend(getNotificationElem(response));
        });
        // added styles to the top table depending on the server response
        $(document).on("knack-view-render.view_1651", async function (event, view, data) {
            const response = await getProcessState();
            disabledViews(view.key, response.status);
        });
        // method to select all the checkboxes
        lib.addMethod("SelectAllCheckboxesContract", function () {
            if ($(".select-all-contract").attr("checked")) {
                $(".select-contract").attr("checked", true);
            } else {
                $(".select-contract").attr("checked", false);
            }
        });
        // render contracts that require approval table
        $(document).on(
            "knack-view-render.view_2520",
            async function (event, view, contracts) {
                if (contracts.length > 0) {
                    $("#" + view.key + " table thead tr").prepend(
                        $("<th>").append(
                            $("<input>")
                                .addClass("select-all-contract")
                                .attr({
                                    type: "checkbox",
                                    checked: false,
                                })
                                .click(lib.SelectAllCheckboxesContract)
                        )
                    );

                    $("#" + view.key + " table tbody tr").prepend(
                        $("<td>").append(
                            $("<input>").addClass("select-contract").attr({
                                type: "checkbox",
                                checked: false,
                            })
                        )
                    );
                } else {
                    $("#view_2520 .kn-td-nodata").show();
                    setTimeout(function () {
                        $("#view_2520 .kn-td-nodata").show();
                    }, 400);
                }
                // styles depending of the server response:
                const response = await getProcessState();
                disabledViews(view.key, response.status);
                if ($("#view_2520 .custom_notification").length == 0) {
                    $("#" + view.key).append(getNotificationElem(response));
                }
            }
        );
        // accept or reject contracts function:
        lib.addMethod("click_view_3421", async function (type) {
            var approve_value = "";
            if (type == "approve") {
                approve_value = "Accept";
            } else if (type == "reject") {
                approve_value = "Reject Entirely";
            }
            var checkboxes_search_contracts = $(".select-contract:checked").closest(
                "tr"
            );
            if (
                checkboxes_search_contracts &&
                checkboxes_search_contracts.length > 0
            ) {
                var contract_base = Knack.views.view_2520.model.data.models;
                var contracts = [];
                for (var i = 0; i < checkboxes_search_contracts.length; i++) {
                    var current_contract_base = contract_base.find(function (elem) {
                        return elem.attributes.id == checkboxes_search_contracts[i].id;
                    });
                    current_contract_base = current_contract_base.attributes;
                    var current_contract = {
                        payload: {
                            field_1553: approve_value, //Accept or reject final approval field
                        },
                        id_contract: current_contract_base.id,
                        user_id: current_contract_base.field_349_raw,
                        usingAmendments: current_contract_base.field_2224.replace(/(<([^>]+)>)/ig, "")
                    };
                    //delete empty fields to avoid errors on submission
                    for (let field in current_contract.payload) {
                        if (!current_contract.payload[field] || current_contract.payload[field] == "") {
                            delete current_contract.payload[field];
                        }
                    }
                    contracts.push(current_contract);
                }

                //let ngrokURL = "https://91d1-186-154-61-113.ngrok.io/api/v1/convert-contracts-bulk";
                //let urlReal = lib.CONEXIS_SERVER + "convert-contracts-bulk"
                //if (Knack.user.attributes.values.email.email == "jheidy@soluntech.com") {
                //  urlReal = ngrokURL;
                //}

                var payload = {
                    token: Knack.getUserToken(),
                    contracts: contracts,
                    createdBy: Knack.getUserAttributes().id
                };
                try {
                    const response = await $.ajax({
                        type: "POST",
                        url: lib.CONEXIS_SERVER + "convert-contracts-bulk",
                        //url: urlReal,
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(payload),
                    });
                    // console.log("server response from convert contracts bulk on client: ", response)
                    if (response.success) {
                        lib.refreshView("view_1651"); // contracts top table refresh
                        lib.refreshView("view_1641"); // message top refresh
                        lib.refreshView("view_2520"); // contracts require approval table refresh
                        disabledViews("view_3421", "inprocess"); // disable accept and reject buttons
                        lib.hideSpinner();
                    }
                } catch (e) {
                    console.log(e);
                    lib.customShowErrorMessage(
                        "view_3421",
                        "There was an error connecting to server. Please try again later."
                    );
                }
            } else {
                lib.customShowErrorMessage(
                    "view_3421",
                    "At least one contract must be selected."
                );
                lib.hideSpinner();
            }
        });

        // function disabled to views
        const disabledViews = (view, status) => {
            if (status == "inprocess") {
                $(`#${view} .kn-link`).attr("disabled", true); // disabled links,
                $(`#${view} table .kn-link`).attr('href', 'javascript:void(0);'); // disable tables links
                $(`#${view} table tr`).addClass("grey_out"); // grey out tables
                $(`#${view} table thead tr .select-all-contract`).attr("disabled", true); // disable checkbox
                $(`#${view} table tbody tr .select-contract`).attr("disabled", true); // disable checkbox
            }
        }
        // on bottom buttons render view:
        $(document).on(
            "knack-view-render.view_3421",
            async function (event, view, contracts) {
                const response = await getProcessState();
                disabledViews(view.key, response.status);

                $("#view_3421").append('<div id="custom-success-msg"></div>'); // msg empty
                $("#view_3421").append('<div id="custom-errors-msg"></div>');
                $("#view_3421 .kn-link.kn-link-1").click(function (ev) {
                    ev.preventDefault();
                    lib.showSpinner();
                    lib.click_view_3421("approve");
                });
                $("#view_3421 .kn-link.kn-link-2").click(function (ev) {
                    ev.preventDefault();
                    lib.showSpinner();
                    lib.click_view_3421("reject");
                });
            }
        );
        // finish

        lib.addMethod("add_user_email2", async function (email) {
            if (email) {
                var account = await lib.find(lib.OBJECTS_IDS.Account, [
                    { field: "field_36", operator: "is", value: email },
                ]);
                account = account.records[0];
                var dfd = $.Deferred();
                let count;
                $.ajax({
                    type: "PUT",
                    headers: {
                        "X-Knack-Application-Id": lib.applicationID,
                        "X-Knack-REST-API-KEY": "knack",
                        "content-type": "application/json",
                    },
                    url: `https://api.knack.com/v1/pages/scene_1366/views/view_3424/records/${account.id}`,
                    data: JSON.stringify({}),
                    triedCount: 0,
                    retryLimit: 3,
                    error: function (xhr, textStatus, errorThrown) {
                        console.log("error: " + this.triedCount);
                        this.triedCount++;
                        if (this.triedCount < this.retryLimit) {
                            console.log(this);
                            console.log(this.triedCount);
                            $.ajax(this);
                        } else {
                            dfd.reject(xhr);
                        }
                    },
                    success: function (response) {
                        dfd.resolve(response);
                    }
                });
                return dfd.promise();
            }
        });

        lib.addMethod("add_user_email", async function (email) {
            if (email) {
                try {
                    var account = await lib.find(lib.OBJECTS_IDS.Account, [
                        { field: "field_36", operator: "is", value: email },
                    ]);
                    account = account.records[0];
                    await $.ajax({
                        type: "PUT",
                        headers: {
                            "X-Knack-Application-Id": lib.applicationID,
                            "X-Knack-REST-API-KEY": "knack",
                            "content-type": "application/json",
                        },
                        url:
                            "https://api.knack.com/v1/pages/scene_1366/views/view_3424/records/" +
                            account.id,
                        dataType: "json",
                        data: JSON.stringify({}),
                    });
                } catch (e) {
                    console.log(e);
                    alert("error sending invite email");
                }
            }
        });

        $(document).on(
            "knack-form-submit.view_1496",
            async function (event, view, user) {
                var email = user.field_179_raw && user.field_179_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_1497",
            async function (event, view, user) {
                var email = user.field_184_raw && user.field_184_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_1498",
            async function (event, view, user) {
                var email = user.field_189_raw && user.field_189_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_1499",
            async function (event, view, user) {
                var email = user.field_199_raw && user.field_199_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_3169",
            async function (event, view, user) {
                var email = user.field_111_raw && user.field_111_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_3174",
            async function (event, view, user) {
                var email = user.field_111_raw && user.field_111_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_900",
            async function (event, view, user) {
                var email = user.field_304_raw && user.field_304_raw.email;
                lib.add_user_email(email);
            }
        );


        $(document).on(
            "knack-form-submit.view_742",
            async function (event, view, user) {
                var email = user.field_304_raw && user.field_304_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_3135",
            async function (event, view, user) {
                var email = user.field_194_raw && user.field_194_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_3136",
            async function (event, view, user) {
                var email = user.field_194_raw && user.field_194_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_3137",
            async function (event, view, user) {
                var email = user.field_536_raw && user.field_536_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_3138",
            async function (event, view, user) {
                var email = user.field_536_raw && user.field_536_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_3139",
            async function (event, view, user) {
                var email = user.field_304_raw && user.field_304_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_3141",
            async function (event, view, user) {
                var email = user.field_111_raw && user.field_111_raw.email;
                lib.add_user_email(email);
            }
        );

        $(document).on(
            "knack-form-submit.view_3142",
            async function (event, view, user) {
                var email = user.field_111_raw && user.field_111_raw.email;
                lib.add_user_email(email);
            }
        );
        $(document).on(
            "knack-form-submit.view_3756",
            async function (event, view, user) {
                console.log(user);
                // const buyer = Knack.views["view_508"].model.attributes.field_89_raw[0].identifier;
                // if (buyer !== "Soluntech Test") {
                var email = user.field_304_raw && user.field_304_raw.email;
                lib.add_user_email2(email);
                // }
            }
        );



        // $(document).on(
        //     "knack-view-render.view_3756",
        //     async function (event, view, user) {
        //         lib.showSpinner();
        //         const buyer = Knack.views["view_508"].model.attributes.field_89_raw[0].identifier;
        //         if (buyer !== "Soluntech Test") {
        //             $("#kn-input-field_2248").remove()
        //         }
        //         setTimeout(function () {
        //             lib.hideSpinner();
        //         }, 3000);
        //     }
        // );

        $(document).on(
            "knack-form-submit.view_3834",
            async function (event, view, user) {
                const buyer = Knack.views["view_508"].model.attributes.field_89_raw[0].identifier;
                if (buyer !== "Intelcom Courier Canada") {
                    var email = user.field_304_raw && user.field_304_raw.email;
                    lib.add_user_email2(email);
                }
            }
        );



        $(document).on(
            "knack-view-render.view_3834",
            async function (event, view, user) {
                lib.showSpinner();
                const buyer = Knack.views["view_508"].model.attributes.field_89_raw[0].identifier;
                if (buyer !== "Intelcom Courier Canada") {
                    $("#kn-input-field_2248").remove()
                }
                setTimeout(function () {
                    lib.hideSpinner();
                }, 3000);
            }
        );

        lib.addMethod("waitBuyerGeneral", function (view, callback) {
            if (
                document.getElementById(view) &&
                Knack.models[view].toJSON().id != undefined
            ) {
                callback();
            } else {
                setTimeout(function () {
                    lib.waitBuyerGeneral(view, callback);
                }, 500);
            }
        });

        lib.addMethod("getBuyerConnectionsSearchView3301", async function (obj) {
            lib.showSpinner();
            try {
                var selectedBuyer =
                    Knack.views[obj.buyerView].model.attributes.field_439_raw &&
                    Knack.views[obj.buyerView].model.attributes.field_439_raw[0] &&
                    Knack.views[obj.buyerView].model.attributes.field_439_raw[0].id;
                var businessUnits = await lib.find(lib.OBJECTS_IDS.BusinessUnit, [
                    { field: "field_1627", operator: "is", value: selectedBuyer },
                ]);
                var businessUnitDrp = $(
                    `#${obj.searchView} select[name="${obj.businnesUnitDrpdId}"]`
                );
                var businessUnitLst = businessUnitDrp
                    .siblings()
                    .find(".chzn-results");

                setTimeout(function () {
                    $("#connection-picker-chosen-field_1571 .chzn-search").remove();
                    businessUnitDrp.html("");
                    businessUnitLst.html("");
                    var nbu = 0;

                    for (businessUnit of businessUnits.records) {

                        businessUnitDrp.append(
                            `<option value="${businessUnit.id}">${businessUnit.field_1576}</option>`
                        );
                        businessUnitLst.append(
                            `<li id="kn_conn_field_1571_chzn_o_${nbu}" class="active-result" style="">${businessUnit.field_1576}</li>`
                        );
                        nbu++;
                    }
                    lib.hideSpinner();
                }, 1000);
            } catch (e) {
                console.log(e);
                lib.hideSpinner();
            }
        });

        $(document).on("knack-page-render.scene_1333", function (event, view) {
            lib.waitBuyerGeneral("view_3425", function () {
                lib.getBuyerConnectionsSearchView3301({
                    buyerView: "view_3425",
                    searchView: "view_3301",
                    businnesUnitDrpdId: "field_1571",
                });

                $('select[name="field_1571"]').change(function () {
                    console.log("function called  4664")
                    $(".chzn-single.chzn-single-with-drop span,.chzn-single span").html(
                        $(".chzn-results li.result-selected").html()
                    );
                    setTimeout(function () {
                        $(
                            ".chzn-single.chzn-single-with-drop span,.chzn-single span"
                        ).html($(".chzn-results li.result-selected").html());
                    }, 100);
                });
                $(".chzn-results").click(function (e) {

                    $('select[name="field_1571"]').change();
                });
            });
        });

        $(document).on("knack-view-render.view_2819", function (event, view, user) {
            //console.log("running on view 2819")
            $("td.cell-edit").click(function () {
                //console.log("click cell edit");
                $(".kn-file-upload input").ready(function () {
                    //console.log("inside ready")
                    setTimeout(function () {
                        $(".kn-file-upload input").change(function () {
                            //console.log("input change");
                            $("#cell-editor .submit a").removeClass("disabled");
                        });
                    }, 1000);

                });
            });

        });

        $(document).on("knack-view-render.view_631", function (event, view, user) {
            //console.log("running on view 2819")
            $("td.cell-edit").click(function () {
                //console.log("click cell edit");
                $(".kn-file-upload input").ready(function () {
                    //console.log("inside ready")
                    setTimeout(function () {
                        $(".kn-file-upload input").change(function () {
                            //console.log("input change");
                            $("#cell-editor .submit a").removeClass("disabled");
                        });
                    }, 1000);

                });
            });

        });

        $(document).on("knack-view-render.view_1326", function (event, view, user) {
            console.log("function running on view_1326")
            let actualInvoiceState = $("#view_1326-field_1793").val();
            if (actualInvoiceState == "Invoiced") {
                $("#view_1326-field_1793 option[value='Draft']").remove()
            } else if (actualInvoiceState == "Partial Payment") {
                $("#view_1326-field_1793 option[value='Draft']").remove();
                $("#view_1326-field_1793 option[value='Invoiced']").remove();
            } else if (actualInvoiceState == "Paid") {
                $("#view_1326-field_1793 option[value='Draft']").remove();
                $("#view_1326-field_1793 option[value='Invoiced']").remove();
                $("#view_1326-field_1793 option[value='Partial Payment']").remove();
            }

        });

        $(document).on("knack-view-render.view_3541", async function (event, view, data) {
            console.log("loreal search");
            let loreal_buyerID = "5efa00c67103e90016262658";
            let lorealRequesters = "", lorealWorkers = "";
            let requesterDropdown = '[id$="-field_1185"].chzn-select';
            let workerDropdown = '[id$="-field_488"].chzn-select';

            modifySearchDropdown(lib.OBJECTS_IDS.Requester, [
                { field: "field_310", operator: "is", value: loreal_buyerID },
            ], requesterDropdown, "field_178", "view_3545");

            modifySearchDropdown(lib.OBJECTS_IDS.Worker, [
                { field: "field_1236", operator: "is", value: loreal_buyerID },
            ], workerDropdown, "field_303", "view_3544");

        });

        async function modifySearchDropdown(searchObjID, searchFilter, dropElement, textField, tableSource) {
            dropElement = $(dropElement);
            dropElement.parent().addClass("myDisabled");
            dropElement.addClass("grey_out");
            // dropElement.next().children("a").addClass("grey_out");

            let preSelection = dropElement.children("option:selected").val();
            // console.log(dropElement.children().length);
            dropElement.html('<option value="">Type to search</option>');
            let strArray = "";
            let lorealStaff = "";
            try {
                // console.log(tableSource, Knack.models[tableSource]);
                if (Knack.models[tableSource]) {
                    console.log("=> load from table");
                    lorealStaff = Knack.models[tableSource].data.models.map((r) => r.toJSON());
                } else {
                    console.log("=> db request");
                    lorealStaff = await lib.find(searchObjID, searchFilter);
                    lorealStaff = lorealStaff.records;
                }
                // dropElement.html('<option value="">Type to search</option>');
                // console.log(lorealStaff);
                for (var member of lorealStaff) {
                    strArray += `<option value="${member.id}">${member[textField]}</option>`
                }
                // console.log(dropElement.children().length);
            } catch (e) {
                console.log(e);
            }

            setTimeout(function () {
                if (dropElement.children().length < 3) dropElement.append(strArray);
                dropElement.val(preSelection);
                dropElement.trigger("liszt:updated");
                dropElement.parent().removeClass("myDisabled");
                dropElement.removeClass("grey_out");
                // dropElement.next().children("a").removeClass("grey_out");
            }, 1000);

        };

        // new function to get logged in buyer
        const getUserAttributesCustom = async (id) => {
            const user = await lib.findById(lib.OBJECTS_IDS.Account, id);
            return user
        }
        // business unit filter
        $(document).on("knack-view-render.view_2684", async function (event, view, user) {
            const testUserA = await getUserAttributesCustom(Knack.getUserAttributes().id);
            if (!testUserA.field_1063_raw[0]) {
                return
            }
            const IDbuyerActual = testUserA.field_1063_raw[0].id;
            $(".kn-filters-nav a").click(function () {
                $("#kn-modal-bg-0").ready(function () {
                    $('#kn-filters-form .kn-filter-item .field .select').change(function (e) {
                        let dropElement = $(this).parent().nextAll(".kn-filter-value.kn-select").children("select");
                        let hideElement = $(this).parent().nextAll(".kn-filter-value.kn-select").children(".chzn-container.chzn-container-single");
                        if (this.value == "field_1571") {
                            modifyFilterDropdown(lib.OBJECTS_IDS.BusinessUnit, [
                                { field: "field_1627", operator: "is", value: IDbuyerActual },
                            ], dropElement, "field_1576", hideElement);
                        }
                    })
                    $("#add-filter-link").click(function () {
                        $('#kn-filters-form .kn-filter-item .field .select').change(function (e) {
                            let dropElement = $(this).parent().nextAll(".kn-filter-value.kn-select").children("select");
                            let hideElement = $(this).parent().nextAll(".kn-filter-value.kn-select").children(".chzn-container.chzn-container-single");
                            if (this.value == "field_1571") {
                                modifyFilterDropdown(lib.OBJECTS_IDS.BusinessUnit, [
                                    { field: "field_1627", operator: "is", value: IDbuyerActual },
                                ], dropElement, "field_1576", hideElement);
                            }
                        })

                    })
                })
            });
        });
        async function modifyFilterDropdown(searchObjID, searchFilter, dropElement, textField, hideElement) {
            hideElement.hide();

            dropElement.show();
            dropElement.css("width", "100%");
            dropElement.parent().addClass("myDisabled");
            dropElement.addClass("grey_out");

            let preSelection = dropElement.children("option:selected").val();
            dropElement.html('<option value="">Select</option>');

            let strArray = "";
            let lorealStaff = "";
            try {
                // console.log("=> db request");
                lorealStaff = await lib.find(searchObjID, searchFilter);
                lorealStaff = lorealStaff.records;

                // console.log("records obtenidos lorealStaff: ", lorealStaff);
                for (var member of lorealStaff) {
                    strArray += `<option value="${member.id}">${member[textField]}</option>`
                }
            } catch (e) {
                console.log(e);
            }
            setTimeout(function () {
                dropElement.html('<option value="">Select</option>');
                dropElement.append(strArray);
                dropElement.val(preSelection);
                dropElement.trigger("liszt:updated");
                dropElement.parent().removeClass("myDisabled");
                dropElement.removeClass("grey_out");
            }, 1000);

        };
        // finish business unit filter
        // export limiter start
        $(document).on("knack-view-render.view_2522", function (event, view, user) {
            //prevent export
            $("#view_2522 .kn-export-button").click(function (e) {
                const numberRecords = $("#view_2522 .kn-entries-summary").text().trim().split(" ").pop();
                if (numberRecords > 5000) {
                    alert("The report you are requesting to export has greater than the allowable limit of 5,000 lines. Please narrow your search criteria and retry.")
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    $(".close-modal").click()
                }
            });
        });
        $(document).on("knack-view-render.view_3212", function (event, view, user) {
            //prevent export
            $("#view_3212 .kn-export-button").click(function (e) {
                const numberRecords = $("#view_3212 .kn-entries-summary").text().trim().split(" ").pop();
                if (numberRecords > 5000) {
                    alert("The report you are requesting to export has greater than the allowable limit of 5,000 lines. Please narrow your search criteria and retry.")
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    $(".close-modal").click()
                }
            });
        });
        // export limiter finish
        // feature con-61 contract creation with csv start
        $(document).on("knack-view-render.view_3550", function (e, v, record) {
            var form = $(`#${v.key} form`);
            //var fileInput = form.find("#field_1486_upload");
            var submit = form.find("button:submit");

            submit.click(function (ev) {
                console.log("submit button clicked")
                ev.preventDefault();
                var fileInput1 = $("input[name='field_2147']");
                console.log(fileInput1.val());
                if (fileInput1.val()) {
                    //if (fileInput[0].files.length > 0 && fileInput[0].files[0].name.toLowerCase().includes('.csv')) {
                    $("#success-upload-response-text").text("");
                    $("#errors-upload-response-text").text("");
                    $("#errors-upload-response").html("");
                    form.submit();
                    console.log("form submit aca")
                    //} else {
                    //  alert('the file must be .CSV');
                    //}
                    //lib.refreshView("view_3550");
                } else {
                    alert("File required");
                }

                //Knack.views["view_3550"].model.fetch();
            });
        });


        $(document).on("knack-form-submit.view_3550", async function (e, v, record) {
            lib.loadLibrary("jquery", "async", "moment", "blockUI", async function () {
                //lib.refreshView("view_3550");
                //let testUserA;
                //try {
                //  testUserA = await getUserAttributesCustom(Knack.getUserAttributes().id);
                //} catch (e) {
                //  alert("Network error, please try again!")
                //return
                //}
                const IDbuyerActual = Knack.user.attributes.values.field_1063[0] ? Knack.user.attributes.values.field_1063[0] : "";
                if (!IDbuyerActual) {
                    alert("No buyer connected to your account, please change the buyer and try again!")
                    return
                }
                lib.$.blockUI({
                    message: '<h3 id="progress-message">Uploading CSV</h3>',
                });

                //console.log(JSON.stringify(record));
                // const IDbuyerActual = Knack.user.attributes.values.field_1063[0];
                //const IDbuyerActual = testUserA.field_1063_raw[0].id;
                var obj = {
                    record: record,
                    buyer: IDbuyerActual,
                    token: Knack.getUserToken(),
                };

                //let ngrokURL = "https://91d1-186-154-61-113.ngrok.io/api/v1/contractsCsvUpload";
                //let urlReal = lib.CONEXIS_SERVER + "contractsCsvUpload"
                //if (Knack.user.attributes.values.email.email == "jheidy@soluntech.com") {
                //  urlReal = ngrokURL;
                //}
                return $.ajax({
                    type: "POST",
                    url: lib.CONEXIS_SERVER + "contractsCsvUpload",
                    //url: urlReal,
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(obj),
                })
                    .then(function (response) {
                        $("#view_3550" + " .kn-form-confirmation" + " .kn-message.success").hide()
                        $('#progress-message').text('Uploading CSV file.');
                        //lib.refreshView("view_1331");
                        setTimeout(function () {
                            lib.$.unblockUI();
                        }, 1500);
                        console.log(response)
                        if (response.status == "ok") {
                            //lib.ShowSuccessMessage("view_3548", response.message)
                            $("#view_3550" + " .kn-form-confirmation").prepend(
                                $("<div>")
                                    .addClass("kn-message success")
                                    .append(
                                        $("<span>")
                                            .addClass("kn-message-body")
                                            .append($("<p>").append($("<strong>").html(response.message)))
                                    )
                            );
                            //$('#progress-message').text(response.message);
                            // setTimeout(function () {
                            //     lib.$.unblockUI();
                            // }, 1500);
                        } else {
                            //lib.refreshView("view_3551")
                            lib.refreshView("view_3765")
                            //lib.customShowErrorMessage("view_3548", response.message)
                            let errorList = $("<ul></ul>");
                            for (let errorMsg of response.message) {
                                errorList.append($(`<li>${errorMsg}</li>`))
                            }
                            $("#view_3550" + " .kn-form-confirmation").prepend(
                                $("<div>")
                                    .attr("id", "custom-errors-msg")
                                    .addClass("kn-message is-error")
                                    .append(
                                        $("<span>")
                                            .addClass("kn-message-body")
                                            .append($("<p>").append($("<strong>").html(errorList)))
                                    )
                            );
                            //$('#progress-message').text(response.message);
                        }
                    })
                    .fail(function (err) {
                        lib.refreshView(v.key)
                        $("#progress-message").text(
                            "Error conecting to the server, please try again later."
                        );
                        setTimeout(function () {
                            lib.$.unblockUI();
                        }, 1500);
                    });
            });
        });
        $(document).on("knack-view-render.view_3552", function (e, v, record) {
            $("#view_3552 .col-10").parent().hide();
            $("#view_3552 th.kn-table-link").slice(-1).hide();
        });
        // feature con-61 contract creation with csv finish

        // feature con-120 update invoice related record status when invoice status change start
        // scene_665 for normal buyers and scene_674 for Self serve buyers
        // for normal buyers:
        // $(document).on("knack-view-render.view_1326", function (event, view, user) {
        //     const isChangingStatus = Knack.models.view_1326.attributes.field_2157;
        //     if (isChangingStatus == "Yes") {
        //         lib.showSuccessMessage(view.key, "Changing Buyer Invoice Status, You will recieve and email when the process finish.")
        //         $("#view_1326 button").prop('disabled', true);
        //         $("#view_1326 select").prop('disabled', true);
        //     }
        // });
        $(document).on("knack-form-submit.view_1326", async function (e, v, record) {
            //const IDbuyerActual = Knack.user.attributes.values.field_1063[0];
            var obj = {
                record: record,
                //buyer: IDbuyerActual,
                token: Knack.getUserToken(),
                loggedInEmail: Knack.user.attributes.values.field_36.email
            };
            await $.ajax({
                type: "POST",
                url: lib.CONEXIS_SERVER + "change_invoice_status",
                // url: "https://815c-186-112-204-221.ngrok.io/api/v1/" + "change_invoice_status",
                //url: "https://httpstat.us/500",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(obj),
            })
                .then(function (response) {
                    console.log("server response: ", response)
                    // lib.refreshView(v.key)
                    lib.removeMessages(v.key);
                    lib.showSuccessMessage(v.key, "Changing Buyer Invoice Status, You will receive an email when the process finish.")
                    $("#view_1326 button").prop('disabled', true);
                    $("#view_1326 select").prop('disabled', true);
                })
                .fail(function (error) {
                    console.log("dentro de fail")
                    // lib.showErrorMessage(v.key, "Error connecting to server, please try again later!")
                    $("#view_1326" + " .kn-form-confirmation" + " .kn-message.success").hide()
                    $("#view_1326" + " .kn-form-confirmation").prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Error connecting to server, try again later!")))
                            )
                    );
                    try {
                        lib.update(
                            lib.OBJECTS_IDS.BuyerInvoice,
                            record.id,
                            JSON.stringify({
                                field_2159: "No",
                            })
                        );
                    } catch (e) {
                        console.log("Error updating to no: ", e);
                    }
                })
        });
        // for Self serve buyers
        $(document).on("knack-form-submit.view_2988", async function (e, v, record) {
            //const IDbuyerActual = Knack.user.attributes.values.field_1063[0];
            var obj = {
                record: record,
                //buyer: IDbuyerActual,
                token: Knack.getUserToken(),
                loggedInEmail: Knack.user.attributes.values.field_36.email
            };
            await $.ajax({
                type: "POST",
                url: lib.CONEXIS_SERVER + "change_invoice_status",
                //url: "https://httpstat.us/500",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(obj),
            })
                .then(function (response) {
                    console.log("server response: ", response)
                    // lib.refreshView(v.key)
                    lib.removeMessages(v.key);
                    lib.showSuccessMessage(v.key, "Changing Buyer Invoice Status, You will receive an email when the process finish.")
                    $("#view_2988 button").prop('disabled', true);
                    $("#view_2988 select").prop('disabled', true);
                })
                .fail(function (error) {
                    console.log("dentro de fail")
                    // lib.showErrorMessage(v.key, "Error connecting to server, please try again later!")
                    $("#view_2988" + " .kn-form-confirmation" + " .kn-message.success").hide()
                    $("#view_2988" + " .kn-form-confirmation").prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Error connecting to server, try again later!")))
                            )
                    );
                    try {
                        lib.update(
                            lib.OBJECTS_IDS.BuyerInvoice,
                            record.id,
                            JSON.stringify({
                                field_2159: "No",
                            })
                        );
                    } catch (e) {
                        console.log("Error updating to no: ", e);
                    }
                })
        });
        // feature con-120 update invoice related record status when invoice status change finish
        // start mergeit
        lib.addMethod("formatPercentage", function (value) {
            let valueFormat = value * 100;
            return valueFormat + ".00%"
        });
        // generate pdf
        $(document).on("knack-page-render.scene_1407", async function (event, view, user) {
            console.log("render modal ")
            if ($("#kn-scene_1407").parent().hasClass("modal-card-body")) {

                $("#view_3560 a").attr("disabled", true)
                //lib.showSpinner();
                console.log("generating pdf message")
                //lib.showSuccessMessage("view_3555", "Generating PDF")
                $("#view_3559").prepend(
                    $("<div>")
                        .addClass("kn-message success")
                        .append(
                            $("<span>")
                                .addClass("kn-message-body")
                                .append($("<p>").append($("<strong>").html("Generating PDF")))
                        )
                );

                let data = {};
                //const buyerID = Knack.user.attributes.values.field_1063[0];
                const buyerID = Knack.views.view_3482.model.attributes.id;
                const buyer = await lib.findById(lib.OBJECTS_IDS.Buyer, buyerID);
                const currency = buyer.field_432;
                console.log("currency: ", currency)

                if (buyer.field_1763_raw) {
                    // self serve buyer
                    let invoice = await lib.find(lib.OBJECTS_IDS.BuyerInvoice, [
                        { field: "field_964", operator: "is", value: Knack.views.view_2963.model.attributes.field_964 },
                    ]);
                    let comment = invoice.records[0].field_1021 + "<br>" + invoice.records[0].field_1211;
                    data = {
                        invoiceId: Knack.views.view_2963.model.attributes.field_964,
                        remitAddress: Knack.views.view_2963.model.attributes.field_1009 ? Knack.views.view_2963.model.attributes.field_1009 : "",
                        // billToAddress: `${Knack.views.view_1309.model.attributes.field_848_raw}<br><br>${Knack.views.view_1309.model.attributes.field_4}`,
                        billToAddress: Knack.views.view_2963.model.attributes.field_1782,
                        billToName: Knack.views.view_2963.model.attributes.field_848_raw ? Knack.views.view_2963.model.attributes.field_848_raw : "",
                        invoiceDate: Knack.views.view_2963.model.attributes.field_1008,
                        dueDate: Knack.views.view_2963.model.attributes.field_969,
                        //timeCards: timeCards,
                        // sumTotalHours: Knack.views.view_1399.model.attributes.field_1014.replace("(", "").replace(")", ""),
                        sumTotalExpenses: Knack.views.view_2947.model.attributes.field_1468,
                        sumTotalLabour: Knack.views.view_2947.model.attributes.field_1465,
                        totalTax: Knack.views.view_2947.model.attributes.field_995,
                        InvoiceTotal: Knack.views.view_2947.model.attributes.field_989,
                        comment: comment.length > 4 ? comment : "There is no comments for this Invoice.",
                        currency: currency
                    }
                } else {
                    // normal buyer
                    let invoice = await lib.find(lib.OBJECTS_IDS.BuyerInvoice, [
                        { field: "field_964", operator: "is", value: Knack.views.view_1309.model.attributes.field_964 },
                    ]);
                    let comment = invoice.records[0].field_1021 + "<br>" + invoice.records[0].field_1211;
                    data = {
                        invoiceId: Knack.views.view_1309.model.attributes.field_964,
                        remitAddress: Knack.views.view_1309.model.attributes.field_1009,
                        // billToAddress: `${Knack.views.view_1309.model.attributes.field_848_raw}<br><br>${Knack.views.view_1309.model.attributes.field_4}`,
                        billToAddress: Knack.views.view_1309.model.attributes.field_4,
                        billToName: Knack.views.view_1309.model.attributes.field_848_raw,
                        invoiceDate: Knack.views.view_1309.model.attributes.field_1008,
                        dueDate: Knack.views.view_1309.model.attributes.field_969,
                        //timeCards: timeCards,
                        // sumTotalHours: Knack.views.view_1399.model.attributes.field_1014.replace("(", "").replace(")", ""),
                        sumTotalExpenses: Knack.views.view_1399.model.attributes.field_1468,
                        sumTotalLabour: Knack.views.view_1399.model.attributes.field_1465,
                        totalTax: Knack.views.view_1399.model.attributes.field_995,
                        InvoiceTotal: Knack.views.view_1399.model.attributes.field_989,
                        comment: comment.length > 4 ? comment : "There is no comments for this Invoice.",
                        currency: currency
                    }
                }

                let final_data = {
                    test: 'false',
                    body_json: data
                }
                let filename = "Invoice_" + data.invoiceId;
                // const url_mergeit = "https://test.mergeit.co/api/v1/157/SAY07";
                let url_mergeit = "https://server.mergeit.co/api/v1/210/uKUZw";
                //if (Knack.getUserAttributes().email=="developers@example.com") {
                //  url_mergeit = "https://test.mergeit.co/api/v1/379/GewJO";
                //}

                try {
                    let response = await lib.generatePDFile(final_data, filename, url_mergeit);
                    console.log(response)

                    $("#view_3560 .kn-link-1").click(function (e) {
                        e.preventDefault();
                        lib.noSaveDownloadBlobFile(response.blob, response.filename);
                    });

                    let uploadResponse = await lib.upload("file", response.blob, response.filename)
                    let oldHref = $("#view_3560 .kn-link-2").attr("href");
                    console.log("upload response", uploadResponse)
                    //uploadResponse = JSON.stringify(uploadResponse);
                    //console.log("uploadresponse stringify", uploadResponse)
                    //let newhref = oldHref + `?${uploadResponse}`
                    let newhref = oldHref + `?id=${uploadResponse.id}&filename=${uploadResponse.filename}`
                    console.log("new url with query String: ", newhref)

                    $("#view_3560 .kn-link-2").attr("href", newhref)

                    $("#view_3560 a").attr("disabled", false)
                    $("#view_3559 .kn-message.success").remove();
                    const pdfName = $("<div>").append($('<i class="fa fa-file-pdf-o"></i>')).append(($("<p>").html(`  ${response.filename}`).css("display", "inline")));
                    $("#view_3559").append(pdfName)

                } catch (e) {
                    $("#view_3559 .kn-message success").remove();
                    //lib.hideSpinner();
                    //lib.showErrorMessage("view_3555", "Error Generating PDF, try again later")
                    $("#view_3559").prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Error Generating PDF, try again later")))
                            )
                    );
                    console.log("error generating pdf: ", e);
                }

            } else {
                console.log("error message no modal")
                $("#view_3559").prepend(
                    $("<div>")
                        .attr("id", "custom-errors-msg")
                        .addClass("kn-message is-error")
                        .append(
                            $("<span>")
                                .addClass("kn-message-body")
                                .append($("<p>").append($("<strong>").html("No Invoice selected, there is no PDF generated, please generate the PDF from the invoice details page")))
                        )
                );

            }
        });

        $(document).on("knack-page-render.scene_1408", async function (event, view, user) {
            let queryString = Knack.hash_vars;
            if (queryString.id && queryString.filename) {
                $("#kn-input-field_2162 input.file").val(queryString.id) // generated pdf input
                $("#kn-input-field_2162").children().hide()
                $("#kn-input-field_2162").append(queryString.filename)

                $("#kn-input-field_2171 a").html('<i class="fa fa-plus-circle"></i>Add new email')
                // $("#kn-input-field_2140").append($("<a>").append("Remove"))
                // $("#kn-input-field_2140 a").click(function (e) {
                //     e.preventDefault()
                //     lib.refreshView("view_3558")
                // })
            } else {
                $("#view_3561").hide();
                $("#kn-scene_1408").append(
                    $("<div>")
                        .attr("id", "custom-errors-msg")
                        .addClass("kn-message is-error")
                        .append(
                            $("<span>")
                                .addClass("kn-message-body")
                                .append($("<p>").append($("<strong>").html("No Invoice selected, there is no PDF generated, please generate the PDF from the invoice details page")))
                        )
                );
            }
        });

        lib.addMethod('generatePDFile', async function (obj, filename, optUrl) { // i deleted houshold as parameter
            //callback = callback || function () { };
            try {
                var response = await $.ajax({
                    type: 'POST',
                    url: optUrl,
                    contentType: 'application/json',
                    async: true,
                    cache: false,
                    timeout: 600000,
                    data: JSON.stringify(obj)
                })
                var byteCharacters = atob(response.pdf);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var blob = new Blob([byteArray], { type: 'application/pdf' });
                filename_complete = filename + '.pdf';
                //lib.noSaveDownloadBlobFile(blob, filename_complete);
                return { blob: blob, filename: filename_complete }
            } catch (e) {
                callback(e);
            }
        });

        lib.addMethod('noSaveDownloadBlobFile', function (blob, filename, callback) {
            callback = callback || function () { };
            var reader = new FileReader();
            callback = callback || function () { };
            filename = filename || 'report.pdf';
            reader.onload = function (event) {
                var link = document.createElement('a');
                link.setAttribute('download', filename);
                link.href = event.target.result;
                link.click();
                callback(blob);
            };
            reader.readAsDataURL(blob);
        });
        // finish mergeit

        // feature con-128 submit timecard for approval start
        $(document).on("knack-view-render.view_3342", function (e, view, record) {

            $("#view_3342 .kn-table-action-link").hide()
            $("#view_3342 .col-10").parent().hide()

            //$("#view_3342 .kn-table-link a").attr("href", "")
            // $("#view_3342 .kn-table-link").click(function (e) {
            //     e.preventDefault();
            //     console.log("action link clik")
            // });
            let linkSubmitAction = $("#view_3342 .col-11").parent();
            linkSubmitAction.click(async function (e) {
                e.preventDefault();
                lib.showSpinner();
                console.log("link click");
                const recordID = this.parentNode.id;
                console.log(recordID)

                var obj = {
                    recordID: recordID,
                    token: Knack.getUserToken(),
                    userID: Knack.getUserAttributes().id,
                    // loggedInEmail: Knack.user.attributes.values.field_36.email
                };
                //let nrgokURL = 'https://2604a4f15fd2.ngrok.io/api/v1/';
                try {
                    const response = await $.ajax({
                        type: "PUT",
                        url: lib.CONEXIS_SERVER + "submit_timecard_for_approval",
                        //url: nrgokURL + "submit_timecard_for_approval",
                        //url: "https://httpstat.us/500",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(obj),
                    });
                    // lib.loadLibrary("moment", async function () {
                    //     console.log("updating current process log")
                    //     await lib.update(
                    //         lib.OBJECTS_IDS.ProcessLog,
                    //         recordID,
                    //         JSON.stringify({
                    //             field_1955: "Submitted for Approval",
                    //             field_1963: moment(new Date()).format("MM-DD-YYYY HH:mm"),
                    //             field_1964: Knack.getUserAttributes().id
                    //         })
                    //     );
                    // })
                    console.log("getting response")
                    if (response.status == "ok") {
                        //lib.refreshView(view.key)
                        // $(`#${view.key} .kn-export-button`).hide();
                        // $(`#${view.key} .kn-link`).attr("disabled", true); // disabled links,
                        // $(`#${view.key} table .kn-link`).attr('href', 'javascript:void(0);'); // disable tables links
                        // $(`#${view.key} table tr`).addClass("grey_out"); // grey out tables
                        disabledViews(view.key, "inprocess");

                        $(`#${view.key} .kn-message`).hide();
                        $(`#${view.key}`).prepend(
                            $("<div>")
                                .addClass("kn-message success")
                                .append(
                                    $("<span>")
                                        .addClass("kn-message-body")
                                        .append($("<p>").append($("<strong>").html("The time & expense cards are being submitted, you will receive an email when the process finish")))
                                )
                        );
                        lib.hideSpinner();
                    } else {
                        $(`#${view.key} .kn-message`).hide();
                        $(`#${view.key}`).prepend(
                            $("<div>")
                                .addClass("kn-message is-error")
                                .append(
                                    $("<span>")
                                        .addClass("kn-message-body")
                                        .append($("<p>").append($("<strong>").html("Internal Server Error Please try again!")))
                                )
                        );

                    }
                } catch (error) {

                    console.log("error", error)
                    $(`#${view.key} .kn-message`).hide();
                    $(`#${view.key}`).prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Error connecting to server, try again later!")))
                            )
                    );
                    lib.hideSpinner();
                    // try {
                    //     await lib.update(
                    //         lib.OBJECTS_IDS.ProcessLog,
                    //         recordID,
                    //         JSON.stringify({
                    //             field_1955: "Processed - pending submission for approval",
                    //             field_1963: "",
                    //             field_1964: ""
                    //         })
                    //     );
                    // } catch (e) {
                    //     console.log("Error updating to back: ", e);
                    // }
                }

            });
        });

        $(document).on("knack-view-render.view_3342", async function (event, view, records) {
            const response = await $.ajax({
                type: 'GET',
                url: lib.CONEXIS_SERVER + 'is_process_runing',
                dataType: 'json',
            });
            if (response.process) {
                let actualState = response.process.isTEsubmittingForApproval;
                if (actualState) {
                    disabledViews(view.key, "inprocess");

                    let elemClasses = "custom_notification";

                    let element = `<div class="${elemClasses}">
                                                <p><i class="fa fa-info-circle"></i> "The Time and Expense Cards are being submitted for approval.\
                                                You will receive an email upon completion of the process. \
                                                please check back when this is completed to run the process again"</p>
                                                </div>`

                    $("#" + view.key).prepend(element);

                }
            } else {
                console.log("Server error verifying actual status: ", response);
                // let elemClasses = "custom_notification error";

                // let element = `<div class="${elemClasses}">
                // <p><i class="fa fa-info-circle"></i> "Error Connecting to server"</p>
                // </div>`

                // $("#" + view.key).prepend(element);
            }
        });
        // feature con-128 submit timecard for approval finish

        // update contract knack jobs internal soluntech use only
        $(document).on("knack-view-render.view_3566", function (event, view, r) {

            console.log("running new function to update jobs")

            var urltecard = 'https://a0e0c748e4c0.ngrok.io/api/v1/';

            const button = $(`#view_3567 .kn-link-1.kn-button`)

            button.click(function (e) {
                e.preventDefault();
                console.log("button clicked")

                let records = Knack.views.view_3566.model.results_model.data.models.map(function (r) {
                    return r.toJSON();
                });

                records = records.map(function (r) {
                    let recordObject = {
                        contractID: r.field_349,
                        BuyerID: r.field_47_raw[0].id,
                        id: r.id,
                    };
                    return recordObject
                });

                $.ajax({
                    type: "PUT",
                    url: urltecard + "update_knack_jobs_contracts",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({
                        records: records,
                        userId: Knack.getUserAttributes().id,
                        token: Knack.getUserToken(),
                    }),
                }).then(function () {
                    console.log("succes server response")
                }).fail(function () {
                    console.log("failed to connect to server")
                })
            });
        });

        $(document).on("knack-view-render.view_645", async function (event, view, records) {
            $("#view_645 #kn-input-field_440").hide();
        });

        $(document).on("knack-view-render.view_2988", function (event, view, user) {
            //console.log("function running on view_1326")
            let actualInvoiceState = $("#view_2988-field_1795").val();
            if (actualInvoiceState == "Invoiced") {
                $("#view_2988-field_1795 option[value='Draft']").remove()
            }

        });

        // mergeit supplier invoice start
        // css to hide new view
        $(document).on("knack-view-render.view_3569", function (event, view, user) { // change in prod
            const generatedPDFbutton = $(`#${view.key} .kn-link-1.kn-button`);
            generatedPDFbutton.click(async (e) => {
                lib.showSpinner();
                e.preventDefault();
                console.log("Generate PDF button click");
                let data = {};
                // const buyerID = Knack.views.view_3580.model.attributes.field_955_raw[0].id; //cambiar en prod view
                const selfserve = Knack.views.view_3568.model.attributes.field_1792; //cambiar en prod view
                if (selfserve == "No") {
                    let comment = Knack.views.view_3568.model.attributes.field_1212; // change in prod
                    data = {
                        invoiceId: Knack.views.view_1303.model.attributes.field_959,
                        invoiceDate: Knack.views.view_1303.model.attributes.field_1008,
                        remitAddress: Knack.views.view_1303.model.attributes.field_11,
                        remitToName: Knack.views.view_1303.model.attributes.field_847,
                        billToAddress: Knack.views.view_1303.model.attributes.field_1009,

                        sumTotalExpenses: Knack.views.view_3568.model.attributes.field_1477, // cambiar prod
                        sumTotalLabour: Knack.views.view_3568.model.attributes.field_1475, // cambiar prod
                        totalTax: Knack.views.view_3568.model.attributes.field_985, // cambiar prod
                        InvoiceTotal: Knack.views.view_3568.model.attributes.field_976, // cambiar prod
                        comment: comment.length > 0 ? comment : "There is no comments for this Invoice.",
                        currency: Knack.views.view_3568.model.attributes.field_432_raw, // change in prod
                        taxID: Knack.views.view_3568.model.attributes.field_628_raw // change in prod
                    };
                } else {
                    let comment = Knack.views.view_3568.model.attributes.field_1212; // change in prod
                    data = {
                        invoiceId: Knack.views.view_3179.model.attributes.field_959,
                        invoiceDate: Knack.views.view_3179.model.attributes.field_1008,
                        remitAddress: Knack.views.view_3179.model.attributes.field_11,
                        remitToName: Knack.views.view_3179.model.attributes.field_847,
                        billToAddress: Knack.views.view_3179.model.attributes.field_1782,

                        sumTotalExpenses: Knack.views.view_3568.model.attributes.field_1477, // cambiar prod
                        sumTotalLabour: Knack.views.view_3568.model.attributes.field_1475, // cambiar prod
                        totalTax: Knack.views.view_3568.model.attributes.field_985, // cambiar prod
                        InvoiceTotal: Knack.views.view_3568.model.attributes.field_976, // cambiar prod
                        comment: comment.length > 0 ? comment : "There is no comments for this Invoice.",
                        currency: Knack.views.view_3568.model.attributes.field_432_raw, // change in prod
                        taxID: Knack.views.view_3568.model.attributes.field_628_raw // change in prod
                    };
                }

                let final_data = {
                    test: 'false',
                    body_json: data
                }
                let filename = "Invoice_" + data.invoiceId;

                const url_mergeit = "https://test.mergeit.co/api/v1/159/28SRC";

                try {
                    $(`#${view.key} .kn-message.is-error`).remove();
                    let response = await lib.generatePDFile(final_data, filename, url_mergeit);
                    // console.log(response)

                    lib.noSaveDownloadBlobFile(response.blob, response.filename);
                    lib.hideSpinner();

                } catch (e) {

                    lib.hideSpinner();
                    //lib.showErrorMessage("view_3555", "Error Generating PDF, try again later")
                    $(`#${view.key}`).prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Error Generating PDF, try again later")))
                            )
                    );
                    console.log("error generating pdf: ", e);
                }

            });
        });
        // mergeit supploer invoice finish

        // TRS scorecard start

        $(document).on("knack-view-render.view_3573", function (e, v, record) {
            let form = $(`#${v.key} form`);
            var submit = form.find("button:submit");

            submit.click(function (ev) {
                ev.preventDefault();
                lib.loadLibrary("moment", function () {
                    console.log("submit button clicked")


                    const EndDate = moment($("#view_3573-field_2178").val(), "MM/DD/YYYY");
                    const startDate = moment($("#view_3573-field_2177").val(), "MM/DD/YYYY");
                    const Target1 = Number($("#view_3573 #field_2180").val());
                    const Target2 = Number($("#view_3573 #field_2181").val());
                    const Target3 = Number($("#view_3573 #field_2182").val());
                    const Target4 = Number($("#view_3573 #field_2183").val());
                    const Target5 = Number($("#view_3573 #field_2184").val());
                    const Target6 = Number($("#view_3573 #field_2185").val());

                    if (EndDate.isBefore(startDate)) {
                        lib.removeMessages("view_3573");
                        lib.showErrorMessage(
                            "view_3573",
                            "End date must be after Start date."
                        );

                    } else if (isNaN(Target1) || isNaN(Target2) || isNaN(Target3) || isNaN(Target4) || isNaN(Target5) || isNaN(Target6)) {
                        lib.removeMessages(v.key);
                        lib.showErrorMessage(v.key, "At least one target value includes a letter or symbol, the target value must be a number!");
                    } else if (!(0 <= Target1 && Target1 <= 100) || !(0 <= Target2 && Target2 <= 100) || !(0 <= Target3 && Target3 <= 100) ||
                        !(0 <= Target4 && Target4 <= 100) || !(0 <= Target5 && Target5 <= 100) || !(0 <= Target6 && Target6 <= 100)) {
                        lib.removeMessages(v.key);
                        lib.showErrorMessage(v.key, "At least one target value is not between 0 and 100, the target values must be a number between 0 and 100!");
                    } else {
                        form.submit();
                    }

                });
            });
        });

        const GenerateHTMLcard = (score) => {
            const card = `                            
                    <div class="card">
                    <div class="card__header">
                        <h5 style="margin: 0">
                            ${score.title}
                        </h5>
                    </div>
                    <div class="card__content">
                        <div class="containerScoreCard">
                            <div>
                                <div class="traffic traffic__score" style="left: ${score.actualSupplier}%">
                                    <span class="traffic__score-description"> Supplier’s score</span>
                                    <p class="ammount" style="color: white;" >${score.actualSupplier}%</p>
                                    <div class="traffic__score-line"></div>
                                </div>
                                <div class="traffic histogram">
                                    <div class="content">

                                    </div>
                                </div>
                                <div class="traffic porcentage">
                                    <div class="traffic__gray low" style="width:  ${score.worstSupplier}%" data-after-content=" ${score.worstSupplier}%">
                                        <span>Low</span>
                                    </div>
                                    <div class="traffic__step blue" style="width:  ${score.target}%">
                                        <div class="traffic traffic__target">
                                            <p class="ammount" style="color: white;"> ${score.target}%</p>
                                            <span class="traffic__target__description traffic__score-description">
                                                target</span>
                                        </div>
                                    </div>
                                    <div class="traffic__step orange" style="${score.comparisoncss} width:  ${score.bestSupplier}%" data-after-content=" ${score.bestSupplier}%"></div>
                                    <span class="traffic__gray--title">High</span>
                                    <div class="traffic__gray height" style="width: 100%">
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; padding-bottom: 15px; align-items: center;">
                                <table id="customers" class="bestWorstScoreCardTable" style="height: 100px;">
                                    <thead>
                                        <tr>
                                            <th>Color</th>
                                            <th>Name</th>
                                            <th>Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <div class="ball best"></div>
                                            </th>
                                            <th>Best</th>
                                            <th> ${score.bestSupplier}%</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <div class="ball worse"></div>
                                            </th>
                                            <th>Worst</th>
                                            <th> ${score.worstSupplier}%</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style="margin-top: 49px; margin-left: 5%;">
                                    <h4>Description: </h4>
                                    <p style="text-align: justify;">${score.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            return card;
        }

        $(document).on("knack-form-submit.view_3573", async function (e, v, record) {
            lib.showSpinner();
            lib.removeMessages(v.key)
            let testUserA;
            try {
                testUserA = await getUserAttributesCustom(Knack.getUserAttributes().id);
            } catch (e) {
                alert("Network error, please try again!")
            }
            // console.log(testUserA)
            // const IDbuyerActual = Knack.user.attributes.values.field_1063[0]
            const IDbuyerActual = testUserA.field_1063_raw[0].id;

            let newRecord = {}
            newRecord["field_2130"] = record.field_2177;
            // const endDate = payload.record.field_2131;
            newRecord["field_2131"] = record.field_2178;
            // const supplier = payload.record.field_2132_raw[0];
            newRecord["field_2132_raw"] = [record.field_2179_raw[0]];

            // const Target1 = payload.record.field_2133;
            newRecord["field_2133"] = record.field_2180;
            // const Target2 = payload.record.field_2134;
            newRecord["field_2134"] = record.field_2181;
            // const Target3 = record.field_2135;
            newRecord["field_2135"] = record.field_2182;
            // const Target4 = record.field_2136;
            newRecord["field_2136"] = record.field_2183;
            // const Target5 = payload.record.field_2137;
            newRecord["field_2137"] = record.field_2184;
            // const Target6 = payload.record.field_2138;
            newRecord["field_2138"] = record.field_2185;

            let obj = {
                buyer: IDbuyerActual,
                record: newRecord,
                token: Knack.getUserToken()
            };
            console.log(obj)
            let scoreCardUrl = "https://scorecard.conexisvms.com/api/v1/";
            await $.ajax({
                type: "POST",
                //url: lib.CONEXIS_SERVER + "generateSupplierScorecard",
                url: scoreCardUrl + "generateSupplierScorecard",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(obj),
            })
                .then(function (response) {
                    // aca popular el template que pasen los front
                    if (response.status == "insufficient information") {
                        lib.showErrorMessage(v.key, response.message);
                        lib.hideSpinner();
                    } else if (response.status == "error") {
                        lib.showErrorMessage(v.key, response.message);
                        lib.hideSpinner();
                    } else {
                        $("#generatePDF").remove();
                        //console.log("success server response:")
                        //console.log(response)
                        $(".card-container").remove()
                        $(".scorecard-header-table-container").remove()
                        let html = $("<div>").addClass("card-container");

                        response.score1.comparisoncss = "";
                        response.score2.comparisoncss = "";
                        response.score3.comparisoncss = "";
                        response.score4.comparisoncss = "";
                        response.score5.comparisoncss = "";
                        response.score6.comparisoncss = "";

                        if (response.score1.target > response.score1.bestSupplier) {
                            response.score1["comparison"] = true;
                            response.score1.comparisoncss = "z-index:20;background-color: #FCFFDB;";
                        }
                        if (response.score2.target > response.score2.bestSupplier) {
                            response.score2["comparison"] = true;
                            response.score2.comparisoncss = "z-index:20;background-color: #FCFFDB;";
                        }
                        if (response.score3.target > response.score3.bestSupplier) {
                            response.score3["comparison"] = true;
                            response.score3.comparisoncss = "z-index:20;background-color: #FCFFDB;";
                        }
                        if (response.score4.target > response.score4.bestSupplier) {
                            response.score4["comparison"] = true;
                            response.score4.comparisoncss = "z-index:20;background-color: #FCFFDB;";
                        }
                        if (response.score5.target > response.score5.bestSupplier) {
                            response.score5["comparison"] = true;
                            response.score5.comparisoncss = "z-index:20;background-color: #FCFFDB;";
                        }
                        if (response.score6.target > response.score6.bestSupplier) {
                            response.score6["comparison"] = true;
                            response.score6.comparisoncss = "z-index:20;background-color: #FCFFDB;";
                        }

                        const excelFile = response.excelfile;
                        delete response.excelfile;
                        console.log(excelFile)
                        console.log("response after delete excel file: ", response)

                        for (const score in response) {
                            if (response[score].actualSupplier > 100) {
                                response[score].actualSupplier = 100
                            } else if (response[score].actualSupplier < 0) {
                                response[score].actualSupplier = 0
                            }

                            if (response[score].bestSupplier > 100) {
                                response[score].bestSupplier = 100
                            } else if (response[score].bestSupplier < 0) {
                                response[score].bestSupplier = 0
                            }

                            if (response[score].worstSupplier > 100) {
                                response[score].worstSupplier = 100
                            } else if (response[score].worstSupplier < 0) {
                                response[score].worstSupplier = 0
                            }

                            let maxNumber = Math.max(response[score].target, response[score].bestSupplier, response[score].worstSupplier);
                            let minNumber = Math.min(response[score].target, response[score].bestSupplier, response[score].worstSupplier);
                            response[score].targetcss = (response[score].target === maxNumber) ? 20 : (response[score].target === minNumber) ? 22 : 21;
                            response[score].bestSuppliercss = (response[score].bestSupplier === maxNumber) ? 20 : (response[score].bestSupplier === minNumber) ? 22 : 21;
                            response[score].worstSuppliercss = (response[score].worstSupplier === maxNumber) ? 20 : (response[score].worstSupplier === minNumber) ? 22 : 21;
                            if (response[score].targetcss == response[score].bestSuppliercss) {
                                response[score].targetcss = response[score].targetcss + 1;
                                if (response[score].targetcss == response[score].worstSuppliercss) {
                                    response[score].worstSuppliercss = response[score].worstSuppliercss + 1;
                                }
                            }


                            response[score].targetBackground = (response[score].worstSuppliercss <= response[score].targetcss) ? '#f6f6f600' : '#CAE8B3';
                            response[score].bestSupplierBackground = (response[score].worstSuppliercss <= response[score].bestSuppliercss) ? '#f6f6f600' : '#FCFFDB';
                            // console.log("score: ", response[score])

                            const card = GenerateHTMLcard(response[score]);
                            html.append(card)
                        }

                        const header =
                            `<div style="align-items: center; justify-content: center; width: 100%;" class="scorecard-header-table-container">
                                <div class="header-container">
                                <table class="scorecard-header-table">
                                    <tbody>
                                        <tr>
                                            <td style="text-align: right; padding-right: 5%;">
                                                <img src="https://conexisvms.com/images/Conexis.png"
                                                    alt="Conexis VMS" style="border: 0">
                                            </td>
                                            <td>Conexis 
                                                <p>
                                                    <b>Supplier Score Card
                                                        <p>${record.field_2179_raw[0].identifier}</p>
                                                    </b>
                                                </p>
                                            </td>
                                            <td>Start Date
                                                <p>
                                                    <b>${record.field_2177}</b>
                                                </p>
                                            </td>
                                            <td>End Date
                                                <p>
                                                    <b>${record.field_2178}</b>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>    
                            </div>`;

                        $("body").append(header)
                        $("body").append(html)

                        for (let i = 0; i < 6; i++) {
                            const score = `score${i + 1}`;
                            const actualContainer = $(".containerScoreCard")[i]
                            const actualscore = $(".traffic.traffic__score")[i];
                            const supplierScore = response[score].actualSupplier;
                            const leftStyle = supplierScore - Math.round(actualscore.offsetWidth / actualContainer.offsetWidth * 100) / 2
                            actualscore.style = `left:${leftStyle}%`
                        }
                        $(`.scorecard-header-table-container`).append(`<div id="generatePDF" class="custom_btn kn-button" style="margin-left: 43px; margin-top: 43px;"> Download PDF </div>`);
                        $(`.scorecard-header-table-container`).append(`<div id="generatePDF" class="custom_btn kn-button" style="margin-left: 2%; margin-top: 43px;">
                                                                            <a href=${excelFile.file.public_url} target="_blank" style="color: inherit;text-decoration: none;">
                                                                            Download Excel File</a>
                                                                            </div>`)
                        lib.removeMessages(v.key)
                        lib.hideSpinner();
                        lib.showSuccessMessage(v.key, "Report Generated")

                        response.score1.actualSupplierFront = response.score1.actualSupplier - 7;
                        response.score2.actualSupplierFront = response.score2.actualSupplier - 7;
                        response.score3.actualSupplierFront = response.score3.actualSupplier - 7;
                        response.score4.actualSupplierFront = response.score4.actualSupplier - 7;
                        response.score5.actualSupplierFront = response.score5.actualSupplier - 7;
                        response.score6.actualSupplierFront = response.score6.actualSupplier - 7;

                        const data = {
                            scores: response,
                            supplierName: record.field_2179_raw[0].identifier,
                            startDate: record.field_2177,
                            endDate: record.field_2178
                        }
                        let final_data = {
                            test: 'false',
                            body_json: data
                        }
                        let filename = "Supplier_scorecard";
                        let url_mergeit = "https://server.mergeit.co/api/v1/315/7BfvA";

                        //if (Knack.getUserAttributes().email=="developers@example.com") {
                        //  url_mergeit = "https://test.mergeit.co/api/v1/332/aMHHj";
                        //}
                        try {

                            $("#generatePDF").click(async function () {
                                console.log(final_data)
                                lib.showSpinner();
                                console.log("generate pdf button clicked")
                                let response = await lib.generatePDFile(final_data, filename, url_mergeit);
                                console.log(response)

                                lib.noSaveDownloadBlobFile(response.blob, response.filename);
                                lib.hideSpinner();
                            });
                        } catch (e) {
                            lib.removeMessages(v.key)
                            lib.showErrorMessage(v.key, "Error Generating PDF, try again later")
                            console.log("error generating pdf: ", e);
                        }
                    }
                })
                .fail(function (err) {
                    $("#view_3573" + " .kn-form-confirmation" + " .kn-message.success").hide()
                    $("#view_3573" + " .kn-form-confirmation").prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Error connecting to server, try again later!")))
                            )
                    );
                })

        });
        $(document).on('knack-scene-render.any', function (event, scene) {
            $(".scorecard-header-table-container").remove();
            $(".card-container").remove();
        });
        // TRS scorecard finish
        // Grey out when processing invoices 
        $(document).on("knack-scene-render.scene_665", function (event, scene) {
            if (document.querySelector(".kn-notification.is-warning")) {
                for (const view in Knack.views) {
                    disabledViews(view, "inprocess");
                }
            }
        });

        $(document).on("knack-scene-render.scene_674", function (event, scene) {
            if (document.querySelector(".kn-notification.is-warning")) {
                for (const view in Knack.views) {
                    disabledViews(view, "inprocess");
                }
            }
        });
        $(document).on("knack-scene-render.scene_496", async function (event, scene) {
            try {
                const status = await Knack.models.view_3579.attributes;
                //console.log(status);
                $('#view_3579 section').hide();
                if (status.field_89_raw[0].identifier == "Intelcom Courier Canada") {
                    if (status.field_100 != "Filled") {
                        $('#view_811 .kn-details-link').show();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });

        // Ad hoc report 
        // ad hoc report implementation 
        const filterOptionSelectChange = (optionsSelect, fieldDataType, multipleChoice) => {
            const currentFilterSelection = optionsSelect.options[optionsSelect.selectedIndex].getAttribute("value");
            const finalFilterInputdiv = optionsSelect.parentNode.nextElementSibling
            finalFilterInputdiv.classList.add("kn-filter-value");
            console.log("final filter input field: ", finalFilterInputdiv)

            if (currentFilterSelection == "is any" || currentFilterSelection == "is blank" || currentFilterSelection == "is not blank") {
                finalFilterInputdiv.style.display = "none"
            } else {
                finalFilterInputdiv.style.display = "block"
            }

            const InputTextDataTypes = ["short_text", "paragraph_text", "rich_text", "concatenation", "number", "address", "phone", "rating",
                "currency", "equation_numeric", "auto_increment", "sum", "min", "max", "average", "count", "name", "email", "password"];
            const InputDateDataTypes = ["equation_date", "date_time"];

            if (fieldDataType == "multiple_choice") {
                finalFilterInputdiv.classList.remove("kn-filter-value");
                multipleChoice = JSON.parse(multipleChoice);
                // console.log("children: ", finalFilterInputdiv.children[0])
                if (finalFilterInputdiv.children[0]) {
                    finalFilterInputdiv.removeChild(finalFilterInputdiv.children[0]);
                }

                const multipleChoiceSelect = document.createElement("select");
                multipleChoiceSelect.setAttribute("name", "value");
                for (let choice of multipleChoice) {
                    const choiceOptionSelector = document.createElement("option");
                    choiceOptionSelector.setAttribute("value", choice);
                    choiceOptionSelector.innerText = choice;
                    multipleChoiceSelect.append(choiceOptionSelector);
                }
                finalFilterInputdiv.append(multipleChoiceSelect);
            } else if (InputTextDataTypes.includes(fieldDataType)) {
                // input id text
                console.log("inside type string - number final input")
                if (finalFilterInputdiv.children[0]) {
                    finalFilterInputdiv.removeChild(finalFilterInputdiv.children[0]);
                }
                const inputOption = document.createElement("input");
                inputOption.setAttribute("class", "input");
                inputOption.setAttribute("type", "text");
                inputOption.setAttribute("name", "value");
                finalFilterInputdiv.append(inputOption);
            } else if (InputDateDataTypes.includes(fieldDataType)) {
                console.log("inside type date final input");
                const textInputFilters = ["is", "is not", "is before", "is after"];
                const noAdditionalInput = ["is before current time", "is after current time", "is today", "is today or before",
                    "is today or after", "is before today", "is after today", "is not blank", "is blank"];

                if (textInputFilters.includes(currentFilterSelection)) {
                    finalFilterInputdiv.style.display = "block"
                    if (finalFilterInputdiv.children[0]) {
                        finalFilterInputdiv.removeChild(finalFilterInputdiv.children[0]);
                    }
                    const dateOption = document.createElement("input");
                    dateOption.setAttribute("name", "date");
                    dateOption.setAttribute("type", "text");
                    dateOption.classList.add("input");

                    finalFilterInputdiv.append(dateOption);
                    $(dateOption).datepicker();
                } else if (noAdditionalInput.includes(currentFilterSelection)) {

                    if (finalFilterInputdiv.children[0]) {
                        finalFilterInputdiv.removeChild(finalFilterInputdiv.children[0]);
                    }
                    finalFilterInputdiv.style.display = "none"

                } else if (currentFilterSelection == "is during the current") {
                    finalFilterInputdiv.style.display = "block"
                    if (finalFilterInputdiv.children[0]) {
                        finalFilterInputdiv.removeChild(finalFilterInputdiv.children[0]);
                    }
                    const knSelectSpan = document.createElement("span");
                    knSelectSpan.classList.add("kn-filter-extra", "kn-select");
                    const selector = document.createElement("select");
                    selector.setAttribute("name", "type");
                    const timeOptions = ["week", "month", "quarter", "year"];
                    for (let option of timeOptions) {
                        const timeOptionElement = document.createElement("option");
                        timeOptionElement.setAttribute("value", option);
                        timeOptionElement.innerText = option;
                        selector.append(timeOptionElement);
                    }
                    knSelectSpan.append(selector);
                    finalFilterInputdiv.append(knSelectSpan);
                } else {
                    finalFilterInputdiv.style.display = "block"
                    if (finalFilterInputdiv.children[0]) {
                        finalFilterInputdiv.removeChild(finalFilterInputdiv.children[0]);
                    }
                    const typeOptions = ["days", "weeks", "months", "years", "rolling years"];
                    const knSelectSpan = document.createElement("span");
                    knSelectSpan.classList.add("kn-filter-extra", "kn-select");
                    const rangeSelector = document.createElement("select");
                    rangeSelector.setAttribute("name", "range");
                    const typeSelector = document.createElement("select");
                    typeSelector.setAttribute("name", "type");
                    for (let i = 1; i < 32; i++) {
                        const rangeOption = document.createElement("option");
                        rangeOption.innerText = i;
                        rangeSelector.append(rangeOption);
                    }
                    for (let typeOption of typeOptions) {
                        const typeOptionElement = document.createElement("option");
                        typeOptionElement.setAttribute("value", typeOption);
                        typeOptionElement.innerText = typeOption;
                        typeSelector.append(typeOptionElement);
                    }

                    knSelectSpan.append(rangeSelector);
                    knSelectSpan.append(typeSelector);
                    finalFilterInputdiv.append(knSelectSpan);

                }

            } else if (fieldDataType == "boolean") {
                console.log("boolean field");
                if (finalFilterInputdiv.children[0]) {
                    finalFilterInputdiv.removeChild(finalFilterInputdiv.children[0]);
                }
                const multipleChoiceSelect = document.createElement("select");
                multipleChoiceSelect.setAttribute("name", "value");
                const booleanOptions = [
                    { value: true, text: "Yes" },
                    { value: false, text: "No" },
                ];
                for (let choice of booleanOptions) {
                    const choiceOptionSelector = document.createElement("option");
                    choiceOptionSelector.setAttribute("value", choice.value);
                    choiceOptionSelector.innerText = choice.text;
                    multipleChoiceSelect.append(choiceOptionSelector);
                }
                finalFilterInputdiv.append(multipleChoiceSelect);
            } else if (fieldDataType == "user_roles") {
                console.log("user_roles field");
                if (finalFilterInputdiv.children[0]) {
                    finalFilterInputdiv.removeChild(finalFilterInputdiv.children[0]);
                }
                const userRolesSelect = document.createElement("select");
                userRolesSelect.setAttribute("name", "value");
                const UserRolesOptions = [
                    { value: "profile_40", text: "MSP Admin" },
                    { value: "profile_36", text: "MSP-Finance" },
                    { value: "profile_29", text: "MSP-Approver" },
                    { value: "profile_24", text: "Buyer Admin" },
                    { value: "profile_20", text: "Requester" },
                    { value: "profile_21", text: "Approver" },
                    { value: "profile_22", text: "Buyer-Finance" },
                    { value: "profile_13", text: "Supplier Admin" },
                    { value: "profile_39", text: "Supplier-Finance" },
                    { value: "profile_23", text: "Proposer" },
                    { value: "profile_30", text: "Worker" },
                    { value: "profile_48", text: "Developer" },
                    { value: "profile_53", text: "MMS" },
                    { value: "profile_14", text: "Client Manager" },
                ];
                for (let choice of UserRolesOptions) {
                    const choiceOptionSelector = document.createElement("option");
                    choiceOptionSelector.setAttribute("value", choice.value);
                    choiceOptionSelector.innerText = choice.text;
                    userRolesSelect.append(choiceOptionSelector);
                }
                finalFilterInputdiv.append(userRolesSelect);
            }

        };
        const fieldOptionChange = (SelectList, objectsIdentifiers) => {
            const actualSelection = SelectList.options[SelectList.selectedIndex];

            SelectList.parentNode.nextElementSibling.innerHTML = ""

            const optionalSelect = document.createElement("select");
            optionalSelect.classList.add("operator", "kn-select");
            optionalSelect.setAttribute("name", "operator")
            SelectList.parentNode.nextElementSibling.append(optionalSelect)
            SelectList.parentNode.nextElementSibling.classList.add("kn-select")
            // const filterOtionsSelect = SelectList.parentNode.nextElementSibling.children[0];
            const filterOtionsSelect = optionalSelect;
            // filterOtionsSelect.parentNode.classList.add("kn-select");
            // filterOtionsSelect.style.display = "block"
            filterOtionsSelect.innerHTML = ""
            let dataType = actualSelection.getAttribute('data-fieldtype');
            let multipleChoiceOptions;
            if (dataType == "equation") {
                const equationType = actualSelection.getAttribute('data-equation');
                if (equationType == "numeric") {
                    dataType = "equation_numeric";
                } else if (equationType == "date") {
                    dataType = "equation_date";
                }
            } else if (dataType == "multiple_choice") {
                multipleChoiceOptions = actualSelection.getAttribute("data-options");
            }
            const options = FilterTypeObject[dataType];

            if (dataType != "connection") {
                for (let option of options) {
                    const optionElement = document.createElement("option");
                    optionElement.value = option;
                    optionElement.innerText = option;
                    filterOtionsSelect.append(optionElement)
                }
                filterOptionSelectChange(filterOtionsSelect, dataType, multipleChoiceOptions)

                $(filterOtionsSelect).unbind()
                $(filterOtionsSelect).change(function () {
                    filterOptionSelectChange(filterOtionsSelect, dataType, multipleChoiceOptions)
                });
            } else {
                // filterOtionsSelect.style.display = "none"

                // const operatorSpan = filterOtionsSelect.parentNode;
                const operatorSpan = SelectList.parentNode.nextElementSibling;
                // operatorSpan.children[0].style.display = "none"
                operatorSpan.classList.remove("kn-select");
                operatorSpan.style.display = "flex"
                operatorSpan.innerHTML = "";
                // operatorSpan.removeChild(operatorSpan.lastChild);

                const preFilterInput = document.createElement("input")
                preFilterInput.classList.add("input");
                preFilterInput.setAttribute("type", "text");
                preFilterInput.setAttribute("placeholder", "type keyword to search")
                operatorSpan.append(preFilterInput)

                const searchButton = document.createElement("a");
                // searchButton.setAttribute("id", "search-options-button");
                searchButton.classList.add("kn-button", "search-options-button");
                const spanIcon = document.createElement("span");
                spanIcon.classList.add("icon", "is-small");
                const iTagIcon = document.createElement("i");
                iTagIcon.classList.add("fa", "fa-search");
                spanIcon.append(iTagIcon);
                searchButton.append(spanIcon);
                operatorSpan.append(searchButton);
                searchButton.style.marginLeft = "1%";

                nextSpanValue = operatorSpan.nextElementSibling;
                nextSpanValue.style.display = "block"
                nextSpanValue.innerHTML = "";

                const spanExtra = document.createElement("span");
                spanExtra.classList.add("kn-filter-extra", "kn-select")

                const optionsFiltersDropdown = document.createElement("select");
                const resultsFiltersDropdown = document.createElement("select");

                optionsFiltersDropdown.classList.add("operator", "kn-select", "dropdownArrow");
                // optionsFiltersDropdown.id = "testID"
                optionsFiltersDropdown.setAttribute("name", "operator");
                // optionsFiltersDropdown.setAttribute("id", "dropdownArrow")
                resultsFiltersDropdown.setAttribute("name", "value");

                //test
                const testDiv = document.createElement("div");
                testDiv.classList.add("kn-select")
                testDiv.append(optionsFiltersDropdown)

                spanExtra.append(testDiv); // test
                // spanExtra.append(optionsFiltersDropdown); // test
                spanExtra.append(resultsFiltersDropdown);


                nextSpanValue.append(spanExtra);

                for (let option of options) {
                    const optionElement = document.createElement("option");
                    optionElement.value = option;
                    optionElement.innerText = option;
                    optionsFiltersDropdown.append(optionElement)
                }

                // $(optionsFiltersDropdown).unbind()
                optionsFiltersDropdown.addEventListener("change", function () {
                    console.log("change new")
                    // filterOptionSelectChange(optionsFiltersDropdown, dataType, multipleChoiceOptions)
                    const optionsCoonectionDrop = optionsFiltersDropdown.parentNode.parentNode.lastElementChild; // test 
                    const currentSelectionValue = optionsFiltersDropdown.options[optionsFiltersDropdown.selectedIndex].getAttribute("value")
                    console.log("current selection value: ", currentSelectionValue);
                    if (currentSelectionValue == "is any" || currentSelectionValue == "is blank" || currentSelectionValue == "is not blank") {
                        optionsCoonectionDrop.style.display = "none"
                        searchButton.style.pointerEvents = "none"
                        resultsFiltersDropdown.innerHTML = ""
                        resultsFiltersDropdown.parentNode.classList.remove("kn-select")
                    } else {
                        optionsCoonectionDrop.style.display = "block"
                        searchButton.style.pointerEvents = "auto"
                        resultsFiltersDropdown.parentNode.classList.add("kn-select")
                    }
                });

                searchButton.addEventListener("click", async function (e) {
                    // $("#search-options-button").click(async function (e) {
                    e.preventDefault();
                    console.log("actual selection click: ", actualSelection)
                    const connectedObject = actualSelection.getAttribute("connectedto");
                    // console.log("connected to:", connectedObject);
                    // console.log("field of connected:", objectsIdentifiers[connectedObject])
                    const fieldObjectIdentifier = objectsIdentifiers[connectedObject];
                    // console.log("pre filter input val: ", preFilterInput.value)
                    if (!preFilterInput.value) {
                        alert("Please type a keyword to search!")
                        return
                    }
                    try {
                        lib.showSpinner();
                        let recordData = await lib.find(connectedObject, [
                            { field: fieldObjectIdentifier, operator: "contains", value: preFilterInput.value },
                        ]);
                        resultsFiltersDropdown.innerHTML = ""
                        // console.log("record Data: ", recordData)
                        const optionsFound = recordData.records
                        if (optionsFound.length == 0) {
                            alert("no matching records found. Please search again!");
                            lib.hideSpinner();
                            return
                        }
                        for (let option of optionsFound) {
                            const optionElement = document.createElement("option");
                            optionElement.setAttribute("value", option.id);
                            optionElement.innerText = option[fieldObjectIdentifier]
                            resultsFiltersDropdown.append(optionElement)
                        }
                        lib.hideSpinner();
                    } catch (e) {
                        alert("error getting options please try again")
                        lib.hideSpinner();
                    }
                });

            }
        };
        const createFieldDropdown = (options, SelectList, arrayFiltersFields) => {
            for (let option of options) {
                const values = option.type == "multiple_choice" ? JSON.stringify(option.format.options) : "";
                let equationType = option.type == "equation" ? option.format.equation_type : "";
                const equationDateResult = equationType == "date" ? option.format.date_result : "";
                const connectedto = option.type == "connection" ? option.relationship.object : ""

                if (equationDateResult == "number") {
                    equationType = "numeric"
                }

                if (arrayFiltersFields.includes(option.key)) {

                    let currentOption = `<option value="${option.key}" data-fieldType="${option.type}" 
                        data-equation="${equationType}" data-options='${values}' connectedto='${connectedto}'>${option.name}</option>`;
                    SelectList.append(currentOption);
                }
            }
        };
        const createFilterElement = (appendToElement, options, objectsIdentifiers, arrayFiltersFields) => {
            const ElementHtml = `
                <li class="kn-filter-item">
            
                    <span class="field kn-select">
                        <select class="field select" name="field">
                            
                        </select>
                    </span>
        
                    <span class="operator kn-select">
                        <select class="operator kn-select" name="operator">
                     
                        </select>
                    </span>
        
                    <span class="kn-filter-value kn-select value">
                        <input class="input" name="value" type="text">
                    </span>
        
                    <a class="remove-filter-link kn-filter-remove" title="Remove this filter">
                        <span class="icon is-small">
                            <i class="fa fa-minus-circle"></i>
                        </span>
                        <span class="kn-remove-filter-text">
                            Remove
                        </span>
                    </a>
                </li>`;

            appendToElement.append(ElementHtml);
            const SelectList = appendToElement.find("select.field").last();
            SelectList.unbind();
            // SelectList.change({ fieldsDropdown: $(this) }, fieldOptionChange);
            SelectList.change(function () {
                fieldOptionChange(this, objectsIdentifiers)
            });

            if (options) {
                createFieldDropdown(options, SelectList, arrayFiltersFields)

                fieldOptionChange(SelectList[0], objectsIdentifiers)

            }
            // add new filter
            appendToElement.find(".remove-filter-link.kn-filter-remove").unbind()
            appendToElement.find(".remove-filter-link.kn-filter-remove").click(function () {
                // console.log("click this: ", this.parentNode.parentNode.children.length)
                if (this.parentNode.parentNode.children.length != 1) {
                    const completeList = this.parentNode.parentNode;
                    const filterItem = this.parentNode;
                    completeList.removeChild(filterItem);
                }
            });
        };

        const changeFilterElement = (SelectList, options, objectsIdentifiers, arrayFiltersFields) => {
            SelectList.html("");
            if (options) {
                createFieldDropdown(options, SelectList, arrayFiltersFields)

                fieldOptionChange(SelectList[0], objectsIdentifiers)
            }
        };

        $(document).on('knack-scene-render.scene_1413', async function (event, scene) {
            lib.showSpinner();
            let appData = {}
            try {
                appData = await $.ajax({
                    type: 'GET',
                    url: 'https://api.knack.com/v1/applications/583da0c358256f6a2ee5887d',
                });
                //console.log(appData)
            } catch (e) {
                console.log("error getting data :", e)
            }

            const objectsIdentifiers = {};

            for (let object of appData.application.objects) {
                objectsIdentifiers[object.key] = object.identifier;
            }

            // console.log("identifiers: ", objectsIdentifiers)

            const selectElementObjects = `
                <div class="view-group view-group-2">
                    <div class="view-column view-column-group-2">
                        <div class ="kn-view kn-form" >
                            <form class="kn-form" name="valform" action="" method="POST">
                                <label for="Objects" class="label kn-label"><span>Select an Object</span> <span class="kn-required">*</span></label>
                                <span class="field kn-select" name="objects" id="objects-select" style="margin-bottom: 2%;">
                                    <select class="field select" name="objects" id="objectOptions">
                                        <option value="">Select</option>
                                    </select>
                                </span>
                             
                                <label for="display" class="label kn-label"><span>Select Fields to display</span> <span class="kn-required">*</span></label>
                                <span class="field kn-select" name="display" id="fieldsOptions1" style="margin-bottom: 2%;">
                                    <select class="chzn-select" name="objects" id="fieldsOptions" multiple>
                                        <option value="">Select</option>
                                    </select>
                                </span>

                                <label class="label kn-label"><span>Add Filters</span> </label>
                                <div id="kn-filters-form" class="kn-modal-wrapper kn-view kn-scene">
                                    <ul class="filters-list">
                                    </ul>

                                    <a id="add-filter-link" class="kn-button">
                                        <span class="icon is-small"><i class="fa fa-plus-circle"></i></span>
                                        <span>Add filter</span>
                                    </a>

                                </div>

                                <div>
                                    <input id="kn-submit-filters" type="submit" class="kn-button is-primary is-medium" value="Generate Report">
                                </div>                                

                            </form>
                        </div>    
                    </div>                   
                </div>`;

            $(`#kn-${scene.key} .view-group-1`).after(selectElementObjects);


            const dropdownObjects = $("#objects-select select");
            const dropdownFields = $("#fieldsOptions");
            for (let object of appData.application.objects) {
                if (objectListToShow.includes(object.key)) {
                    let currentOption = `<option value="${object.key}" identifier=${object.identifier}>${object.name}</option>`
                    dropdownObjects.append(currentOption);
                }
            }
            dropdownObjects.chosen();
            dropdownFields.chosen();

            // from buyer dashboard
            let arrayFiltersFields = selectedFilterFields.slice();
            let arrayDisplayFields = selectdDisplayFields.slice();
            const buyerID = Knack.views.view_3689.record.id ? Knack.views.view_3689.record.id : "";
            let fromBuyerdashboard = false
            console.log("buyer id: ", buyerID)
            const urls = Knack.hash_parts;
            if (!urls.includes('msp-admin-dashboard')) {
                console.log("from buyer dashboard")
                fromBuyerdashboard = true
                // remove buyer fields from selectable array
                for (let element in objbuyerfieldInObjects) {
                    removeElementFromArray(arrayFiltersFields, objbuyerfieldInObjects[element])
                    removeElementFromArray(arrayDisplayFields, objbuyerfieldInObjects[element])
                }
                arrayFiltersFields.push("field_252")//add Cost center number
                arrayFiltersFields.push("field_1628")//add GL code

                removeElementFromArray(arrayDisplayFields, "field_801") // remove msp $ fee contract
                removeElementFromArray(arrayDisplayFields, "field_802") // remove msp % fee contract
                removeElementFromArray(arrayDisplayFields, "field_1106") // remove msp $ fee contract amendment
                removeElementFromArray(arrayDisplayFields, "field_1107") // remove msp % fee contract amendment
                removeElementFromArray(arrayDisplayFields, "field_1439") // remove msp Tax Rate Final EQ contract

            }

            lib.hideSpinner();

            // const initialFieldList = $("#kn-filters-form select.field");
            const filterList = $("#kn-filters-form .filters-list");
            createFilterElement(filterList, null, objectsIdentifiers, arrayFiltersFields)


            dropdownObjects.change(() => {
                //console.log(`object selector changed, current selected object:  ${dropdownObjects.find(":selected").text()} con value ${dropdownObjects.find(":selected").attr("value")}`)

                dropdownFields.html("");
                const dropdownList = dropdownFields.siblings().find(".chzn-results");
                dropdownList.html("")
                const objectValue = dropdownObjects.find(":selected").attr("value");
                const currentObject = appData.application.objects.filter(object => object.key == objectValue);
                //console.log("current object: ", currentObject)

                let nbu = 0;
                for (let field of currentObject[0].fields) {
                    if (arrayDisplayFields.includes(field.key)) {
                        let currentOption = `<option value="${field.key}">${field.name}</option>`
                        dropdownFields.append(currentOption);

                        dropdownList.append(
                            `<li id="kn_conn_field_1571_chzn_o_${nbu}" class="active-result" style="">${field.name}</li>`
                        );
                        nbu++;
                    }
                }
                dropdownFields.trigger("liszt:updated");

                filterList.find(".kn-filter-item").not(':first').remove();
                changeFilterElement(filterList.find("select.field").last(), currentObject[0].fields, objectsIdentifiers, arrayFiltersFields)

                $("#add-filter-link").unbind();
                $("#add-filter-link").click(function () {
                    createFilterElement(filterList, currentObject[0].fields, objectsIdentifiers, arrayFiltersFields)
                });

            });

            $("#kn-submit-filters").click(function (e) {
                e.preventDefault();
                console.log("submit Button clicked");
                adHocSubmitButtonclick(objectsIdentifiers, scene.key, fromBuyerdashboard, buyerID);
            });
        });

        const removeElementFromArray = (array, element) => {
            const index = array.indexOf(element);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        const adHocSubmitButtonclick = async (objectsIdentifiers, scene, fromBuyerdashboard, buyerID) => {

            $("#custom-errors-msg-adhoc").remove();

            const objectInput = document.getElementById("objectOptions");
            const displayFields = $("#fieldsOptions").val();

            const displayOptionsSelectedHeaders = {}
            const displayOptionsSelected = $("#fieldsOptions option:selected");
            for (let i = 0; i < displayOptionsSelected.length; i++) {
                displayOptionsSelectedHeaders[displayOptionsSelected[i].value] = displayOptionsSelected[i].innerText;
            }
            console.log("headers options displays fields objects: ", displayOptionsSelectedHeaders)

            const objectInputSelection = objectInput.options[objectInput.selectedIndex];
            //console.log("object selection: ", objectInputSelection);
            if (!objectInputSelection.value) {
                alert("You must Select an object to run the Report");
                return
            }

            if (!displayFields) {
                alert("You must add at least one column to be displayed");
                return
            }

            // if (!$('.kn-filter-value [name="value"]').val()) {
            //     alert("You must add at least one filter to generate the report!");
            //     return
            // }

            $("#kn-submit-filters").parent().prepend(
                $("<div>")
                    .attr("id", "custom-errors-msg-adhoc")
                    .addClass("kn-message success")
                    .append(
                        $("<span>")
                            .addClass("kn-message-body")
                            .append($("<p>").append($("<strong>").html("Generating Ad Hoc Report, this could take up to 10 minutes please wait! Please bear in mind that the report will bring up to the last 5000 records")))
                    )
            );

            const currentObjectValue = objectInputSelection.value;
            // const currentObjectidentifier = objectInputSelection.getAttribute("identifier");

            const filterListFields = document.querySelector("#kn-filters-form .filters-list").children;
            //console.log("current filter list: ", filterListFields);

            const payload = {
                connections: [],
                filters: []
            }

            for (let filter of filterListFields) {
                const fieldFilterOptions = filter.querySelectorAll('span.kn-select');
                const currentFilter = {};
                const currentConnection = {};
                const fieldSelector = fieldFilterOptions[0].children[0];
                // console.log("field Selector: ", fieldSelector)
                const fieldSelectorOptionSelected = fieldSelector.options[fieldSelector.selectedIndex];
                // console.log("field option selected: ", fieldSelectorOptionSelected)
                if (fieldSelectorOptionSelected.getAttribute("data-fieldtype") == "connection") {
                    //console.log("connection field Selected")
                    currentConnection["filter"] = {};
                    currentConnection["objectId"] = fieldSelectorOptionSelected.getAttribute("connectedto");
                    currentConnection["displayField"] = objectsIdentifiers[currentConnection.objectId];
                    for (let specificOption of fieldFilterOptions) {
                        const spanChildren = specificOption.children
                        if (spanChildren.length > 0) {

                            if (spanChildren[0].querySelectorAll("select").length == 0) {

                                const objectName = spanChildren[0].getAttribute("name");
                                const currentSelection = spanChildren[0].options ? spanChildren[0].options[spanChildren[0].selectedIndex] : spanChildren[0];

                                currentConnection.filter[objectName] = currentSelection.value

                            } else {

                                for (let selector of spanChildren[0].querySelectorAll("select")) {
                                    const objectName = selector.getAttribute("name");
                                    const currentSelection = selector.options[selector.selectedIndex];
                                    currentConnection.filter[objectName] = currentSelection ? currentSelection.value : ""
                                }
                            }

                        }

                    }
                    payload.filters.push(currentConnection.filter)
                    payload.connections.push(currentConnection)

                } else {
                    for (let specificOption of fieldFilterOptions) {
                        const spanChildren = specificOption.children
                        if (spanChildren.length > 0) {

                            if (spanChildren[0].querySelectorAll("select").length == 0) {
                                // const inputObject = spanChildren[0];
                                const objectName = spanChildren[0].getAttribute("name");
                                const currentSelection = spanChildren[0].options ? spanChildren[0].options[spanChildren[0].selectedIndex] : spanChildren[0];

                                currentFilter[objectName] = currentSelection.value

                            } else {
                                // console.log("children extra: ", spanChildren[0].querySelectorAll(".kn-filter-extra"))
                                for (let selector of spanChildren[0].querySelectorAll("select")) {
                                    const objectName = selector.getAttribute("name");
                                    const currentSelection = selector.options[selector.selectedIndex];
                                    currentFilter[objectName] = currentSelection.value
                                }
                            }
                            //}
                        }

                    }
                    payload.filters.push(currentFilter)
                }
            }

            // if from buyer dashboard -> add logged in buyer filters
            if (fromBuyerdashboard) {
                const filterByBuyer = {
                    field: objbuyerfieldInObjects[currentObjectValue],
                    operator: "is",
                    value: buyerID
                };
                payload.filters.push(filterByBuyer)
            }

            payload["mainObject"] = currentObjectValue;
            payload["displayFields"] = displayFields;
            payload.token = Knack.getUserToken();
            payload.tableHeaders = displayOptionsSelectedHeaders;
            console.log("payload: ", payload)

            let response;
            // async function callNode() {
            //     const response1 = await $.ajax({
            //         type: "POST",
            //         url: lib.CONEXIS_SERVER + "generateAdHoc",
            //         // url: ngrokURL + "generateAdHoc",
            //         contentType: "application/json",
            //         dataType: "json",
            //         data: JSON.stringify(payload),
            //     });
            //     if (response1 == "test") {
            //         callNode();
            //     } else {
            //         return response1
            //     }
            // }

            const promiseFunc = (id, dfd) => {
                dfd = dfd || $.Deferred();
                lib.refreshView("view_3581", () => { //change prod
                    let dataTable = Knack.models["view_3581"].data.models.map(r => { //change prod
                        return r.toJSON();
                    }).find(r => {
                        return r.id == id;
                        // return true
                    });

                    if (dataTable.field_2168 == "complete") { //change prod
                        console.log("resolving promise")
                        dfd.resolve(dataTable);
                    } else {
                        console.log("inside else")
                        setTimeout(() => {
                            promiseFunc(id, dfd)
                        }, 5000);

                    }
                });
                return dfd.promise();
            };

            try {
                //let ngrokURL = "https://conexis.soluntech.com/api/v1/";
                lib.showSpinner();
                // response = await callNode();
                let responseServer = await $.ajax({
                    type: "POST",
                    url: lib.CONEXIS_SERVER + "generateAdHoc",
                    //url: ngrokURL + "generateAdHoc",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(payload),
                });
                // let responsePromiseFunc = await promiseFunc(responseServer.id);

                // response = JSON.parse(responsePromiseFunc.field_2169); // change prod
                response = responseServer
                console.log("response: ", response);

            } catch (e) {
                $("#custom-errors-msg-adhoc").remove();
                console.log("error connecting to server: ", e);
                $("#kn-submit-filters").parent().prepend(
                    $("<div>")
                        .attr("id", "custom-errors-msg-adhoc")
                        .addClass("kn-message is-error")
                        .append(
                            $("<span>")
                                .addClass("kn-message-body")
                                .append($("<p>").append($("<strong>").html("Error Connecting to the server, Please try again!")))
                        )
                );
                lib.hideSpinner();
                return
            }
            // if (!response) {
            //     console.log("waiting response")
            //     return
            // }
            const table = `
                <div class ="kn-view kn-table" id="adhocTableMainDiv">
                    <div class ="kn-table-wrapper">
                        <table class="kn-table kn-table-table knTable is-bordered is-striped knTable--borders knTable--spacing-medium knTable--striped" id="adhocTable">

                        </table>
                    </div>    
                </div>
                `
            $("#adhocTableMainDiv").remove();
            $(`#kn-${scene} .view-group-2`).after(table);
            $("#adhocTableMainDiv").prepend(`<div id="generateCSV" class="custom_btn kn-button" style="margin-left: 2%; margin-top: 43px;">
                <a href=${response.csvFile.file.public_url} target="_blank" style="color: inherit;text-decoration: none;">
                Download CSV File</a>
                </div>`);

            const adhocTable = document.getElementById("adhocTable");

            const tHead = document.createElement("thead");
            const trtableHead = document.createElement("tr");
            for (let header of displayFields) {
                const columnHeader = document.createElement("th");
                columnHeader.classList.add(header);
                columnHeader.innerHTML = displayOptionsSelectedHeaders[header]
                trtableHead.append(columnHeader)
            }
            tHead.append(trtableHead);

            const tBody = document.createElement("tbody");
            if (response.records.length == 0) {
                console.log("no records found")
                const trNoData = document.createElement("tr");
                trNoData.classList.add("kn-tr-nodata");
                const tdNoData = document.createElement("td");
                tdNoData.classList.add("kn-td-nodata");
                tdNoData.setAttribute("colspan", displayFields.length);
                tdNoData.innerText = "No Data found that match all the selected filters";

                trNoData.append(tdNoData);
                tBody.append(trNoData);
            } else {
                for (let record of response.records) {
                    const tableRow = document.createElement("tr");
                    for (let field of displayFields) {
                        const tableColumn = document.createElement("td")
                        tableColumn.innerHTML = record[field]
                        tableRow.append(tableColumn)
                    }
                    tBody.append(tableRow)
                }
            }

            adhocTable.append(tHead);
            adhocTable.append(tBody);


            if (response.records.length == 0) {
                lib.hideSpinner();
                return
            }
            $('#adhocTable').DataTable({
                "order": [],
                "lengthMenu": [10, 25, 50, 75, 100, 1000]
            });

            adhocTable.style.margin = "10px 0 10px 0";

            document.querySelector("#adhocTable_filter label").style.display = "inline-flex";
            const filterInputTable = document.querySelector("#adhocTable_filter input");
            document.querySelector("#adhocTable_filter label").innerText = "";
            filterInputTable.classList.add("input");
            // filterInputTable.innerText = "";
            filterInputTable.setAttribute("placeholder", "Type to search");

            const previousButton = document.getElementById("adhocTable_previous");
            const nextButton = document.getElementById("adhocTable_next");

            previousButton.classList.add("kn-button");
            nextButton.classList.add("kn-button");

            document.querySelector("#adhocTable_paginate span").style.display = "none"

            $("#custom-errors-msg-adhoc").remove();

            $("#kn-submit-filters").parent().prepend(
                $("<div>")
                    .attr("id", "custom-errors-msg-adhoc")
                    .addClass("kn-message succes")
                    .append(
                        $("<span>")
                            .addClass("kn-message-body")
                            .append($("<p>").append($("<strong>").html("Report Generated!")))
                    )
            );

            lib.hideSpinner();


        };

        const FilterTypeObject = {
            short_text: ["contains", "does not contain", "is", "is not", "starts with", "ends with", "is blank", "is not blank"],
            paragraph_text: ["contains", "does not contain", "is", "is not", "starts with", "ends with", "is blank", "is not blank"],
            rich_text: ["contains", "does not contain", "is", "is not", "starts with", "ends with", "is blank", "is not blank"],
            concatenation: ["contains", "does not contain", "is", "is not", "starts with", "ends with", "is blank", "is not blank"],
            number: ["is", "is not", "higher than", "lower than", "is blank", "is not blank"],
            currency: ["is", "is not", "higher than", "lower than", "is blank", "is not blank"],
            // type=="equation" format.equation_type=="numeric"
            equation_numeric: ["is", "is not", "higher than", "lower than", "is blank", "is not blank"],
            // type=="equation" format.equation_type=="date"
            equation_date: ["is", "is not", "is before", "is after", "is before current time", "is after current time", "is during the current",
                "is during the previous", "is during the next", "is before the previous", "is after the next", "is today", "is today or before",
                "is today or after", "is before today", "is after today", "is blank", "is not blank"],
            auto_increment: ["is", "is not", "higher than", "lower than", "is blank", "is not blank"],
            sum: ["is", "is not", "higher than", "lower than", "is blank", "is not blank"],
            min: ["is", "is not", "higher than", "lower than", "is blank", "is not blank"],
            max: ["is", "is not", "higher than", "lower than", "is blank", "is not blank"],
            average: ["is", "is not", "higher than", "lower than", "is blank", "is not blank"],
            count: ["is", "is not", "higher than", "lower than", "is blank", "is not blank"],
            multiple_choice: ["is", "is not", "contains", "does not contain", "is any", "is blank", "is not blank"],
            boolean: ["is", "is not", "is blank", "is not blank"],
            date_time: ["is", "is not", "is before", "is after", "is before current time", "is after current time", "is during the current",
                "is during the previous", "is during the next", "is before the previous", "is after the next", "is today", "is today or before",
                "is today or after", "is before today", "is after today", "is blank", "is not blank"],
            // how to manage files? ad images
            file: ["is blank", "is not blank"],
            name: ["contains", "does not contain", "is", "is not", "starts with", "ends with", "is blank", "is not blank"],
            email: ["contains", "does not contain", "is", "is not", "starts with", "ends with", "is blank", "is not blank"],
            address: ["contains", "does not contain", "is", "is not", "starts with", "ends with", "is blank", "is not blank"],
            phone: ["contains", "does not contain", "is", "is not", "starts with", "ends with", "is blank", "is not blank"],
            // signature: [],
            rating: ["is", "is not", "higher than", "lower than", "is blank", "is not blank"],
            connection: ["is", "is not", "contains", "does not contain", "is any", "is blank", "is not blank"],
            user_roles: ["is", "is not", "contains", "does not contain", "is any", "is blank", "is not blank"],
            password: ["contains", "does not contain", "starts with", "ends with"]
        };

        const objectListToShow = ["object_2", "object_10", "object_12", "object_6", "object_47", "object_37", "object_45", "object_60", "object_56", "object_58", "object_25", "object_35"];
        const selectdDisplayFields = ["field_20", "field_10", "field_12", "field_86", "field_13", "field_15", "field_14", "field_19", "field_18", "field_174", "field_175", "field_628", "field_690", "field_738", "field_1214", "field_1215",
            "field_89", "field_88", "field_951", "field_100", "field_87", "field_97", "field_867", "field_288", "field_93", "field_348", "field_96", "field_709", "field_711", "field_710", "field_1567", "field_1636", "field_525", "field_267", "field_90",
            "field_677", "field_145", "field_103", "field_322", "field_102", "field_273", "field_214", "field_873", "field_309", "field_1903", "field_107", "field_721", "field_751", "field_2140", "field_754", "field_2141", "field_757", "field_2142", "field_295",
            "field_47", "field_349", "field_55", "field_940", "field_338", "field_1436", "field_1434", "field_1439", "field_1445", "field_1510", "field_1185", "field_51", "field_344", "field_401", "field_1571", "field_494", "field_1644", "field_341", "field_602", "field_603", "field_647", "field_1975", "field_43", "field_42", "field_762", "field_1735", "field_765", "field_1736", "field_768", "field_1737", "field_801", "field_802",
            "field_1082", "field_1112", "field_1131", "field_1109", "field_1084", "field_1113", "field_1186", "field_1083", "field_1803", "field_1089", "field_1804", "field_1139", "field_1091", "field_1976", "field_1086", "field_1085", "field_1092", "field_1745", "field_1095", "field_1746", "field_1098", "field_1747", "field_1106", "field_1107",
            "field_481", "field_1723", " field_1834", "field_760", "field_514", "field_484", "field_485", "field_486", "field_526", "field_819", "field_487", "field_520", "field_1218", "field_1347", "field_1892", "field_1891", "field_1741",
            "field_961", "field_964", "field_1008", "field_969", "field_1465", "field_998", "field_995", "field_989",
            "field_956", "field_976", "field_959", "field_958", "field_1022", "field_1474", "field_1477", "field_984", "field_975",
            "field_1667", "field_1665", "field_1670", "field_1685", "field_1697", "field_1700",
            "field_1627", "field_1556", "field_1555", "field_1557", "field_1575", "field_1565",
            "field_1635", "field_1628",
            "field_356", "field_252",
            "field_1467", "field_997", //msp fee and msp tax
            "field_962",
            "field_1687", "field_1666",
            // contract invoice field:
            "field_453", "field_460", "field_1719", "field_454", "field_533", "field_1254", "field_878", "field_531", "field_532", "field_455", "field_979", "field_2228", "field_543",
            "field_718"
        ];


        const selectedFilterFields = ["field_20", "field_10", "field_86", "field_19", "field_18", "field_174", "field_175", "field_690", "field_738",
            "field_89", "field_88", "field_951", "field_87", "field_97", "field_867", "field_288", "field_93", "field_348", "field_96", "field_709", "field_711", "field_710", "field_1567", "field_1636", "field_525", "field_267", "field_90",
            "field_677", "field_145", "field_103", "field_322", "field_102", "field_273", "field_214", "field_873", "field_309", "field_1903",
            "field_47", "field_349", "field_55", "field_940", "field_338", "field_1445", "field_1510", "field_1185", "field_51", "field_401", "field_1571", "field_494", "field_1644", "field_602", "field_603", "field_1975",
            "field_1082", "field_1112", "field_1131", "field_1109", "field_1084", "field_1186", "field_1083", "field_1803", "field_1089", "field_1804", "field_1139", "field_1091", "field_1976",
            "field_481", "field_1723", " field_1834", "field_760", "field_514", "field_484", "field_487", "field_1218", "field_1347", "field_1892", "field_1891", "field_1741",
            "field_961", "field_964", "field_1008", "field_969",
            "field_956", "field_976", "field_959", "field_958", "field_1022",
            "field_1667", "field_1665", "field_1670", "field_1685",
            "field_1627", "field_1556", "field_1555", "field_1557", "field_1575", "field_1565",
            "field_1635",
            "field_356",
            "field_100", //aditionals 
            "field_962",
            "field_1687", "field_1666",
            // contract invoice field
            "field_881", "field_454", "field_460", "field_1719", "field_543"
        ];

        const objbuyerfieldInObjects = {
            object_2: "field_20",// suppliers
            object_6: "field_47",//contracts
            object_47: "field_1082",//amendments
            object_10: "field_89",//requisitions
            object_12: "field_677",//proposals
            object_25: "field_356",//cost centers
            object_37: "field_1723",//t&e line items
            object_45: "field_961",//buyer invoice
            object_56: "field_1627",//business unit
            object_58: "field_1635",//gl codes
            object_60: "field_1667",//manual invoice
            object_44: "field_956",// supplier invoices
            mspfeebuyerinvoice: "field_1467",
            msptaxbuyerinvoice: "field_997",
            object_35: "field_454" // contract invoice
        }
        //BORRAR EN DONE
        // intelcom site list start
        // $(document).on("knack-view-render.view_722", function (e, v, record) { //change in prod
        //     lib.waitFormViewform("#view_3580 .field_89", function () {
        //         if (Knack.models.view_3580.attributes.field_89_raw[0].identifier != "Intelcom Courier Canada") {
        //             return
        //         }
        //         lib.waitFormViewform("#view_3581 a.kn-button", function () {
        //             // console.log("href: ", $("#view_3580 a.kn-button").attr("href"))
        //             $(`#${v.key} .level .level-left`).append(
        //                 $("<div>")
        //                     .append(
        //                         $("<a>")
        //                             .addClass("kn-button is-button is-small")
        //                             .attr('id', 'Send-Worker-List-Button')
        //                             .attr('href', $("#view_3581 a.kn-button").attr("href"))
        //                             .append($("<span>").html("Send Worker List"))
        //                     )
        //             );
        //         });
        //     });
        // });
        //BORRA EN DONE
        // $(document).on("knack-scene-render.scene_1416", async function (event, view, user) {
        //     // console.log("render modal ")
        //     const formView = "view_3582";
        //     if ($("#kn-scene_1416").parent().hasClass("modal-card-body")) {

        //         $(`#${formView} .kn-button`).attr("disabled", true)
        //         //lib.showSpinner();
        //         //lib.showSuccessMessage("view_3555", "Generating PDF")
        //         $(`#${formView}`).prepend(
        //             $("<div>")
        //                 .addClass("kn-message success")
        //                 .append(
        //                     $("<span>")
        //                         .addClass("kn-message-body")
        //                         .append($("<p>").append($("<strong>").html("Generating CSV File")))
        //                 )
        //         );



        //         try {
        //             // server endpoint to generate csv file from selected data
        //             let requisitionName = Knack.views["view_3580"].model.attributes.field_87.replaceAll("/", "");
        //             requisitionName = requisitionName.replace(/[^a-z0-9\s]/gi, '');
        //             const proposals = Knack.views["view_722"].model.data.models ?? Knack.views["view_3817"].model.data.models;
        //             let workerInformation = [];

        //             for (let proposal of proposals) {
        //                 const proposalData = proposal.attributes;
        //                 const currentWorker = { name: "", supplier: "", In: "", Out: "", TotalHours: "", workerSignature: "", supervisorInitials: "", siteComments: "" }
        //                 if (proposalData.field_214 == "Accepted" || proposalData.field_214 == "Completed") {
        //                     currentWorker.name = proposalData.field_309_raw[0] ? proposalData.field_309_raw[0].identifier : "";
        //                     currentWorker.supplier = proposalData.field_102_raw[0] ? proposalData.field_102_raw[0].identifier : "";
        //                     workerInformation.push(currentWorker);
        //                 }
        //             }

        //             const obj = {
        //                 fileName: requisitionName,
        //                 workers: workerInformation,
        //                 token: Knack.getUserToken(),
        //             };

        //             // console.log("payoad:", obj)

        //             let csvURL = await $.ajax({
        //                 type: "POST",
        //                 //url: lib.CONEXIS_SERVER + "generateIntelcomSiteList",
        //                 //url: 'https://avvera.download/api/v1/' + "generateIntelcomSiteList",
        //                 url: "https://scorecard.conexisvms.com/api/v1/" + "generateIntelcomSiteList",
        //                 contentType: "application/json",
        //                 dataType: "json",
        //                 data: JSON.stringify(obj),
        //             });

        //             // console.log("server csv response: ", csvURL);

        //             lib.waitFormView("kn-input-field_2163", function () {
        //                 $("#kn-input-field_2163 input.file").val(csvURL.csvID); // change prod
        //                 $("#kn-input-field_2163").children().hide();
        //                 $("#kn-input-field_2163").append(csvURL.csvName);
        //                 $("#kn-input-field_2163").css("word-break", "break-all")

        //                 $(`#${formView} .kn-button`).attr("disabled", false);
        //                 $(`#${formView} .kn-message.success`).remove();

        //                 $("#field_2164").val("Todays Site List"); //change prod
        //                 $("#field_2165").val("Here is your site list for today"); //change prod

        //                 $(`#${formView} .kn-button`).click((e) => {
        //                     if (!$("#field_2187").val() && !$("#field_2188").val()) { //change prod
        //                         e.preventDefault();
        //                         alert("At least one of the email fields must be entered!");
        //                     }
        //                 });


        //             });

        //         } catch (e) {
        //             $(`#${formView} .kn-message success`).remove();
        //             $(`#${formView}`).prepend(
        //                 $("<div>")
        //                     .attr("id", "custom-errors-msg")
        //                     .addClass("kn-message is-error")
        //                     .append(
        //                         $("<span>")
        //                             .addClass("kn-message-body")
        //                             .append($("<p>").append($("<strong>").html("Error Generating CSV file, try again later")))
        //                     )
        //             );
        //             console.log("error generating csv: ", e);
        //         }

        //     } else {
        //         console.log("error message no modal")
        //         $(`#${formView}`).prepend(
        //             $("<div>")
        //                 .attr("id", "custom-errors-msg")
        //                 .addClass("kn-message is-error")
        //                 .append(
        //                     $("<span>")
        //                         .addClass("kn-message-body")
        //                         .append($("<p>").append($("<strong>").html("No Requisition selected, there is no CSV generated, please generate the CSV from the requisition details page")))
        //                 )
        //         );

        //     }
        // });

        // intelcom site list finish

        // intelcom mass proposal acceptance/rejection start
        // intelcom proposal acceptance code start
        //bORRAR EN DONE
        // $(document).on("knack-scene-render.scene_443", async function (event, scene) {
        //     try {
        //         lib.waitFormView("view_3580", async function () {
        //             let view = { key: "view_722" }
        //             const requisition = Knack.models.view_3580.attributes;
        //             const condition = requisition.field_89_raw[0].identifier != "Intelcom Courier Canada"
        //             if (condition) {
        //                 return
        //             }
        //             let proposals = Knack.models["view_722"].data.models.map(function (r) {
        //                 return r.toJSON();
        //             });
        //             proposals = proposals.filter((p) => {
        //                 return p.field_214 != "Completed" && p.field_214 != "Accepted" && p.field_214 != "Rejected"
        //             });
        //             $(`#${view.key}` + " table thead tr").prepend(
        //                 $("<th>").append(
        //                     $("<input>")
        //                         .addClass("select-all-te")
        //                         .attr("type", "checkbox")
        //                         .click(lib.selectAllTE)
        //                 )
        //             );
        //             $(`#${view.key}` + " table tbody tr:not(.kn-table-group)").prepend(
        //                 $("<td>").append(
        //                     $("<input>").addClass("select-te").attr("type", "checkbox")
        //                 )
        //             ).ready(function () {
        //                 $(`#${view.key}` + " table tbody tr").each(function (
        //                     key,
        //                     value
        //                 ) {
        //                     var exists = false;
        //                     proposals.forEach(function (p) {
        //                         if (p.id == value.id) {
        //                             exists = true;
        //                         }
        //                     });
        //                     if (!exists) {
        //                         $(value).find("input:checkbox").remove();
        //                     }
        //                 });
        //             });
        //         });
        //     } catch (error) {
        //         console.log(error);
        //     }
        // });

        lib.addMethod("disabledButton", function (button, disabled) {
            if (disabled) {
                button.attr("disabled", true);
            } else {
                button.attr("disabled", false)
            }
        });

        $(document).on("knack-view-render.view_3585", async function (e, view, record) { //change in prod

            lib.waitFormView("view_3580", async function () {
                //try {

                $(`#${view.key}`).append(`<button class="kn-button is-primary accept-proposals" type="submit">Accept</button>`);
                $(`#${view.key}`).append(`<button class="kn-button is-primary reject-proposals" type="submit" style="margin-left: 10px;">Reject</button>`);
                const acceptButton = $('.accept-proposals');
                const rejectButton = $('.reject-proposals');
                // const isRunning = $("#field_2181").val(); //change prod
                const isRunning = Knack.views["view_3580"].model.attributes.field_2186;
                console.log("test is running: ", isRunning)
                if (isRunning == "Yes") {
                    lib.disabledButton(acceptButton, true);
                    lib.disabledButton(rejectButton, true);
                    $(`#${view.key}`).prepend(
                        $("<div>")
                            .attr("id", "custom-successful-msg")
                            .addClass("kn-message")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Processing  records, when this process finished you will receive an email!")))
                            )
                    );
                    return
                }

                const buttons = document.querySelectorAll(`#${view.key} .kn-button.is-primary`);
                for (let button of buttons) {
                    button.addEventListener("click", async function (e) {
                        lib.showSpinner();
                        $('.kn-message').remove();

                        const selectedProposals = $(".select-te:checked");

                        if (selectedProposals.length == 0) {
                            $(`#${view.key}`).prepend(
                                $("<div>")
                                    .attr("id", "custom-errors-msg")
                                    .addClass("kn-message is-error")
                                    .append(
                                        $("<span>")
                                            .addClass("kn-message-body")
                                            .append($("<p>").append($("<strong>").html("You must select at least one checkbox, please try again!")))
                                    )
                            );
                            lib.disabledButton(acceptButton, false);
                            lib.disabledButton(rejectButton, false);
                            lib.hideSpinner();
                            throw new Error;
                        }

                        let action = "";
                        if (this.className.includes("accept-proposals")) {
                            action = "accept"
                        } else {
                            action = "reject"
                        }

                        const idProposalsSelected = [];
                        for (let i = 0; i < selectedProposals.length; i++) {

                            const proposalObject = {
                                id: selectedProposals[i].parentNode.parentNode.id,
                                proposalID: selectedProposals[i].parentNode.parentNode.querySelector(".col-0 .level span:nth-child(2)").innerText,
                                workerName: selectedProposals[i].parentNode.parentNode.querySelector(".field_2308 span:nth-child(1)").innerText,
                                supplier: selectedProposals[i].parentNode.parentNode.querySelector(".field_102 span:nth-child(1)").innerText,
                                supplierContactEmail: selectedProposals[i].parentNode.parentNode.querySelector(".field_14 span:nth-child(1) a").innerText,
                                proposalStatus: selectedProposals[i].parentNode.parentNode.querySelector(".field_214 span").innerText
                            }
                            idProposalsSelected.push(proposalObject);
                        }
                        lib.waitToken(0, async function (token, error) {
                            if (error) {
                                lib.hideSpinner();
                                alert("error getting token")
                                return
                            }

                            const payload = {
                                // token: Knack.getUserToken(),
                                token: token,
                                action: action,
                                email: Knack.getUserAttributes().values.email.email,
                                proposalsInfo: idProposalsSelected,
                                requisitionID: Knack.views["view_3580"].model.attributes.id, //change in prod
                                requisition: Knack.views["view_3580"].model.attributes.field_88, //change in prod
                                requisitionJobTitle: Knack.views["view_3580"].model.attributes.field_87.replaceAll("/", ""), //change in prod
                                blockView: true,
                            }
                            console.log("payload: ", payload)

                            try {
                                const response = await $.ajax({
                                    type: "POST",
                                    url: lib.CONEXIS_SERVER + "process-proposals",
                                    contentType: "application/json",
                                    dataType: "json",
                                    data: JSON.stringify(payload),
                                });
                                lib.hideSpinner();
                                $('.kn-message').remove();
                                $(`#${view.key}`).prepend(
                                    $("<div>")
                                        .attr("id", "custom-successful-msg")
                                        .addClass("kn-message")
                                        .append(
                                            $("<span>")
                                                .addClass("kn-message-body")
                                                .append($("<p>").append($("<strong>").html("Processing  records, when this process finished you will receive an email!")))
                                        )
                                );
                                lib.disabledButton(acceptButton, true);
                                lib.disabledButton(rejectButton, true);
                            } catch (error) {
                                lib.hideSpinner();
                                console.log(error);
                                $('.kn-message').remove();

                                $(`#${view.key}`).prepend(
                                    $("<div>")
                                        .attr("id", "custom-errors-msg")
                                        .addClass("kn-message is-error")
                                        .append(
                                            $("<span>")
                                                .addClass("kn-message-body")
                                                .append($("<p>").append($("<strong>").html("Error Connecting to the server, Please try again!")))
                                        )
                                );

                                lib.disabledButton(acceptButton, false);
                                lib.disabledButton(rejectButton, false);
                            }
                        });
                    });
                }

            });


        });

        $(document).on("knack-view-render.view_3583", async function (e, view, record) {
            var form = $("#" + view.key + " form");
            var submit = form.find("button:submit");

            submit.click(async function (e) {
                e.preventDefault();
                lib.showSpinner();
                const declineProposals = $(`#${view.key} #field_1203`).val();

                if (declineProposals == "Yes") {
                    const idProposalsSelected = [];

                    const selectedProposals = Knack.views["view_3584"].model.data.models;

                    for (let i = 0; i < selectedProposals.length; i++) {
                        const proposalObject = {
                            id: selectedProposals[i].id,
                            proposalID: selectedProposals[i].attributes.field_145,
                            workerName: selectedProposals[i].attributes.field_309_raw[0] ? selectedProposals[i].attributes.field_309_raw[0].identifier : "",
                            supplier: selectedProposals[i].attributes.field_102_raw[0] ? selectedProposals[i].attributes.field_102_raw[0].identifier : "",
                            supplierContactEmail: selectedProposals[i].attributes.field_14_raw ? selectedProposals[i].attributes.field_14_raw.email : "",
                            proposalStatus: selectedProposals[i].attributes.field_214,
                        }
                        idProposalsSelected.push(proposalObject);
                    }
                    lib.waitToken(0, async function (token, error) {
                        if (error) {
                            lib.hideSpinner();
                            alert("error getting token")
                            return
                        }

                        const payload = {
                            // token: Knack.getUserToken(),
                            token: token,
                            action: "reject",
                            email: Knack.getUserAttributes().values.email.email,
                            proposalsInfo: idProposalsSelected,
                            requisitionID: Knack.views[view.key].model.attributes.id,
                            requisition: Knack.views[view.key].model.attributes.field_88,
                            requisitionJobTitle: Knack.views[view.key].model.attributes.field_87.replaceAll("/", ""), //change in prod
                            blockView: false,
                        }

                        try {
                            const response = await $.ajax({
                                type: "POST",
                                url: lib.CONEXIS_SERVER + "process-proposals",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(payload),
                            });
                            lib.hideSpinner();
                            form.submit();

                        } catch (error) {
                            lib.hideSpinner();
                            console.log(error);
                            $('.kn-message').remove();

                            $(`#${view.key}`).prepend(
                                $("<div>")
                                    .attr("id", "custom-errors-msg")
                                    .addClass("kn-message is-error")
                                    .append(
                                        $("<span>")
                                            .addClass("kn-message-body")
                                            .append($("<p>").append($("<strong>").html("Error Connecting to the server, Please try again!")))
                                    )
                            );

                        }
                    });

                } else {
                    lib.hideSpinner();
                    form.submit();
                }

            });

        });
        // intelcom mass proposal acceptance/rejection finish

        // loreal suppliers po number in line item detail report start
        $(document).on("knack-view-render.view_3250", async function (e, view, record) {
            $("#CustomDropdownSelect").remove()
            let selectHtml = `
                    <select data-placeholder="Select" style="vertical-align: bottom;"><option value="">Select</option>
                
                        <option value="Incomplete">Incomplete</option>
                    
                        <option value="Approved">Approved</option>
                    
                        <option value="Correction Required">Correction Required</option>
                    
                        <option value="Invoiced">Invoiced</option>
                    
                        <option value="Rejected">Rejected</option>
                    
                        <option value="Under Review - Buyer">Under Review - Buyer</option>
                
                    </select>`

            $("#view_3250-search > div > div.kn-search-filters.kn-details-group-column.kn-details-group-column-0.column > ul > li:nth-child(3) > span.value").hide()
            let textFieldSelector = $("#view_3250-search > div > div.kn-search-filters.kn-details-group-column.kn-details-group-column-0.column > ul > li:nth-child(3) > span.value > input")
            textFieldSelector.hide();
            let selectorLiInput = $("#view_3250-search > div > div.kn-search-filters.kn-details-group-column.kn-details-group-column-0.column > ul > li:nth-child(3)");
            selectorLiInput.append(
                $("<span>")
                    .addClass("kn-select")
                    .attr("style", "display: inline;")
                    .attr("id", "CustomDropdownSelect")
                    .html(selectHtml)
            );

            const dropdown = $("#CustomDropdownSelect select")
            dropdown.change(function () {
                console.log("custom dropdown change")
                console.log(dropdown.val())
                textFieldSelector.val(dropdown.val())
                textFieldSelector.text(dropdown.val())

            });

            $("#view_3250 > form > div.kn-submit.control.is-horizontal > button").click(function () {
                $("#view_3250-search > div > div.kn-search-filters.kn-details-group-column.kn-details-group-column-0.column > ul > li:nth-child(3) > span.value").show()
                textFieldSelector.show()
            })

            //lib.waitFormView("view_3247", function () {
            //  const buyer = $("#view_3247 > section > div > div > div > div > div.kn-detail.field_20").children(".kn-detail-body").text();
            //if (buyer != "L’ORÉAL CANADA INC.") {
            //  $("#view_3250-search > div > div.kn-search-filters.kn-details-group-column.kn-details-group-column-0.column > ul > li:nth-child(5)").hide()
            //$("#view_3250 .field_2174").hide();
            //dropdown.hide()
            //}

            //});

        });
        // loreal suppliers po number in line item detail report start

        // hidde show adhoc button depending on master page
        // $(document).on("knack-view-render.view_3575", async function (e, view, record) {
        //     const urls = Knack.hash_parts;
        //     if (!urls.includes('msp-admin-dashboard')) {
        //         const loggedInEmail = Knack.getUserAttributes().email;
        //         if (loggedInEmail != "wayneburgess@contraxvms.com") {
        //             // if (loggedInEmail != "developers@example.com") {
        //             $(`#${view.key} .kn-button`).hide()
        //         }
        //     }
        //     // const loggedInEmail = Knack.getUserAttributes().email;
        //     // if (loggedInEmail != "developers@example.com") {
        //     //     $(`#${view.key} .kn-button`).hide()
        //     // }
        // });


        // reporting module start
        $(document).on("knack-form-submit.view_3607", function (event, view, data) { //12 months reload 
            location.reload();
        });
        $(document).on("knack-form-submit.view_3608", function (event, view, data) { //current year reload
            location.reload();
        });

        $(document).on("knack-form-submit.view_1681", async function (event, view, TimeCard) {
            console.log("runing to set if it is first time card in month ")
            console.log("timecard: ", TimeCard)
            if (TimeCard.field_499 != "Save for Later") {

                const contractID = TimeCard.field_377_raw[0].id
                const timecardsSubmittedThisMonth = await lib.find(lib.OBJECTS_IDS.TimeExpense, [
                    { field: "field_377", operator: "is", value: contractID },
                    { field: "field_1787", operator: "is during the current", type: "month", value: "" }
                ]);
                console.log("time card submitted this month found: ", timecardsSubmittedThisMonth.records)
                if (timecardsSubmittedThisMonth.records.length <= 1) {
                    await lib.update(
                        lib.OBJECTS_IDS.TimeExpense,
                        TimeCard.id,
                        JSON.stringify({
                            field_2200: "Yes",
                        })
                    );
                }
            }
        });

        const noDataCharts = (data, view) => {
            console.log(view, data)
            let thereisData = false;
            for (let record of data[0].records) {
                if (record.calc_0) {
                    thereisData = true;
                }
            }
            if (!thereisData) {
                // console.log("no data")
                $(`#${view} .view-header`).append($("<div>")
                    .attr("id", "custom-errors-msg")
                    .addClass("kn-message success")
                    .append(
                        $("<span>")
                            .addClass("kn-message-body")
                            .append($("<p>").append($("<strong>").html("The data set lacks the amount of data required to generate a metric")))
                    )
                )

                $(`#${view} .kn-report-rendered svg .highcharts-data-labels tspan`).text("")
                let array = $(`#${view} .kn-report-rendered svg .highcharts-data-labels tspan`);
                let middle = Math.floor(array.length / 2)
                if (middle == 0) {
                    array[middle].innerHTML = "No data"
                } else {
                    array[middle - 1].innerHTML = "No data"
                }
            }
        }

        $(document).on("knack-view-render.view_3693", function (event, view, data) { //12 months open positions by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3641", function (event, view, data) { //12 months active contracts by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3643", function (event, view, data) { //12 months proposal ratio by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3647", function (event, view, data) { //12 months no coverage by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3649", function (event, view, data) { //12 months days to fill by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3651", function (event, view, data) { //12 months new started contracts by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3694", function (event, view, data) { //current year open positions by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3656", function (event, view, data) { //current year active contracts by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3658", function (event, view, data) { //current year proposal ratio by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3662", function (event, view, data) { //current year no coverage by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3664", function (event, view, data) { //current year days to fill by buyer
            noDataCharts(data, view.key);
        });

        $(document).on("knack-view-render.view_3666", function (event, view, data) { //current year new started contracts by buyer
            noDataCharts(data, view.key);
        });

        const noDataPieChart = (data, view) => {
            let thereisData = false;
            for (let record of data[0].records) {
                if (record.calc_0) {
                    thereisData = true;
                }
            }
            if (!thereisData) {
                $(`#${view} #kn-report-${view}-1`).html("");
                $(`#${view} #kn-report-${view}-1`).append($("<div>")
                    .attr("id", "custom-errors-msg")
                    .addClass("kn-message success")
                    .append(
                        $("<span>")
                            .addClass("kn-message-body")
                            .append($("<p>").append($("<strong>").html("The data set lacks the amount of data required to generate a metric")))
                    )
                )
            }
        }

        $(document).on("knack-view-render.view_3715", function (event, view, data) { //last 12 months terminations by buyer
            noDataPieChart(data, view.key);
        });

        $(document).on("knack-view-render.view_3717", function (event, view, data) { //current terminations by buyer
            noDataPieChart(data, view.key);
        });

        $(document).on("knack-view-render.view_3729", function (event, view, data) { //current year new started contracts by buyer
            noDataCharts(data, view.key);
        });
        $(document).on("knack-view-render.view_3728", function (event, view, data) { //current year new started contracts by buyer
            noDataCharts(data, view.key);
        });
        // reporting module finish

        const createWorkerFromNewContractFormSetup = (view, parentView) => {
            $(".modal-card-body #kn-input-").hide(); // change prod
            lib.showSpinner();
            console.log(`running on view ${view}`);
            const selectedSupplierID = $(`#${parentView} #${parentView}-field_51`).val(); // change prod
            console.log("selected supplier id: ", selectedSupplierID);
            if (!selectedSupplierID) {
                lib.hideSpinner();
                $("#connection-form-view > form > div > button").prop("disabled", true);
                lib.showErrorMessage("connection-form-view", "Please Select a supplier before creating a worker");

                return
            }

            const supplierDropdown = $(`#${view}-field_315`);
            supplierDropdown.val(selectedSupplierID);
            supplierDropdown.change();

            console.log("value supploer dropdown: ", supplierDropdown.val());


            lib.hideSpinner();
        }
        $(document).on("knack-view-render.view_3734", function (event, view, user) {
            createWorkerFromNewContractFormSetup(view.key, "view_3733")
        });
        $(document).on("knack-view-render.view_3737", function (event, view, user) {
            createWorkerFromNewContractFormSetup(view.key, "view_3736")
        });
        $(document).on("knack-view-render.view_3739", function (event, view, user) {
            createWorkerFromNewContractFormSetup(view.key, "view_3738")
        });

        $(document).on("knack-view-render.view_966", function (event, view, data) {
            //console.log("rendering view: ", view.key)
            //console.log("with data: ", data)
            const isUsingAmendments = data.field_2224_raw
            //console.log(isUsingAmendments)
            if (!isUsingAmendments) {
                //console.log("hiding element edit job title")
                $(`#${view.key} > section > div > div:nth-child(1) > div > div > div:nth-child(1) > div > span > a > span`).hide();
            }
            const contractStatus = data.field_55;
            if (contractStatus == "3. Terminated" || contractStatus == "5. Completed" || contractStatus == "6. Non-Start" || contractStatus == "7. Resigned" || contractStatus == "8. Converted/Hired") {
                $(`#${view.key} > section > div > div:nth-child(1) > div > div > div:nth-child(2)`).hide()
            }
        });

        $(document).on("knack-view-render.view_3740", function (event, view, data) {
            const contractstatus = data.field_55
            if (contractstatus == "1. Planned") {
                $(`#${view.key} .kn-details-link`).hide()
            } else if (contractstatus == "3. Terminated" || contractstatus == "5. Completed" || contractstatus == "6. Non-Start" || contractstatus == "7. Resigned" || contractstatus == "8. Converted/Hired") {
                $(`#${view.key} .kn-details-link`).first().hide()
            }
            const mappingID = data.field_1445
            if (mappingID) {
                $(`#${view.key} .kn-details-link`).last().hide()
            }
        });


        $(document).on("knack-view-render.view_3749", async function (event, view) {
            const id = Knack.hash_id;
            let url = `#msp-admin-dashboard/contracts3/view-contract-details4/${id}/update-contract-status/${id}/`;
            $(`#${view.key} > div > a`).attr("href", url);
        });


        // New Contracts form view Code start
        lib.addMethod("changeInputToOnlyRead", function (id, label, value) {
            $(`#${id}`).before(`
                <div class="kn-input kn-read-only kn-input-short_text control" >
                    <label class="label kn-label">
                        <span>${label}</span>
                    </label>
                    ${value}
                </div>
                `);
            //$(`#${id}`).hide();
            $(`#${id}`).css({ "position": "absolute", "left": "100000px" });
        });
        //function to sort data related to contract data to after autopopulate form in other autopopulateForm function
        function sortDataForm(contract) {
            try {
                let jobTitleValue = contract.field_401;
                //console.log("Job title: ", jobTitleValue)
                //if (contract.field_692 != "Yes") {
                //  jobTitleValue = contract.field_2202;
                //console.log("requisition job title: ", jobTitleValue)
                //}
                const dataContract = {
                    jobTitle: {
                        field: "Job Title",
                        value: jobTitleValue
                    },
                    skillCategory: {
                        field: "Skill Category",
                        value: contract.field_2225
                    },
                    billRate: {
                        field: "Contract Bill Rate",
                        value: contract.field_43
                    },
                    payRatePerHour: {
                        field: "Base Pay Rate per Hour",
                        value: contract.field_42
                    },
                    overtimeRate: {
                        field: "Contract Overtime Rate",
                        value: contract.field_478
                    },
                    doubleTimeRate: {
                        field: "Contract Double Time Rate",
                        value: contract.field_479
                    },
                    ///work Address fields
                    addressLine1: {
                        field: "Work Address Line 1",
                        value: contract.field_712
                    },
                    addressLine2: {
                        field: "Work Address Line 2",
                        value: contract.field_713
                    },
                    addressCity: {
                        field: "Work Address City",
                        value: contract.field_714
                    },
                    addressZip: {
                        field: "Work Address Zip/Postal Code",
                        value: contract.field_717
                    },
                    mappingId: {
                        field: "Mapping ID",
                        value: contract.field_1445
                    },
                    activateContract: {
                        field: "Activate Contract Now?",
                        value: "Yes"
                    },
                    startDate: {
                        field: "Start Date",
                        value: contract.field_53
                    },
                    endDate: {
                        field: "End Date",
                        value: contract.field_54
                    },
                    emailSetupIT: {
                        field: "Email for IT setup",
                        value: contract.field_687 ? contract.field_687_raw.email : ""
                    },
                    emailSetupITDescription: {
                        field: "Email for IT setup description",
                        value: contract.field_688
                    },
                    actualStartDate: {
                        field: "Actual Start Date",
                        value: contract.field_1190
                    },
                    actualEndDate: {
                        field: "Actual End Date",
                        value: contract.field_1147
                    },
                    dollarOrFee: {
                        field: "Dollar Or Fee",
                        value: contract.field_800
                    },
                    dollar: {
                        field: "MSP $ Fee",
                        value: contract.field_801
                    },
                    fee: {
                        field: "MSP % Fee",
                        value: contract.field_802
                    },
                    poNumber: {
                        field: "PO Number / CAC",
                        value: contract.field_940
                    },
                    flowdown: {
                        field: "Flowdown",
                        value: contract.field_1759
                    },
                    customTaxRates: {
                        field: "Custom Tax Rates?",
                        value: contract.field_1432
                    },
                    customSuppierTaxRates: {
                        field: "Custom Supplier Tax Rates",
                        value: contract.field_1433
                    },
                    customBuyerTaxRates: {
                        field: "Custom Buyer Tax Rates",
                        value: contract.field_1437
                    },
                    customMSPTaxRates: {
                        field: "Custom MSP Tax Rates",
                        value: contract.field_1438
                    },
                    //dropdowns
                    jobOwner: {
                        field: "Job Owner",
                        value: contract.field_1185 ? contract.field_1185_raw : [{ id: "", identifier: "  " }]
                    },
                    supplier: {
                        field: "Supplier",
                        value: contract.field_51 ? contract.field_51_raw : [{ id: "", identifier: "  " }]
                    },
                    worker: {
                        field: "Worker",
                        value: contract.field_338 ? contract.field_338_raw : [{ id: "", identifier: "  " }]
                    },
                    costCenters: {
                        field: "Cost Centers",
                        value: contract.field_494 ? contract.field_494_raw : []
                    }, //IT COULD BE MORE THAN 1
                    addressCountry: {
                        field: "Address Country",
                        value: contract.field_715 ? contract.field_715_raw : [{ id: "", identifier: "  " }]
                    },
                    addressState: {
                        field: "Address State",
                        value: contract.field_716 ? contract.field_716_raw : [{ id: "", identifier: "  " }]
                    },
                    businessUnit: {
                        field: "Business Unit",
                        value: contract.field_1571 ? contract.field_1571_raw : [{ id: "", identifier: "  " }]
                    },
                    workShift1: {
                        field: "Work Shift 1",
                        value: contract.field_793 ? contract.field_793_raw : [{ id: "", identifier: "   " }]
                    },
                    proposedBillRateWorkShift1: {
                        field: "Proposed Bill Rate Shift 1",
                        value: contract.field_762
                    },
                    overtimeWorkShift1: {
                        field: "Overtime Rate Shift 1 ",
                        value: contract.field_763
                    },
                    doubleWorkShift1: {
                        field: "Double Time Rate Shift 1",
                        value: contract.field_764
                    },
                    workShift2: {
                        field: "Work Shift 2",
                        value: contract.field_794 ? contract.field_794_raw : [{ id: "", identifier: "   " }]
                    },
                    proposedBillRateWorkShift2: {
                        field: "Proposed Bill Rate Shift 2",
                        value: contract.field_765
                    },
                    overtimeWorkShift2: {
                        field: "Overtime Rate Shift 2",
                        value: contract.field_766
                    },
                    doubleWorkShift2: {
                        field: "Double Time Rate Shift 2",
                        value: contract.field_767
                    },
                    workShift3: {
                        field: "Work Shift 3",
                        value: contract.field_795 ? contract.field_795_raw : [{ id: "", identifier: "   " }]
                    },
                    proposedBillRateWorkShift3: {
                        field: "Proposed Bill Rate Shift 3",
                        value: contract.field_768
                    },
                    overtimeWorkShift3: {
                        field: "Overtime Rate Shift 3",
                        value: contract.field_769
                    },
                    doubleWorkShift3: {
                        field: "Double Time Rate Shift 3",
                        value: contract.field_770
                    },
                    supplierflowdown: {
                        field: "Supplier Flowdown",
                        value: contract.field_1761 ? contract.field_1761_raw : [{ id: "", identifier: "  " }]
                    },
                    poAttachment: {
                        field: "PO Attachment",
                        value: contract.field_941 ? [contract.field_941_raw] : [{ id: "", identifier: "  " }]
                    },
                    glCode: {
                        field: "GL Code",
                        value: contract.field_1644 ? contract.field_1644_raw : [{ id: "", identifier: "  " }]
                    }
                }
                //console.log(dataContract);
                return dataContract;
            } catch (error) {
                lib.hideSpinner();
                console.log(error);
            }
        }
        //This function autopopulate the form when view is loadling with the data pre-sorted 
        function autopupuledForm(view, autopopulate) {
            try {
                //simple imputs
                $("#field_696").val(autopopulate.jobTitle.value);
                $(`#${view.key}-field_2225`).val(autopopulate.skillCategory.value);
                $("#field_43").val(autopopulate.billRate.value);
                $("#field_42").val(autopopulate.payRatePerHour.value);
                $("#field_478").val(autopopulate.overtimeRate.value);
                $("#field_479").val(autopopulate.doubleTimeRate.value);
                $("#field_712").val(autopopulate.addressLine1.value);
                $("#field_713").val(autopopulate.addressLine2.value);
                $("#field_714").val(autopopulate.addressCity.value);
                $("#field_717").val(autopopulate.addressZip.value);

                if (autopopulate.mappingId.value) {
                    const arraySplit = autopopulate.mappingId.value.split("+");
                    if (arraySplit.length == 1) {
                        const newMappingId = autopopulate.mappingId.value + "+1"
                        $("#field_1445").val(newMappingId);
                    } else {
                        const mappingIdNumber = parseInt(arraySplit[1]);
                        const nextNumber = isNaN(mappingIdNumber) ? 0 : mappingIdNumber + 1;
                        const newMappingId = `${arraySplit[0]}+${nextNumber}`;
                        $("#field_1445").val(newMappingId);
                    }
                } else {
                    $("#field_1445").val(autopopulate.mappingId.value);
                }

                $("#field_1539").val(autopopulate.activateContract.value);
                //$(`#${view.key}-field_53`).val(autopopulate.startDate.value);
                //$(`#${view.key}-field_54`).val(autopopulate.endDate.value);
                $("#field_687").val(autopopulate.emailSetupIT.value);
                $("#field_688").val(autopopulate.emailSetupITDescription.value);
                // $(`#${view.key}-field_1190`).val(autopopulate.actualStartDate.value);
                // $(`#${view.key}-field_1147`).val(autopopulate.actualEndDate.value);
                $("#field_940").val(autopopulate.poNumber.value);
                $("#field_1759").val(autopopulate.flowdown.value);
                $("#field_1761").val(autopopulate.supplierflowdown.value);
                $("#field_762").val(autopopulate.proposedBillRateWorkShift1.value);
                $("#field_763").val(autopopulate.overtimeWorkShift1.value)
                $("#field_764").val(autopopulate.doubleWorkShift1.value)
                $("#field_765").val(autopopulate.proposedBillRateWorkShift2.value);
                $("#field_766").val(autopopulate.overtimeWorkShift2.value);
                $("#field_767").val(autopopulate.doubleWorkShift2.value);
                $("#field_768").val(autopopulate.proposedBillRateWorkShift3.value);
                $("#field_769").val(autopopulate.overtimeWorkShift3.value);
                $("#field_770").val(autopopulate.doubleWorkShift3.value);
                $("#field_1432").val(autopopulate.customTaxRates.value);
                $("#field_1433").val(autopopulate.customSuppierTaxRates.value);
                $("#field_1437").val(autopopulate.customBuyerTaxRates.value);
                $("#field_1438").val(autopopulate.customMSPTaxRates.value);

                if (autopopulate.dollarOrFee.value == "% Fee") {
                    $("#kn-input-field_800 > div > div:nth-child(2) > label > input").attr("checked", true);
                    $("#field_802").val(autopopulate.fee.value).show();
                    $("#kn-input-field_802").show();

                } else {
                    $("#kn-input-field_800 > div > div:nth-child(1) > label > input").attr("checked", true);
                    $("#field_801").val(autopopulate.dollar.value).show();
                    $("#kn-input-field_801").show();
                }
                //dropdowns

                $(`#${view.key}-field_1185`).val(autopopulate.jobOwner.value[0].id).trigger("liszt:updated");
                if (autopopulate.supplier.value[0].identifier == "Self Sourced") {
                    $(`#${view.key}-field_51`).append(`<option 
            value="${autopopulate.supplier.value[0].id}">
                ${autopopulate.supplier.value[0].identifier}
            </option>`);
                    $(`#${view.key}-field_51`).val(autopopulate.supplier.value[0].id).trigger("liszt:updated");

                } else {
                    $(`#${view.key}-field_51`).val(autopopulate.supplier.value[0].id).trigger("liszt:updated");
                }
                $(`#${view.key}-field_338`).append(`
                <option selected value="${autopopulate.worker.value[0].id}">${autopopulate.worker.value[0].identifier}</option>
            `).trigger("liszt:updated");
                if (autopopulate.costCenters.value.length != 0) {
                    let arraycostCenterIds = [];
                    for (let cost_center of autopopulate.costCenters.value) {
                        arraycostCenterIds.push(cost_center.id)
                    }
                    $(`#${view.key}-field_494`).val(arraycostCenterIds)
                    $(`#${view.key}-field_494`).trigger("liszt:updated");
                }
                $(`#${view.key}-field_715`).val(autopopulate.addressCountry.value[0].id).trigger("liszt:updated");
                $(`#${view.key}-field_716`).val(autopopulate.addressState.value[0].id).trigger("liszt:updated");
                $(`#${view.key}-field_793`).val(autopopulate.workShift1.value[0].id).trigger("liszt:updated");
                $(`#${view.key}-field_794`).val(autopopulate.workShift2.value[0].id).trigger("liszt:updated");
                $(`#${view.key}-field_795`).val(autopopulate.workShift3.value[0].id).trigger("liszt:updated");
                $(`#${view.key}-field_1571`).val(autopopulate.businessUnit.value[0].id).trigger("liszt:updated");
                $(`#${view.key}-field_1761`).append(`
                <option selected value="${autopopulate.supplierflowdown.value[0].id}">${autopopulate.supplierflowdown.value[0].identifier}</option>
            `).trigger("liszt:updated");
                $("#kn-input-field_941 input.file").val(autopopulate.poAttachment.value[0].id).trigger("liszt:updated");
                $(`#${view.key}-field_1644`).append(`
                <option selected value="${autopopulate.glCode.value[0].id}">${autopopulate.glCode.value[0].identifier}</option>
            `).trigger("liszt:updated");
                lib.hideSpinner();
            } catch (error) {
                lib.hideSpinner();
                console.log(error);
            }
        }
        //This function will bring the current data in the form when user click on submit in new contract form
        function getCurrentValues(view) {
            const currentValues = {
                jobTitle: $("#field_696").val(),
                skillCategory: $(`#${view.key}-field_2225`).val(),
                billRate: $("#field_43").val(),
                payRatePerHour: $("#field_42").val(),
                overtimeRate: $("#field_478").val(),
                doubleTimeRate: $("#field_479").val(),
                ///work Address fields
                addressLine1: $("#field_712").val(),
                addressLine2: $("#field_713").val(),
                addressCity: $("#field_714").val(),
                addressZip: $("#field_717").val(),
                mappingId: $("#field_1445").val(),
                activateContract: $("#field_1539").val(),
                //startDate: $(`#${view.key}-field_53`).val(),
                //endDate: $(`#${view.key}-field_54`).val(),
                emailSetupIT: $("#field_687").val(),
                emailSetupITDescription: $("#field_688").val(),
                // actualStartDate: $(`#${view.key}-field_1190`).val(),
                // actualEndDate: $(`#${view.key}-field_1147`).val(),
                dollar: $("#field_801").val(),
                fee: $("#field_802").val(),
                flowdown: $("#field_1759").val(),
                proposedBillRateWorkShift1: $("#field_762").val(),
                overtimeWorkShift1: $("#field_763").val(),
                doubleWorkShift1: $("#field_764").val(),
                proposedBillRateWorkShift2: $("#field_765").val(),
                overtimeWorkShift2: $("#field_766").val(),
                doubleWorkShift2: $("#field_767").val(),
                proposedBillRateWorkShift3: $("#field_768").val(),
                overtimeWorkShift3: $("#field_769").val(),
                doubleWorkShift3: $("#field_770").val(),
                poNumber: $("#field_940").val(),
                customTaxRates: $("#field_1432").val(),
                customSuppierTaxRates: $("#field_1433").val(),
                customBuyerTaxRates: $("#field_1437").val(),
                customMSPTaxRates: $("#field_1438").val(),
                //dropdowns
                jobOwner: $(`#${view.key}-field_1185 option:selected`),
                supplier: $(`#${view.key}-field_51 option:selected`),
                worker: $(`#${view.key}-field_338 option:selected`),
                costCenters: $(`#${view.key}-field_494 option:selected`),
                addressCountry: $(`#${view.key}-field_715 option:selected`),
                addressState: $(`#${view.key}-field_716 option:selected`),
                businessUnit: $(`#${view.key}-field_1571 option:selected`),
                workShift1: $(`#${view.key}-field_793 option:selected`),
                workShift2: $(`#${view.key}-field_794 option:selected`),
                workShift3: $(`#${view.key}-field_795 option:selected`),
                supplierflowdown: $(`#${view.key}-field_1761 option:selected`),
                poAttachment: $("#kn-input-field_941 input.file"),
                glCode: $(`#${view.key}-field_1644 option:selected`),
            }
            return currentValues;
        }

        //function to map fields changed related to the previous contract and sort that information to show in a table
        async function showChangedRecords(autopopulated, valuesForm, needContractAppovalform) {
            try {
                let differentValues = [];
                let props = Object.keys(valuesForm);
                for (let i = 0; i < props.length; i++) {
                    let before = autopopulated[props[i]].value;
                    let after = valuesForm[props[i]];
                    if (Array.isArray(autopopulated[props[i]].value)) {
                        let isdifferent = false;
                        let idsToCompareAfter = [];
                        let idsToCompareBefore = [];

                        for (let i = 0; i < after.length; i++) {
                            idsToCompareAfter.push(after[i].value);
                        }

                        for (let fieldBefore of before) {
                            idsToCompareBefore.push(fieldBefore.id)
                        }
                        idsToCompareAfter.sort()
                        idsToCompareBefore.sort()
                        if (JSON.stringify(idsToCompareBefore) != JSON.stringify(idsToCompareAfter)) {
                            isdifferent = true
                        }
                        if (isdifferent) {
                            differentValues.push(props[i]);
                        }
                    } else {
                        if (before != after) {
                            differentValues.push(props[i]);
                        }
                    }
                }
                if (differentValues.length == 0) {
                    $("#tbody-modal").append(`
                    <tr>
                        <td colspan="3">
                            <span>You haven't made any changes, are you sure you want continue and create the contract?</span>
                        </td>
                    </tr>
                `);
                } else {
                    for (let i = 0; i < differentValues.length; i++) {
                        let title = autopopulated[differentValues[i]].field;
                        let before = autopopulated[differentValues[i]].value; //array con id y identifier
                        let after = valuesForm[differentValues[i]]; // array HTML

                        let conditional = needContractAppovalform && (title == "Activate Contract Now?" || title == "Actual Start Date" || title == "Actual End Date")
                        if (conditional) {
                            continue;
                        }

                        let displayBefore = "";
                        let displayAfter = "";
                        if (title == "PO Attachment") {
                            if (before[0].filename == undefined) {
                                displayBefore = "  "
                            } else {
                                displayBefore = before[0].filename;
                            }
                            displayAfter = $(".kn-asset-current").text();
                        } else {
                            if (Array.isArray(before)) {
                                for (let object of before) {
                                    displayBefore += " " + object.identifier;
                                }
                                for (let i = 0; i < after.length; i++) {
                                    displayAfter += " " + after[i].innerText;
                                }
                            } else {
                                displayBefore = before
                                displayAfter = after
                            }
                        }
                        $("#tbody-modal").append(`
                        <tr>
                            <td data-column-index="0">
                                <span>${title}</span>
                            </td>
                            <td data-column-index="1">
                                <span>${displayBefore}</span>
                            </td>
                            <td data-column-index="2">
                                <span>${displayAfter}</span>
                            </td>
                        </tr>
                    `);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        const customModal = function (callback) {
            const modalHtml = '<div id="custom-modal-change-plan" class="kn-modal-bg" style="top: 0px; z-index: 2000; display: block;">  ' +
                '     <div class="kn-modal default" style="display: block;">  ' +
                '       <header class="modal-card-head">  ' +
                '         <h1 class="modal-card-title">Contract Review</h1><button class="delete close-modal" id="close-custom-modal"></button></header>  ' +
                '       <section class="modal-card-body kn-page-modal" id="kn-page-modal-0">  ' +
                '         <div class="kn-scene kn-container" id="custom-modal">  ' +
                '           <div class="kn-form kn-view view_96" id="view_96">  ' +
                '             <div class="view-header">  ' +
                `               <table class="kn-table kn-table-table knTable is-bordered is-striped knTable--borders knTable--spacing-medium knTable--striped can-overflow-x">
                                <thead>
                                    <tr>
                                        <th>Modified Fields</th>
                                        <th>Before</th>
                                        <th>After</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody-modal">
                                </tbody>
                            </table>` +
                '             </div>  ' +
                '             <form action="#" method="post" novalidate="">  ' +
                '               <div class="kn-submit">  ' +
                '                 <button class="kn-button is-primary" type="submit" id="confirm-custom-modal">Apply New Contract</button>  ' +
                '               </div>  ' +
                '             </form>  ' +
                '           </div>  ' +
                '         </div>  ' +
                '       </section>  ' +
                '     </div>  ' +
                '  </div>  ';
            $('body .kn-content').first().append(modalHtml)
                .ready(function () {

                    $('#close-custom-modal').click(function (e) {
                        e.preventDefault();
                        $('#custom-modal-change-plan').remove();
                    });

                    $('#confirm-custom-modal').click(function (e) {
                        e.preventDefault();
                        callback();
                        $('#custom-modal-change-plan').remove();
                    });
                });
        };

        $(document).on("knack-view-render.view_3733", async function (e, view, record) {
            lib.waitFormView(view.key, async function () {
                try {
                    //this wait until finish of rendering the edit worker status button
                    // lib.waitFormView("view_3591", function () { console.log("loaded message warning") });
                    const form = $(`#${view.key} form`);
                    const button = $(`#${view.key} button:submit`);
                    const idContract = Knack.hash_vars;
                    if (idContract.id != undefined) {
                        lib.showSpinner();
                        const dataContract = await lib.findById(
                            lib.OBJECTS_IDS.Contract,
                            idContract.id
                        );
                        if (!dataContract) {
                            lib.hideSpinner();
                            throw new Error("We can't bring the data");
                        } else {
                            let dataToAutopopulate;
                            setTimeout(function () {
                                dataToAutopopulate = sortDataForm(dataContract);
                                autopupuledForm(view, dataToAutopopulate);
                                if (dataContract.field_793_raw) {
                                    $(`#${view.key}-field_793`).change();
                                }
                                if (dataContract.field_794_raw) {
                                    $(`#${view.key}-field_794`).change();
                                }
                                if (dataContract.field_795_raw) {
                                    $(`#${view.key}-field_795`).change();
                                }
                                if (dataContract.field_1432_raw) {
                                    $(`#field_1432`).change();
                                }

                                //$(`#${view.key} #field_1539`).change(function () {
                                //  $("#kn-input-field_1147").hide();
                                //});
                                $("#field_1539").change();
                                $("#kn-input-field_53").hide();
                                $("#kn-input-field_1147").remove();
                                //$("#kn-input-field_1190").click(function () { $("#kn-input-field_1147").hide() });

                                $("#kn-input-field_1759").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_1761").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_688").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_687").css({ "position": "absolute", "left": "100000px" });
                                lib.changeInputToOnlyRead("kn-input-field_47", "Buyer", dataContract.field_47);
                                lib.changeInputToOnlyRead("kn-input-field_51", "Supplier", dataContract.field_51);
                                lib.changeInputToOnlyRead("kn-input-field_338", "Worker", dataContract.field_338);

                                messageOldValues("kn-input-field_1190 label", "Start Date (previous contract)", dataContract.field_53);
                                messageOldValues("kn-input-field_54 label", "End Date (previous contract)", dataContract.field_54);
                            }, 1000);
                            if (dataContract.field_1796 == "Yes") {
                                setTimeout(function () {
                                    $("#kn-input-field_800").hide();
                                    $("#kn-input-field_801").hide();
                                    $("#kn-input-field_802").hide();
                                }, 1000);
                            }
                            //console.log(dataContract)
                            button.click(async function (e) {
                                e.preventDefault();
                                let currentValues = getCurrentValues(view);
                                customModal(function sendForm() {
                                    $("#kn-input-field_47").show();
                                    $("#kn-input-field_51").show();
                                    $("#kn-input-field_338").show();
                                    setTimeout(form.submit(), 1000);
                                })
                                await showChangedRecords(dataToAutopopulate, currentValues, false);
                            });
                        }
                    }
                    //else {
                    //  $("#kn-input-field_1432, #kn-input-field_1433, #kn-input-field_1437, #kn-input-field_1438").hide();
                    //}
                } catch (error) {
                    lib.hideSpinner();
                    $(`#${view.key}`).prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Error autopopulating form, please reload the page and try again")))
                            )
                    );
                    console.log(error);
                }
            });
        });

        $(document).on("knack-view-render.view_3736", async function (e, view, record) {
            lib.waitFormView(view.key, async function () {
                try {
                    //this wait until finish of rendering the edit worker status button
                    // lib.waitFormView("view_3591", function () { console.log("loaded message warning") });
                    const form = $(`#${view.key} form`);
                    const button = $(`#${view.key} button:submit`);
                    const idContract = Knack.hash_vars;
                    if (idContract.id != undefined) {
                        lib.showSpinner();
                        const dataContract = await lib.findById(
                            lib.OBJECTS_IDS.Contract,
                            idContract.id
                        );
                        if (!dataContract) {
                            lib.hideSpinner();
                            throw new Error("We can't bring the data");
                        } else {
                            let dataToAutopopulate;
                            setTimeout(function () {
                                dataToAutopopulate = sortDataForm(dataContract);
                                autopupuledForm(view, dataToAutopopulate);
                                if (dataContract.field_793_raw) {
                                    $(`#${view.key}-field_793`).change();
                                }
                                if (dataContract.field_794_raw) {
                                    $(`#${view.key}-field_794`).change();
                                }
                                if (dataContract.field_795_raw) {
                                    $(`#${view.key}-field_795`).change();
                                }
                                if (dataContract.field_1432_raw) {
                                    $(`#field_1432`).change();
                                }

                                //function hideElement() {
                                //  setTimeout(function () { $("#kn-input-field_1147").hide() }, 500);
                                //}

                                //$(`#${view.key} #field_1539`).change(function () {
                                //  $("#kn-input-field_1147").hide();
                                //});
                                $("#field_1539").change();
                                $("#kn-input-field_53").hide();
                                $("#kn-input-field_1147").remove();
                                //$("#kn-input-field_1190").click(function () { $("#kn-input-field_1147").hide() });

                                $("#kn-input-field_1759").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_1761").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_688").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_687").css({ "position": "absolute", "left": "100000px" });
                                lib.changeInputToOnlyRead("kn-input-field_47", "Buyer", dataContract.field_47);
                                lib.changeInputToOnlyRead("kn-input-field_51", "Supplier", dataContract.field_51);
                                lib.changeInputToOnlyRead("kn-input-field_338", "Worker", dataContract.field_338);

                                messageOldValues("kn-input-field_1190 label", "Start Date (previous contract)", dataContract.field_53);
                                messageOldValues("kn-input-field_54 label", "End Date (previous contract)", dataContract.field_54);
                            }, 1000);
                            if (dataContract.field_1796 == "Yes") {
                                setTimeout(function () {
                                    $("#kn-input-field_800").hide();
                                    $("#kn-input-field_801").hide();
                                    $("#kn-input-field_802").hide();
                                }, 1000);
                            }
                            //console.log(dataContract)
                            button.click(async function (e) {
                                e.preventDefault();
                                let currentValues = getCurrentValues(view);
                                customModal(function sendForm() {
                                    $("#kn-input-field_47").show();
                                    $("#kn-input-field_51").show();
                                    $("#kn-input-field_338").show();
                                    setTimeout(form.submit(), 1000);
                                })
                                await showChangedRecords(dataToAutopopulate, currentValues, false);
                            });
                        }
                    }
                    //else {
                    //  $("#kn-input-field_1432, #kn-input-field_1433, #kn-input-field_1437, #kn-input-field_1438").hide();
                    //}
                } catch (error) {
                    lib.hideSpinner();
                    $(`#${view.key}`).prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Error autopopulating form, please reload the page and try again")))
                            )
                    );
                    console.log(error);
                }
            });
        });

        $(document).on("knack-view-render.view_3738", async function (e, view, record) {
            lib.waitFormView(view.key, async function () {
                try {
                    //this wait until finish of rendering the edit worker status button
                    // lib.waitFormView("view_3591", function () { console.log("loaded message warning") });
                    const form = $(`#${view.key} form`);
                    const button = $(`#${view.key} button:submit`);
                    const idContract = Knack.hash_vars;
                    if (idContract.id != undefined) {
                        lib.showSpinner();
                        const dataContract = await lib.findById(
                            lib.OBJECTS_IDS.Contract,
                            idContract.id
                        );
                        if (!dataContract) {
                            lib.hideSpinner();
                            throw new Error("We can't bring the data");
                        } else {
                            let dataToAutopopulate;
                            setTimeout(function () {
                                dataToAutopopulate = sortDataForm(dataContract);
                                autopupuledForm(view, dataToAutopopulate);
                                if (dataContract.field_793_raw) {
                                    $(`#${view.key}-field_793`).change();
                                }
                                if (dataContract.field_794_raw) {
                                    $(`#${view.key}-field_794`).change();
                                }
                                if (dataContract.field_795_raw) {
                                    $(`#${view.key}-field_795`).change();
                                }
                                if (dataContract.field_1432_raw) {
                                    $(`#field_1432`).change();
                                }
                                $("#field_1539").change();
                                //$("#kn-input-field_53").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_1147").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_1759").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_1761").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_688").css({ "position": "absolute", "left": "100000px" });
                                $("#kn-input-field_687").css({ "position": "absolute", "left": "100000px" });
                                lib.changeInputToOnlyRead("kn-input-field_47", "Buyer", dataContract.field_47);
                                lib.changeInputToOnlyRead("kn-input-field_51", "Supplier", dataContract.field_51);
                                lib.changeInputToOnlyRead("kn-input-field_338", "Worker", dataContract.field_338);

                                messageOldValues("kn-input-field_53", "Start Date (previous contract)", dataContract.field_53);
                                messageOldValues("kn-input-field_54", "End Date (previous contract)", dataContract.field_54);

                            }, 1000);
                            //field_1769 is SS Buyer? in contract object 
                            if (dataContract.field_1796 == "Yes") {
                                setTimeout(function () {
                                    $("#kn-input-field_800").hide();
                                    $("#kn-input-field_801").hide();
                                    $("#kn-input-field_802").hide();
                                }, 1000);
                            }
                            //console.log(dataContract)
                            button.click(async function (e) {
                                e.preventDefault();
                                let currentValues = getCurrentValues(view);
                                customModal(function sendForm() {
                                    $("#kn-input-field_47").show();
                                    $("#kn-input-field_51").show();
                                    $("#kn-input-field_338").show();
                                    setTimeout(form.submit(), 1000);
                                })
                                await showChangedRecords(dataToAutopopulate, currentValues, true);
                            });
                        }
                    }
                    //else {
                    //  $("#kn-input-field_1432, #kn-input-field_1433, #kn-input-field_1437, #kn-input-field_1438").hide();
                    //}
                } catch (error) {
                    lib.hideSpinner();
                    $(`#${view.key}`).prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Error autopopulating form, please reload the page and try again")))
                            )
                    );
                    console.log(error);
                }
            });
        });

        const messageOldValues = (id, label, value) => {
            $(`#${id}`).before(`
                <div class="kn-input kn-read-only kn-input-short_text control" >
                    <label class="label kn-label">
                        <span>${label}</span>
                    </label>
                    ${value}
                </div>
                `);
        }

        // New contracts form view code finish

        // new edit contracts page start
        $(document).on("knack-view-render.view_3746", async function (e, view, record) {
            const idContract = Knack.hash_id;
            const href = $(`#${view.key} > .control > .kn-link-1`).attr("href");
            $(`#${view.key} > .control > .kn-link-1`).removeAttr("href").attr("href", `${href}?id=${idContract}`);
            $(`#${view.key} > .control > .kn-link-1`).attr("id", "create-new-contract").addClass("is-primary");
        });

        $(document).on("knack-view-render.view_3744", async function (event, view, record) {
            lib.showSpinner()
            // const idContract = Knack.hash_id;
            let idAndJobtitle = Knack.models.view_3747.attributes;

            //hide details view located after edit form view
            $("#view_3747").hide();
            $("#view_3748").hide();
            if (idAndJobtitle.field_349 != undefined) { // contract id
                const supplier = $("#kn-input-field_1445");
                supplier.before(`
                    <div class="kn-input kn-read-only kn-input-short_text control" >
                    <label style="margin-bottom: 5px;" class="label kn-label">
                    <span>Contract ID</span>
                    </label>
                        ${idAndJobtitle.field_349}
                    </div>`);
            }
            if (idAndJobtitle.field_720 != undefined) { // worker status field
                $("#kn-input-field_338").after(`
                <div class="kn-input kn-read-only kn-input-short_text control" >
                    <label style="margin-bottom: 5px;" class="label kn-label">
                    <span>Worker Status</span>
                    </label>
                        <p id="worker-status">${idAndJobtitle.field_720_raw}</p>
                </div`)
            }
            //This link MUST change by new link in production app or by the link change worker status located in the scene_544
            //REMEMBER! this part will change, now it will be taking the attribute href of  button worker status located in the bottom of the page and put it in the following block of core 
            const href = $("#view_3748 a").attr("href")
            $("#worker-status").after(`
            <a href=${href}
                class="kn-add-option" style="margin-top: -10px;" title="Change Worker Status">
                <i class="fa fa-pencil-square-o"></i> Edit Worker Status
            </a>`);
            //set value in job title depending of field_696 (job title direct contract is blank)
            // if (idAndJobtitle.field_696 == undefined) {
            //     $("#field_696").val(idAndJobtitle.field_2202);
            // }
            $(`#${view.key} #field_696`).val(idAndJobtitle.field_401);
            lib.hideSpinner();
            const form = $(`#${view.key} form`);
            const button = $(`#${view.key} button:submit`);
            button.click(async function (e) {
                e.preventDefault();
                let jobOwner = $(`#${view.key}-field_1185 option:selected`).val();
                if (jobOwner == "") {
                    lib.removeMessages(view.key);
                    lib.showErrorMessage(
                        view.key,
                        "Job owner can't be blank, please fill this field"
                    );
                    alert("Job owner can't be blank, please fill this field")
                    return
                }
                // if (idAndJobtitle.field_692 != "Yes") {
                //     let idRequisition = idAndJobtitle.field_341_raw[0].id;
                //     await lib.update(lib.OBJECTS_IDS.Requisition,
                //         idRequisition,
                //         JSON.stringify({
                //             field_87: $("#field_696").val(),
                //         })
                //     )
                //     $("#field_696").val("")
                // }
                form.submit();
            })
        });

        // new edit contracts finish

        // hide "accept candidate" button in requisition page if the requisition status is accepted
        $(document).on("knack-view-render.view_3371", async function (e, view, record) {
            lib.waitFormView("view_978", function () {
                const proposalStatus = $("#view_978 .field_214 .kn-detail-body").text();
                if (proposalStatus == "Accepted") {
                    $(`#${view.key} .kn-link-1`).hide()
                }
            });
        });
        // ----------------------------------------------------------------------------------------- //

        // live calculations OT and DT rates contract details page supplier // 
        const ratesDisplayCalculations = (field, record) => {
            const currentValue = record[`${field}_raw`];
            const mspDollarFee = record["field_1424_raw"];
            const percentageFee = record["field_803_raw"];
            const result = (currentValue - mspDollarFee) * (1 - percentageFee);
            return Math.ceil(result * 100) / 100
        }

        // $(document).on("knack-view-render.view_821", async function (e, view, record) {
        //     const contractOvertimeRateField = "field_478";
        //     const contractDoubleTimeRateField = "field_479";
        //     $(`#${view.key} .${contractOvertimeRateField} .kn-detail-body span span`).text(`$${ratesDisplayCalculations(contractOvertimeRateField, record)}`);
        //     $(`#${view.key} .${contractDoubleTimeRateField} .kn-detail-body span span`).text(`$${ratesDisplayCalculations(contractDoubleTimeRateField, record)}`);
        // });
        // ----------------------------------------------------------------- // 
        //Intelcolm changes

        // check MappedID format in proposals (when the buyer is not Intelcom)
        $(document).on("knack-view-render.view_3792", function (event, view, data) {
            var form = $(`#view_3792 form`);
            var submit = form.find("button:submit");

            submit.click(function (ev) {
                ev.preventDefault();
                var input = $("input[name='field_2229']");
                var inputValue = input.val();
                if (/^[a-zA-Z]{4}[0-9]{6}$/.test(inputValue)) {
                    var newValue = inputValue.toUpperCase();
                    input.val(newValue);
                    form.submit();
                } else {

                    lib.showErrorMessage(
                        "view_3792",
                        "MappingID must be 4 letters and 6 digits"
                    );

                }

            });
        });

        $(document).on("knack-view-render.view_3777", function (e, v, record) {

            lib.waitFormViewform("#view_3778 a.kn-button", function () {

                $(`#${v.key} .level .level-left`).append(
                    $("<div>")
                        .append(
                            $("<a>")
                                .addClass("kn-button is-button is-small")
                                .attr('id', 'Create-Roster')
                                .attr('href', $("#view_3778 a.kn-button").attr("href"))
                                .append($("<span>").html("Create Roster"))
                        )
                );
            });

        });

        // check MappedID format in proposals (when the buyer is not Intelcom)
        $(document).on("knack-view-render.view_3808", function (event, view, data) {
            var form = $(`#view_3808 form`);
            var submit = form.find("button:submit");

            submit.click(function (ev) {
                ev.preventDefault();
                var input = $("input[name='field_2229']");
                var inputValue = input.val();
                if (/^[a-zA-Z]{4}[0-9]{6}$/.test(inputValue)) {
                    var newValue = inputValue.toUpperCase();
                    input.val(newValue);
                    form.submit();
                } else {

                    lib.showErrorMessage(
                        "view_3808",
                        "MappingID must be 4 letters and 6 digits"
                    );

                }

            });
        });

        var checkboxes_search2;
        $(document).on("knack-view-render.view_3809", function (event, view, proposals) {


            if (proposals.length > 0) {
                $("#" + view.key + " table thead tr").prepend(
                    $("<th>").append(
                        $("<input>")
                            .addClass("select-all")
                            .attr({
                                type: "checkbox",
                                checked: false,
                            })
                            .click(lib.SelectAllCheckboxes)
                    )
                );

                $("#" + view.key + " table tbody tr").prepend(
                    $("<td>").append(
                        $("<input>").addClass("select-proposal").attr({
                            type: "checkbox",
                            checked: false,
                        })
                    )
                );

                if (checkboxes_search2) {
                    for (var i = 0; i < checkboxes_search2.length; i++) {
                        $(
                            "#view_3809 tr#" +
                            checkboxes_search2[i].id +
                            " .select-proposal"
                        ).attr("checked", true);
                    }
                }

                var visibleTable = $("#view_3809 table tbody tr");
                visibleTable.each(function (
                    key,
                    value
                ) {
                    // console.log($("#" + value.id + " td[class='field_2235 cell-edit']"))
                    var proposalStatus = $("#" + value.id + " td[class='field_2229 cell-edit']")[0].innerText.trim();
                    if (proposalStatus === "") {
                        $(value).find("input:checkbox").remove()
                    }
                })
            } else {
                $("#view_3809 .kn-td-nodata").show();
                setTimeout(function () {
                    $("#view_3809 .kn-td-nodata").show();
                }, 400);
            }
            $("#view_3809 .kn-button.search").hide();
            $("#view_3809 td:nth-last-child(-n+2)").hide();
            $("#view_3809 th:nth-last-child(-n+2)").hide();
            $("#view_3809 .table-keyword-search p").append(
                '<a class="kn-button" id="custom_search_view_2285">search</a>'
            );
            $("#custom_search_view_2285").click(function (ev) {
                ev.preventDefault();
                checkboxes_search2 = $(".select-proposal:checked").closest("tr");
                $("#view_3809 .kn-button.search").click();
            });

            var current_shift = $(
                "#view_3809 .kn-records-nav.below .js-filter-menu ul li.is-active"
            ).text();
            switch (current_shift) {
                case "0 Work Shifts":
                    $("#view_3388 #field_2043").val("4");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "1 Work Shift":
                    $("#view_3388 #field_2043").val("1");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "2 Work Shifts":
                    $("#view_3388 #field_2043").val("2");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "3 Work Shifts":
                    $("#view_3388 #field_2043").val("3");
                    $("#view_3388 #field_2042").val("No");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
                case "Permanent Hire":
                    $("#view_3388 #field_2043").val("5");
                    $("#view_3388 #field_2042").val("Yes");
                    $("#view_3388 #field_2042").trigger("change");
                    break;
            }
        }
        );

        $(document).on("knack-scene-render.scene_1489", async function (event, view, user) {

            const { total_records } = Knack.models.view_3777.data;
            if (total_records <= 1500) {
                lib.waitFormView("kn-input-field_2233", async function () {
                    $("#kn-input-field_2233").children().hide();
                    $("#kn-input-field_2233").css("word-break", "break-all")

                    const filters = Knack.models.view_3777.view.filters;
                    const rules = filters?.rules ?? [];
                    const viewFilters = rules.length ? filters : false;

                    const form = $("#view_3814 form");
                    const submit = form.find("button:submit");
                    submit.click(async (e) => {
                        e.preventDefault();
                        const inputEmail = $("#field_2235").val()
                        const inputSubject = $("#field_2242").val()
                        const inputFileName = $("#field_2231").val()
                        const inputFile = $("#kn-input-field_2233 input.file");

                        if (inputFileName.trim() && inputFile && inputEmail && inputSubject) {
                            $(`#view_3814 form .kn-submit`).remove()
                            lib.showSuccessMessage("view_3814", "Generating CSV File")
                            try {
                                const obj = {
                                    filename: inputFileName,
                                    viewFilters,
                                    token: Knack.getUserToken(),
                                    view: "3815",
                                    scene: "1400"
                                }

                                const csvURL = await $.ajax({
                                    type: "POST",
                                    url: lib.CONEXIS_SERVER + "csv-accepted-clients-intelcolm",
                                    //url: "https://4ba4-186-170-103-78.ngrok.io/api/v1/" + "csv-accepted-clients-intelcolm",
                                    contentType: "application/json",
                                    dataType: "json",
                                    data: JSON.stringify(obj),
                                });

                                console.log(csvURL);
                                $("#kn-input-field_2233 input.file").val(csvURL.id);
                                $("#kn-input-field_2233").append(csvURL.inputFileName);

                                const link = document.createElement("a");
                                link.href = csvURL.public_url;
                                link.download = `${inputFileName}.csv`
                                link.click()

                            } catch (err) {
                                lib.showErrorMessage("view_3814", "Error Generating CSV file, try again later");
                            }
                        }
                        form.submit();
                    });


                });
            } else {
                $(`#view_3814`).prepend(
                    $("<div>")
                        .attr("id", "custom-errors-msg")
                        .addClass("kn-message is-error")
                        .append(
                            $("<span>")
                                .addClass("kn-message-body")
                                .append($("<p>").append($("<strong>").html("There are more than 1500 records to export. Please filter down the list to have 1500 or fewer records")))
                        )
                );
                $(`#view_3814 .view-header`).remove()
                $(`#view_3814 form`).remove()

            }

        });
        //---------------------------------------------------------------


        $(document).on("knack-view-render.view_3774", function (event, view, data) {
            var form = $(`#view_3774 form`);
            var submit = form.find("button:submit");

            submit.click(function (ev) {
                ev.preventDefault();
                var input = $("input[name='field_2229']");
                var inputValue = input.val();
                if (/^[a-zA-Z]{4}[0-9]{6}$/.test(inputValue)) {
                    var newValue = inputValue.toUpperCase();
                    input.val(newValue);
                    form.submit();
                } else {

                    lib.showErrorMessage(
                        "view_3774",
                        "MappingID must be 4 letters and 6 digits"
                    );

                }

            });
        });

        // intelcom site list start
        $(document).on("knack-view-render.view_3817", function (e, v, record) { //change in prod

            lib.waitFormViewform("#view_3820 a.kn-button", function () {

                $(`#${v.key} .level .level-left`).append(
                    $("<div>")
                        .append(
                            $("<a>")
                                .addClass("kn-button is-button is-small")
                                .attr('id', 'Send-Worker-List-Button')
                                .attr('href', $("#view_3820 a.kn-button").attr("href"))
                                .append($("<span>").html("Send Worker List"))
                        )
                );
            });
            // console.log("data=>",$("#view_3817 .knTableColumn__link .col-4"))
            let view = { key: "view_3817" }
            const requisition = Knack.models.view_3580.attributes;
            let proposals = Knack.models["view_3817"].data.models.map(function (r) {
                return r.toJSON();
            });
            proposals = proposals.filter((p) => {
                return p.field_214 != "Completed" && p.field_214 != "Accepted" && p.field_214 != "Rejected" && p.field_2229 != ""
            });
            $(`#${view.key}` + " table thead tr").prepend(
                $("<th>").append(
                    $("<input>")
                        .addClass("select-all-te")
                        .attr("type", "checkbox")
                        .click(lib.selectAllTE)
                )
            );
            $(`#${view.key}` + " table tbody tr:not(.kn-table-group)").prepend(
                $("<td>").append(
                    $("<input>").addClass("select-te").attr("type", "checkbox")
                )
            ).ready(function () {
                $(`#${view.key}` + " table tbody tr").each(function (
                    key,
                    value
                ) {
                    var exists = false;
                    proposals.forEach(function (p) {
                        if (p.id == value.id) {
                            exists = true;
                        }
                    });
                    if (!exists) {
                        $(value).find("input:checkbox").remove();
                    }
                });
            });

        });

        $(document).on("knack-view-render.view_3818", function (event, view, data) {
            var form = $(`#view_3818 form`);
            var submit = form.find("button:submit");

            submit.click(function (ev) {
                ev.preventDefault();
                var input = $("input[name='field_2229']");
                var inputValue = input.val();
                if (/^[a-zA-Z]{4}[0-9]{6}$/.test(inputValue)) {
                    var newValue = inputValue.toUpperCase();
                    input.val(newValue);
                    form.submit();
                } else {

                    lib.showErrorMessage(
                        "view_3818",
                        "MappingID must be 4 letters and 6 digits"
                    );

                }

            });
        });


        // intelcom site list finish

        // intelcom mass proposal acceptance/rejection start
        // intelcom proposal acceptance code start
        $(document).on("knack-view-render.view_3819", async function (e, view, record) { //change in prod

            lib.waitFormView("view_3580", async function () {
                //try {

                $(`#${view.key}`).append(`<button class="kn-button is-primary accept-proposals" type="submit">Accept</button>`);
                $(`#${view.key}`).append(`<button class="kn-button is-primary reject-proposals" type="submit" style="margin-left: 10px;">Reject</button>`);
                const acceptButton = $('.accept-proposals');
                const rejectButton = $('.reject-proposals');
                // const isRunning = $("#field_2181").val(); //change prod
                const isRunning = Knack.views["view_3580"].model.attributes.field_2186;
                console.log("test is running: ", isRunning)
                if (isRunning == "Yes") {
                    lib.disabledButton(acceptButton, true);
                    lib.disabledButton(rejectButton, true);
                    $(`#${view.key}`).prepend(
                        $("<div>")
                            .attr("id", "custom-successful-msg")
                            .addClass("kn-message")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Processing  records, when this process finished you will receive an email!")))
                            )
                    );
                    return
                }

                const buttons = document.querySelectorAll(`#${view.key} .kn-button.is-primary`);
                for (let button of buttons) {
                    button.addEventListener("click", async function (e) {
                        lib.showSpinner();
                        $('.kn-message').remove();

                        const selectedProposals = $(".select-te:checked");

                        if (selectedProposals.length == 0) {
                            $(`#${view.key}`).prepend(
                                $("<div>")
                                    .attr("id", "custom-errors-msg")
                                    .addClass("kn-message is-error")
                                    .append(
                                        $("<span>")
                                            .addClass("kn-message-body")
                                            .append($("<p>").append($("<strong>").html("You must select at least one checkbox, please try again!")))
                                    )
                            );
                            lib.disabledButton(acceptButton, false);
                            lib.disabledButton(rejectButton, false);
                            lib.hideSpinner();
                            throw new Error;
                        }

                        let action = "";
                        if (this.className.includes("accept-proposals")) {
                            action = "accept"
                        } else {
                            action = "reject"
                        }

                        const idProposalsSelected = [];
                        for (let i = 0; i < selectedProposals.length; i++) {

                            const proposalObject = {
                                id: selectedProposals[i].parentNode.parentNode.id,
                                proposalID: selectedProposals[i].parentNode.parentNode.querySelector(".col-0 .level span:nth-child(2)").innerText,
                                workerName: selectedProposals[i].parentNode.parentNode.querySelector(".field_309 span:nth-child(1)").innerText,
                                supplier: selectedProposals[i].parentNode.parentNode.querySelector(".field_102 span:nth-child(1)").innerText,
                                supplierContactEmail: selectedProposals[i].parentNode.parentNode.querySelector(".field_14 span:nth-child(1) a").innerText,
                                proposalStatus: selectedProposals[i].parentNode.parentNode.querySelector(".field_214 span").innerText
                            }
                            idProposalsSelected.push(proposalObject);
                        }
                        lib.waitToken(0, async function (token, error) {
                            if (error) {
                                lib.hideSpinner();
                                alert("error getting token")
                                return
                            }

                            const payload = {
                                // token: Knack.getUserToken(),
                                token: token,
                                action: action,
                                email: Knack.getUserAttributes().values.email.email,
                                proposalsInfo: idProposalsSelected,
                                requisitionID: Knack.views["view_3580"].model.attributes.id, //change in prod
                                requisition: Knack.views["view_3580"].model.attributes.field_88, //change in prod
                                requisitionJobTitle: Knack.views["view_3580"].model.attributes.field_87.replaceAll("/", ""), //change in prod
                                blockView: true,
                            }
                            console.log("payload: ", payload)

                            try {
                                const response = await $.ajax({
                                    type: "POST",
                                    url: lib.CONEXIS_SERVER + "process-proposals",
                                    contentType: "application/json",
                                    dataType: "json",
                                    data: JSON.stringify(payload),
                                });
                                lib.hideSpinner();
                                $('.kn-message').remove();
                                $(`#${view.key}`).prepend(
                                    $("<div>")
                                        .attr("id", "custom-successful-msg")
                                        .addClass("kn-message")
                                        .append(
                                            $("<span>")
                                                .addClass("kn-message-body")
                                                .append($("<p>").append($("<strong>").html("Processing  records, when this process finished you will receive an email!")))
                                        )
                                );
                                lib.disabledButton(acceptButton, true);
                                lib.disabledButton(rejectButton, true);
                            } catch (error) {
                                lib.hideSpinner();
                                console.log(error);
                                $('.kn-message').remove();

                                $(`#${view.key}`).prepend(
                                    $("<div>")
                                        .attr("id", "custom-errors-msg")
                                        .addClass("kn-message is-error")
                                        .append(
                                            $("<span>")
                                                .addClass("kn-message-body")
                                                .append($("<p>").append($("<strong>").html("Error Connecting to the server, Please try again!")))
                                        )
                                );

                                lib.disabledButton(acceptButton, false);
                                lib.disabledButton(rejectButton, false);
                            }
                        });
                    });
                }

            });


        });


        $(document).on("knack-scene-render.scene_1503", async function (event, view, user) {

            const formView = "view_3821";
            if ($("#kn-scene_1503").parent().hasClass("modal-card-body")) {

                $(`#${formView} .kn-button`).attr("disabled", true)
                $(`#${formView}`).prepend(
                    $("<div>")
                        .addClass("kn-message success")
                        .append(
                            $("<span>")
                                .addClass("kn-message-body")
                                .append($("<p>").append($("<strong>").html("Generating CSV File")))
                        )
                );



                try {
                    // server endpoint to generate csv file from selected data
                    let requisitionName = Knack.views["view_3580"].model.attributes.field_87.replaceAll("/", "");
                    requisitionName = requisitionName.replace(/[^a-z0-9\s]/gi, '');
                    const proposals = Knack.views["view_3817"].model.data.models ?? Knack.views["view_3817"].model.data.models;
                    let workerInformation = [];

                    for (let proposal of proposals) {
                        const proposalData = proposal.attributes;
                        const currentWorker = { name: "", supplier: "", In: "", Out: "", TotalHours: "", workerSignature: "", supervisorInitials: "", siteComments: "" }
                        if (proposalData.field_214 == "Accepted" || proposalData.field_214 == "Completed") {
                            currentWorker.name = proposalData.field_2308_raw ? proposalData.field_2308_raw.trim() : "";
                            currentWorker.supplier = proposalData.field_102_raw[0] ? proposalData.field_102_raw[0].identifier : "";
                            workerInformation.push(currentWorker);
                        }
                    }

                    const obj = {
                        fileName: requisitionName,
                        workers: workerInformation,
                        token: Knack.getUserToken(),
                    };

                    // console.log("payoad:", obj)

                    let csvURL = await $.ajax({
                        type: "POST",
                        //url: lib.CONEXIS_SERVER + "generateIntelcomSiteList",
                        //url: 'https://avvera.download/api/v1/' + "generateIntelcomSiteList",
                        url: "https://scorecard.conexisvms.com/api/v1/" + "generateIntelcomSiteList",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(obj),
                    });

                    // console.log("server csv response: ", csvURL);

                    lib.waitFormView("kn-input-field_2163", function () {
                        $("#kn-input-field_2163 input.file").val(csvURL.csvID); // change prod
                        $("#kn-input-field_2163").children().hide();
                        $("#kn-input-field_2163").append(csvURL.csvName);
                        $("#kn-input-field_2163").css("word-break", "break-all")

                        $(`#${formView} .kn-button`).attr("disabled", false);
                        $(`#${formView} .kn-message.success`).remove();

                        $("#field_2164").val("Todays Site List"); //change prod
                        $("#field_2165").val("Here is your site list for today"); //change prod

                        $(`#${formView} .kn-button`).click((e) => {
                            if (!$("#field_2187").val() && !$("#field_2188").val()) { //change prod
                                e.preventDefault();
                                alert("At least one of the email fields must be entered!");
                            }
                        });


                    });

                } catch (e) {
                    $(`#${formView} .kn-message success`).remove();
                    $(`#${formView}`).prepend(
                        $("<div>")
                            .attr("id", "custom-errors-msg")
                            .addClass("kn-message is-error")
                            .append(
                                $("<span>")
                                    .addClass("kn-message-body")
                                    .append($("<p>").append($("<strong>").html("Error Generating CSV file, try again later")))
                            )
                    );
                    console.log("error generating csv: ", e);
                }

            } else {
                console.log("error message no modal")
                $(`#${formView}`).prepend(
                    $("<div>")
                        .attr("id", "custom-errors-msg")
                        .addClass("kn-message is-error")
                        .append(
                            $("<span>")
                                .addClass("kn-message-body")
                                .append($("<p>").append($("<strong>").html("No Requisition selected, there is no CSV generated, please generate the CSV from the requisition details page")))
                        )
                );

            }
        });


        //Update on 

        // Knack events for insert and update
        $(document).on('knack-form-submit.any', async function (event, view) {
            //createRecordLog(view.action, view.source.object);


            try {
                console.log(view)
                console.log('event', event)

                let object = view.source.object

                let date = new Date();

                let objects = {
                    object_1: "field_2260",
                    object_2: "field_2261",
                    object_3: "field_2262",
                    object_4: "field_2263",
                    object_6: "field_2264",
                    object_47: "field_2265",
                    object_10: "field_2266",
                    object_11: "field_2267",
                    object_12: "field_2268",
                    object_25: "field_2269",
                    object_26: "field_2270",
                    object_27: "field_2302",
                    object_31: "field_2271",
                    object_33: "field_2272",
                    object_37: "field_2273",
                    object_41: "field_2274",
                    object_42: "field_2275",
                    object_35: "field_2276",
                    object_44: "field_2277",
                    object_45: "field_2278",
                    object_49: "field_2279",
                    object_51: "field_2280",
                    object_56: "field_2281",
                    object_58: "field_2282",
                    object_57: "field_2283",
                    object_61: "field_2284",
                    object_54: "field_1968",
                    object_60: "field_2285",
                    object_67: "field_2286",
                    object_70: "field_2155",
                    object_76: "field_2287",
                    object_77: "field_2288",
                    object_40: "field_2289",
                    object_36: "field_2290",
                    object_29: "field_2291",
                    object_24: "field_2292",
                    object_20: "field_2293",
                    object_21: "field_2294",
                    object_22: "field_2295",
                    object_39: "field_2296",
                    object_13: "field_2297",
                    object_23: "field_2298",
                    object_30: "field_2299",
                    object_74: "field_2300",
                }


                if (!object) {
                    return
                }

                if (!objects[object]) {
                    return
                }

                if (!view.scene.scene_id) {
                    console.log('no scene id, error to update record date, view.scene.scene_id')
                    return
                }


                let res = await lib.update(
                    view.source.object,
                    view.scene.scene_id,
                    JSON.stringify({
                        [objects[object]]: date,
                    })
                );
                //lib.refreshView(view.key);

                console.log('updated record', res)
            } catch (e) {
                console.log('error', e);
            }

        });


        // Knack event for delete triggered by all views
        $(document).on('knack-record-delete.any', function (event, view, record) {

            try {

                // console.log(record)
                //  console.log('delete', view.source.object);

                //lib.OBJECTS_ID.Users
                lib.create("object_78",
                    JSON.stringify({ "field_2303": record.id, "field_2305": view.source.object })
                );

            } catch (e) {
                console.log('error adding deleted record', e);
            }

        });

        $(document).on("knack-view-render.view_821", async function (e, view, record) {
            const isPermantHire = Knack.views.view_821.record.field_2052;
            if (isPermantHire === ("Yes")) {

                $("#view_821 .field_42").hide();

                $("#view_821 .field_800").hide();

                $("#view_821 .field_802").hide();

                $("#view_821 .field_801").hide();

                $("#view_821 .field_820").hide();


            } else {


                $("#view_821 .field_872").hide();

                $("#view_821 .field_1434").hide();

                $("#view_821 .field_2007").hide()

                const isDollar = Knack.views.view_821.record.field_800;

                if (isDollar === "Dollar Fee") {
                    $("#view_821 .field_802").hide();
                } else {
                    $("#view_821 .field_801").hide();
                }

            }
        });

        $(document).on("knack-view-render.view_970", async function (e, view, record) {
            const isPermantHire = Knack.views.view_970.record.field_2052;
            if (isPermantHire === "Yes") {

                $("#view_970 .field_42").hide();

                $("#view_970 .field_944").hide();

                $("#view_970 .field_800").hide();

                $("#view_970 .field_803").hide();

                $("#view_970 .field_801").hide();


            } else {


                $("#view_970 .field_2007").hide();

                $("#view_970 .field_2006").hide();

                $("#view_970 .field_2008").hide();


                $("#view_970 .field_872").hide();
                const isDollar = Knack.views.view_970.record.field_800;

                if (isDollar === "Dollar Fee") {
                    $("#view_970 .field_803").hide();
                } else {
                    $("#view_970 .field_801").hide();
                }

            }
        });

        $(document).on("knack-view-render.view_3891", function (event, view, records) {
            const isSelfServe = records['field_1763_raw'];
            removeManualInvoicesOption(view.key, isSelfServe);
        });

        $(document).on("knack-view-render.view_3892", function (event, view, records) {
            const isSelfServe = records['field_1763_raw'];
            removeManualInvoicesOption(view.key, isSelfServe);
        });

        $(document).on("knack-view-render.view_3893", function (event, view, records) {
            const isSelfServe = records['field_1763_raw'];
            removeManualInvoicesOption(view.key, isSelfServe);
        });

        $(document).on("knack-view-render.view_3894", function (event, view, records) {
            const isSelfServe = records['field_1763_raw'];
            removeManualInvoicesOption(view.key, isSelfServe);
        });



        function removeManualInvoicesOption(view, isSelfServe) {
            $(`#${view}`).hide();
            lib.waitFormViewform('#view_1580 .kn-link-4', function () {
                if (isSelfServe) {
                    $("#view_1580 .kn-link-4").hide();
                }
            });
        }



        $(document).on('knack-scene-render.any', function (event, scene) {

            const userAgentString = navigator.userAgent;
            const operaAgent = userAgentString.indexOf("OP") > -1;
            if (operaAgent) {
                lib.loadLibrary("blockUI", function () {
                    lib.$.blockUI({
                        message:
                            `<h3>Unfortunately, the browser you are using is not supported.<br/>
                         We recommend that you use Google Chrome for a better experience</h3><p>`,
                    });
                });
            }


        });


        // // Change view_1 to the view you want to listen to
        // $(document).on('knack-record-delete.view_1', function(event, view, record) {
        // // Do something after the record is deleted
        // alert('Deleted record with ID: ' + record.id);
        // });

        // // Change view_1 to the table view you want to listen to
        // $(document).on('knack-cell-update.view_1', function(event, view, record) {
        // // Do something after the inline edit
        // alert('updated a record for table view: ' + view.key);
        // });

        // // Change view_1 to the form view you want to listen to
        // $(document).on('knack-record-update.view_1', function(event, view, record) {
        // alert('Form submitted!');
        // });


    }

);

  //  callback();
//};

