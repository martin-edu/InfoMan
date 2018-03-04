var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
require('dotenv').load();

const conversation =  new watson.ConversationV1({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version_date: '2018-02-16'
});

const params = {
  workspace_id: process.env.CONVERSATION_WORKSPACE_ID,
  export: true,
  include_count: true
};

router.route('/intents')
  .get(function(req, res) {
    conversation.listIntents(params, function(err, response) {
      if (err) {
        res.status(404).send({});
      } else {
        res.status(200).send(JSON.stringify(response.intents, null, 2));
      }
    });
  })

  router.route('/entities')
    .get(function(req, res) {
      conversation.listEntities(params, function(err, response) {
        if (err) {
          res.status(404).send({});
        } else {
          res.status(200).send(JSON.stringify(response.entities, null, 2));
        }
      });
    })

router.route('/dialog')
    .get(function(req, res) {
      conversation.listDialogNodes(params, function(err, response) {
        if (err) {
          res.status(404).send({});
        } else {
          res.status(200).send(JSON.stringify(response.dialog_nodes, null, 2));
        }
      });
    })

module.exports = router;
