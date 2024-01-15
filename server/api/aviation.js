const Boom = require('boom')
const Moment = require('moment');

// Declare internals

const internals = {
    KNACK_OBJECTS_IDS: {
        AuditReport: 'object_69',
        AuditSpecificQuestion: 'object_77',
        MatrixMaster: 'object_70',
    },
    CONCURRENCY_OPTS: {
        concurrency: 1
    },
    KNACK_KEYS: {
        appID: process.env.KNACK_AVIATION_APP_ID,
        apiKey: process.env.KNACK_AVIATION_API_KEY
    }
};

exports.plugin = {
    name: 'aviation',
    register: function (server) {

      const {
          Knack,
          KnackAuth,
          CheckProcess
      } = server.plugins;

      const runMatrixGeneration = async (payload) => {
        try{
          var startTime = Moment().format("MM/DD/YYYY hh:mm a");
          var processingNotes = "";
          var errorMessage = "";
          var errors = 0;
          var auditReport = payload.auditReport;
          var matrixMaster = [];
          const matrixFilters = [{ operator: "is", field: "field_1277", value: auditReport.field_1255 }]
          matrixKnack = await Knack.find({
            appID: internals.KNACK_KEYS.appID,
            apiKey: internals.KNACK_KEYS.apiKey,
            objectKey: internals.KNACK_OBJECTS_IDS.MatrixMaster,
            filters:matrixFilters
          });
          matrixMaster = matrixKnack.records.filter(function (item) {
            var matchTypes = false;
            auditReport.field_1322_raw.forEach(function (type) {
              item.field_1334_raw.forEach(function (itemType) {
                if (itemType.id == type.id) {
                  matchTypes = true;
                }
              });
            });
            return matchTypes;
          });
          for(var matrix of matrixMaster){
            try{
              await Knack.create({
                  objectKey: internals.KNACK_OBJECTS_IDS.AuditSpecificQuestion,
                  appID: internals.KNACK_KEYS.appID,
                  apiKey: internals.KNACK_KEYS.apiKey,
                  body: {
                    field_1333: auditReport.id,
                    field_1326: matrix.id
                  }
              });
              // console.log("record created")
            }catch(e){
              console.log(e);
              console.log("error in internal creation");
              errors = errors + 1;
              errorMessage = errorMessage+'Error creating the matrix master '+matrix.field_1337+' <br>';
            }
          }
          if(errors > 0){
            processingNotes = "matrix creation created with the following errors: <br>"+errorMessage
          }else{
            processingNotes = "Processing successfully completed"
          }
          var endTime = Moment().format("MM/DD/YYYY hh:mm a");
          var updatePayload = {
            field_1740: startTime,
            field_1741: endTime,
            field_1742: processingNotes,
            field_1341: endTime
          }
          await Knack.update({
              objectKey: internals.KNACK_OBJECTS_IDS.AuditReport,
              appID: internals.KNACK_KEYS.appID,
              apiKey: internals.KNACK_KEYS.apiKey,
              id: auditReport.id,
              body: updatePayload
          });
          // console.log("record updated")
        }catch(e){
          console.log(e)
          console.log("error executing main method")
        }

      };

      server.route({
        method: 'POST',
        path: '/generateMatrix',
        handler: (request, reply) => {
          const payload = request.payload;
          runMatrixGeneration(payload);
          return {message:'matrix generation in progress'};
        }
      })

    }
}
