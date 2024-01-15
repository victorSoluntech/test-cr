const Boom = require('boom')
const Moment = require('moment');

// Declare internals

const internals = {
    KNACK_OBJECTS_IDS: {
      License: 'object_16',
      LineItems: 'object_62'
    },
    CONCURRENCY_OPTS: {
        concurrency: 1
    },
    KNACK_KEYS: {
        appID: process.env.KNACK_WRS_APP_ID,
        apiKey: process.env.KNACK_WRS_API_KEY
    }
};

exports.plugin = {
    name: 'wrs',
    register: function (server) {

      const {
          Knack,
          KnackAuth,
          CheckProcess
      } = server.plugins;

      var userProcess = [];

      const runLicenseGeneration = async (payload) => {
        var count_failure = 0;
        var count_success = 0;
        for(i=0;i<payload.licenses.length;i++){
          try{
            var license = payload.licenses[i];
            var lineItemObj = {
            field_1735: license.id, //Original License connection
            field_1722: payload.invoice, //Invoice connection
            field_1734: license.field_1830_raw[0].id, //Corresponding Product
            field_1743: license.field_1836, //Rate
            field_1814: license.field_1833, //Description
            field_1808: license.field_1563_raw[0].id, //State/Prov //license.field_1563 && license.field_1563_raw.length>0? license.field_1563_raw[0].id:""
            field_1837: "Yes", //Created via JS?
            field_1828: payload.user,
          }

            var response = await Knack.create({
                objectKey: internals.KNACK_OBJECTS_IDS.LineItems,
                appID: internals.KNACK_KEYS.appID,
                apiKey: internals.KNACK_KEYS.apiKey,
                body: lineItemObj
            });
            count_success = count_success + 1;
          }catch(e){
            console.log(e);
            count_failure = count_failure + 1;
          }
        }
        var index = userProcess.findIndex(function(elem){
          return elem.user == payload.user;
        })
        userProcess[index].count_success = count_success;
        userProcess[index].count_failure = count_failure;
        userProcess[index].ready = true;
      };

      server.route({
        method: 'POST',
        path: '/generateLineItems',
        handler: (request, reply) => {
          const payload = request.payload;
          var index = userProcess.findIndex(function(elem){
            return elem.user == payload.user;
          })
          if(index != -1){
            userProcess[index].count_success = 0;
            userProcess[index].count_failure = 0;
            userProcess[index].ready = false;
          }else{
            userProcess.push({
              user:payload.user,
              count_success:0,
              count_failure:0,
              ready:false
            })
          }
          runLicenseGeneration(payload);
          return {message:'line items generation in progress'};
        }
      });

      server.route({
        method: 'POST',
        path: '/checkLineItemProcess',
        handler: (request, reply) => {
          const payload = request.payload;
          var index = userProcess.findIndex(function(elem){
            return elem.user == payload.user;
          })
          if(index != -1){
            if(userProcess[index].ready){
              return {message:'method completed',ready:true,success:userProcess[index].count_success,failures:userProcess[index].count_failure};
            }else{
              return {message:'method in process',ready:false};
            }
          }else{
            return {message:'error on main method',ready:false};
          }
        }
      });

    }
}
