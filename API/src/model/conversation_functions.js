var watson = require('watson-developer-cloud');
require('dotenv').load();
const conversation =  new watson.ConversationV1({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version_date: '2018-02-16'});
const params = {
  workspace_id: process.env.CONVERSATION_WORKSPACE_ID,
  export: true,
  include_count: true};

var functions = (function() {
  var getIntents = function() {
    return new Promise(function(fulfill, reject) {
      conversation.listIntents(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response.intents);
        }
      });
    });
  }

  var getEntities = function() {
    return new Promise(function(fulfill, reject) {
      conversation.listEntities(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response.entities);
        }
      });
    });
  }

  var getDialog = function() {
    return new Promise(function(fulfill, reject) {
      conversation.listDialogNodes(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response.dialog_nodes);
        }
      });
    });
  }

  var getQuestions = function() {
    return new Promise(function(fulfill, reject) {
      console.log(params);
      conversation.listIntents(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          let questions = [];
          for(i in response.intents){
            for(j in response.intents[i].examples){
              questions.push({name:response.intents[i].examples[j].text});
            }
          }
          fulfill(questions);
        }
      });
    });
  }

  var updateContextVariable = function(dialogNode, contextVariable) {
    return new Promise(function(fulfill, reject) {
      params.dialog_node = dialogNode;
      params.new_dialog_node = dialogNode;
      params.new_context = contextVariable;
      conversation.updateDialogNode(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response);
        }
      });
      delete params.dialog_node;
      delete params.new_dialog_node;
      delete params.new_context;
    });
  }

  var getDialogNode = function(dialogNode) {
    return new Promise(function(fulfill, reject) {
      params.dialog_node = dialogNode;
      conversation.getDialogNode(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response.context);
        }
      });
      delete params.dialog_node;
    });
  }

  return {
    'getIntents': getIntents,
    'getEntities': getEntities,
    'getDialog': getDialog,
    'getQuestions': getQuestions,
    'updateContextVariable': updateContextVariable
  };

})();
module.exports = functions;
