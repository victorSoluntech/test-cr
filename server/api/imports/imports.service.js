const importUtils = require("./imports.utils");
const importsUseCases = require("./use-cases");
const importsKnackService = require("./imports.knack.service");
const contractsUseCases = require("../contracts/use-cases");
const contractAmendmentUseCases = require("../contract-amentments/use-cases");
const expenseCardsUseCases = require("../expense-cards/use-cases");
const costCenterUseCases = require("../cost-centers/use-cases");
const { handlePromisesSequentially } = require("../../util/promise-handler");
const { newDateWithTime, isSameDate } = require("../../util/dates");

// send to const file
const headers = [
  {
    mappingId: "Mapping ID",
    billType: "Bill TYpe (MC)",
    workShift: "Work Shift (MC)",
    hoursWorked: "Total Hours (number)",
    dateWorked: "Date Worked",
    cost_center: "Cost Center",
    errorId: "Error ID",
    errorMessage: "Error Description",
  },
];

/**
 * Asynchronously imports expense cards from a CSV file.
 *
 * @async
 * @function importExpenseCards
 * @param {Object} payload - The payload object containing the record and buyer information.
 * @param {Object} payload.record - The record object containing the CSV file to import.
 * @param {Object} payload.buyer - The buyer information.
 * @returns {Promise<void>} No return value.
 * @throws {Error} Throws an error if an error occurs while parsing the CSV file, checking for errors, or creating the time cards import.
 */
async function importExpenseCards(payload) {
  try {
    console.log("[importExpenseCards] start");

    const url = importUtils.getFileUrl(payload.record);
    const file = await importsKnackService.getFileContent(url);

    const lineItems = await expenseCardsUseCases.parseCSVLineItems(
      payload.record,
      payload.buyer,
      file
    );

    expenseCardsUseCases.checkCSVerrorsLineItems(lineItems); // TODO: sent to parseCSVLineItems

    return lineItems;
  } catch (error) {
    importsKnackService.deleteImportById(payload.record.id); // TODO: test if knack.delete its working

    throw new Error(error.message);
  }
}

// TODO: document function
async function importExpenseCardsWorkflow(lineItems, payload) {
  try {
    // 1. Create line items
    const [errors, lineItemsCreated, lineItemsFailed] =
      await handlePromisesSequentially(lineItems, createLineItem); // Use csvParsed directly

    console.log("lineItemsCreated", lineItemsCreated);
    console.log("lineItemsFailed", lineItemsFailed);
    console.log("errors", errors);

    // TODO: need to be fixed
    // 2. Create timecards from valid line items
    const {
      createdTimeCards,
      failedTimeCards,
      processedLineItems,
      failedProcessedLineItems,
    } = await handlePromisesSequentially(
      getUniqueContracts(lineItems),
      createExpenseCards,
      payload.record.field_2243_raw
    );

    console.log({
      createdTimeCards,
      failedTimeCards,
      processedLineItems,
      failedProcessedLineItems,
    });

    // 3. Prepare error messages
    // const errorMessage = errorsArray
    //   .map((error) => `- ${error.message}`)
    //   .join("\n");

    // TODO: need to be fixed
    // 4. Update import log with results
    // const body = await createImportLogBody({
    //   numberOfLineItemsImported,
    //   errorsArray,
    //   createdTimeCards,
    //   failedTimeCards,
    //   processedLineItems,
    //   failedProcessedLineItems,
    //   dataToWriteErrorsCsv,
    //   errorMessage,
    //   filename: payload.record.field_1486_raw.filename,
    // });

    // await importsKnackService.updateRecord(payload.record.id, body); // TODO: need to be fixed

    // TODO:
    // 5. Send notification email
    // await sendImportEmail(
    //   "https://us-api.knack.com/v1/pages/page_1303/views/view_3208/records/", //use a const
    //   payload.record.id
    // );

    // TODO:
    // 6. Update "updated on" field for the import log record
    // await importsKnackService.updateRecord(payload.record.id, {
    //   field_1968: new Date(),
    // });
  } catch (error) {
    console.error("Error during import:", error);
    // Handle errors gracefully, potentially logging, retrying, or notifying
  }
}

// TODO: sent to usecases
// TODO: document function
async function createLineItem(lineItem) {
  lineItem.contract = await contractsUseCases.findContractByMappingId(
    lineItem.mappingId,
    lineItem.dateWorked
  );

  lineItem.contractAmendment =
    await contractAmendmentUseCases.findContractAmendmentForLineItems(lineItem);

  lineItem.costCenter = costCenterUseCases.findCostCenterForLineItems(lineItem);

  importsUseCases.validateLineItem(lineItem);

  const createdLineItem = await expenseCardsUseCases.createLineItemFromCsv(
    lineItem
  );

  return createdLineItem;
}

