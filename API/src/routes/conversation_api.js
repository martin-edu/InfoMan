 var tools = require('../model/conversation_functions');
var express = require('express');
var router = express.Router();
require('dotenv').load();

router.route('/intents')
  .get(function(req, res) {
    tools.getIntents().then(function(data) {
      res.status(200).send(data);
    }).catch(function(err) {
      res.status(404).send({});
    })
  })

  router.route('/entities')
  .get(function(req, res) {
    tools.getEntities().then(function(data) {
      res.status(200).send(data);
    }).catch(function(err) {
      res.status(404).send({});
    })
  })

router.route('/dialog')
  .get(function(req, res) {
    tools.getDialog().then(function(data) {
      res.status(200).send(data);
    }).catch(function(err) {
      res.status(404).send({});
    })
  })

router.route('/questions')
  .get(function(req, res) {
    tools.getQuestions().then(function(data) {
      res.status(200).send(data);
    }).catch(function(err) {
      res.status(404).send({});
    })
  })

router.route('/update')
  .put(function(req, res) {
    tools.updateContextVariable('Bienvenido',req.body).then(function(data) {
      res.status(200).send(data);
    }).catch(function(err) {
      res.status(404).send({});
    })
  })

module.exports = router;
