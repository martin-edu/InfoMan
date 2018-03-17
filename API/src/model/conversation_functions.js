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
const map = {
  "Proyectos Modulares": "pm",
  "Servicio Social": "ss",
  "Calendario Oficial": "co",
  "Malla Curricular": "ma",
  "Prácticas Profesionales": "pp",
  "Materias Optativas": "mo",
  "Materias Especializantes": "me",
  "Titulación": "t"
}

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

  var getDialogNode = function(dialogNode) {
    return new Promise(function(fulfill, reject) {
      params.dialog_node = dialogNode;
      conversation.getDialogNode(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          fulfill(response);
        }
      });
      delete params.dialog_node;
    });
  }

  var getQuestions = function() {
    return new Promise(function(fulfill, reject) {
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

  var getForm = function(availableAreas) {
    return new Promise(function(fulfill, reject) {
      conversation.listDialogNodes(params, function(err, response) {
        if (err) {
          reject(404);
        } else {
          let format = [];
          for(i in availableAreas){
            for(j in response.dialog_nodes){
              if(availableAreas[i] === response.dialog_nodes[j].title){
                let variables = [];
                let temp_json = response.dialog_nodes[j].context[map[response.dialog_nodes[j].title]];
                for(x in temp_json){
                  variables.push({
                    'field': x,
                    'currentValue': temp_json[x]
                  });
                }
                format.push({
                  'area': response.dialog_nodes[j].title,
                  'variables': variables
                });
              }
          }
        }
        fulfill(format);
        }
      });
    });
  }

  var askWatson = function(question){
    return new Promise(function(fulfill,reject){
      conversation.message({
        workspace_id: params.workspace_id,
        alternate_intents: true,
        input: { 'text': question.text },

      }, function(err, response) {
        if (err) {
          reject(err);
        } else {
          fulfill(response.output.text);
        }
      });
    });
  };

  return {
    'getIntents': getIntents,
    'getEntities': getEntities,
    'getDialog': getDialog,
    'getDialogNode': getDialogNode,
    'getQuestions': getQuestions,
    'getForm': getForm,
    'updateContextVariable': updateContextVariable,
    'askWatson': askWatson
  };

})();
module.exports = functions;