// Helper function to create the import log body
// TODO: send to utils or use cases
async function createImportLogBody({
  numberOfLineItemsImported,
  errorsArray,
  createdTimeCards,
  failedTimeCards,
  processedLineItems,
  failedProcessedLineItems,
  dataToWriteErrorsCsv,
  errorMessage,
  filename,
}) {
  const data =
    dataToWriteErrorsCsv.length > 1
      ? await generateFile(dataToWriteErrorsCsv, filename).file.id
      : null;
  return {
    field_1916: numberOfLineItemsImported,
    field_1917: errorsArray.length,
    field_1911: errorMessage,
    field_1910: "Finished",
    field_2244: createdTimeCards,
    field_2245: failedTimeCards,
    field_2246: failedProcessedLineItems,
    field_2247: processedLineItems,
    field_1918: data,
  };
}

// TODO: sent to utils
const CreateLineItemObject = (lineItem) => {
  return {
    mappingId: lineItem.mappingId,
    billType: lineItem.billType,
    workShift: lineItem.workShift,
    hoursWorked: lineItem.hoursWorked,
    dateWorked: lineItem.dateWorked,
    cost_center: lineItem.costCenter,
  };
};

/**
 * The function `getUniqueContracts` takes an array of imported line items and returns an array of
 * unique contracts based on their contract ID and start date.
 * @param lineItems - The `importedLineItems` parameter is an array of objects. Each object
 * represents a line item and contains information about a contract. The structure of each object is as
 * follows:
 * @returns an array of unique contracts. Each contract is represented as an object with two
 * properties: "contractId" and "startDate".
 */
function getUniqueContracts(lineItems) {
  return Array.from(
    new Set(
      lineItems.map((item) =>
        JSON.stringify({
          contractId: item.field_760_raw[0].id,
          startDate: item.field_849,
        })
      )
    ),
    JSON.parse
  );
}

async function createExpenseCards(expenseCard, createTimeCardsApproved) {
  const currentDateTime = newDateWithTime();

  let body = {};
  body.field_440 =
    expenseCard.field_1723_raw.length > 0
      ? expenseCard.field_1723_raw[0].id
      : ""; // buyer
  body.field_376 =
    expenseCard.field_488_raw.length > 0 ? expenseCard.field_488_raw[0].id : ""; // worker
  body.field_1328 =
    expenseCard.field_1329.length > 0 ? expenseCard.field_1329_raw[0].id : ""; // worker profile
  body.field_1844 = expenseCard.contractSupplierID; // supplier
  body.field_851 = payload.record.field_1485_raw[0].id; // created by account
  let costCenters = [];
  expenseCard.constCenterstoConnect.forEach((cc) => {
    //cost centers
    costCenters.push(cc.id);
  });
  body.field_493 = costCenters;
  body.field_387 = expenseCard.field_849; // period start date
  body.field_377 =
    expenseCard.field_760.length > 0 ? expenseCard.field_760_raw[0].id : ""; // contract
  body.field_1488 = payload.record.id;

  // submit timecard for approval

  // REVIEW IF NEEDED
  const timecardsSubmittedThisMonth = await Knack.find({
    objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
    filters: [
      {
        field: "field_377",
        operator: "is",
        value: expenseCard.field_760_raw[0].id,
      },
      {
        field: "field_1787",
        operator: "is during the current",
        type: "month",
        value: "",
      },
    ],
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
    body.field_386 = "Approved"; // time card status
    body.field_846 = currentDateTime; // date approved
    // REVIEW IF NEEDED UPDATE CONTRACT
    try {
      await Knack.update({
        objectKey: internals.KNACK_OBJECTS_IDS.Contract,
        id: body.field_377,
        body: {
          field_1404: currentDateTime,
        },
      });
    } catch (e) {
      console.log("error updating timecard last submitted date contracts");
    }
  }

  try {
    var successTeCard = await Knack.create({
      objectKey: internals.KNACK_OBJECTS_IDS.TimeExpense,
      body: body,
    });

    successTeCard = JSON.parse(successTeCard);
    cardsCreatedLength += 1;
  } catch (catched) {
    cardsErrors += 1;
  }

  if (successTeCard) {
    await Promise.map(
      importedteLineItems,
      async (teLineItem) => {
        if (
          teLineItem.field_760_raw[0].id == compare.contract &&
          Moment(teLineItem.field_849).isSame(compare.periodStartDate)
        ) {
          try {
            await Knack.update({
              objectKey: internals.KNACK_OBJECTS_IDS.lineItems,
              id: teLineItem.id,
              body: {
                field_481: successTeCard.id,
              },
            });
            processesLineItemLength += 1;
          } catch (catched) {
            failedLineItemsLength += 1;
          }
        }
      },
      {
        concurrency: 1,
      }
    );
    if (createTimeCardsApproved) {
      sendEmailFromForm("view_3889", "scene_415", successTeCard.id);
    }
  } else {
    for (let lineitem of importedteLineItems) {
      if (
        lineitem.field_760_raw[0].id == compare.contract &&
        Moment(lineitem.field_849).isSame(compare.periodStartDate)
      ) {
        failedLineItemsLength += 1;
      }
    }
  }
}

module.exports = {
  importExpenseCards,
  importExpenseCardsWorkflow,
};
