"use strict";

var express = require("express");
var server = express();
var database = require("knex")(require("./db.config.js"));
var bookshelf = require("bookshelf")(database);
var bodyParser = require("body-parser");

var Note = bookshelf.Model.extend({
	tableName: "notes",
	idAttribute: "id"
});
server.use(bodyParser.urlencoded());
server.route("/notes/:id").get(function (req, res) {
	new Note({ id: req.params.id }).fetch({ require: true }).then(function (m) {
		return res.json(m);
	}, function (e) {
		return res.status(404).json({ error: "no model found" });
	});
}).post(function (req, res) {
	new Note({ id: req.params.id,
		value: req.body.value,
		date: new Date(),
		title: req.body.title,
		owner: req.body.owner
	}).save().then(function (m) {
		return res.json(m);
	}, function (e) {
		return res.status(500).json(e);
	});
});
server.route("/note").post(function (req, res) {
	new Note().save({ value: req.body.value,
		date: new Date(),
		title: req.body.title,
		owner: req.body.owner
	}).then(function (m) {
		return res.json(m);
	}, function (e) {
		return res.status(500).json(e);
	});
});

var instance = server.listen(8080, function (_) {
	return console.log('Example app listening at http://%s:%s', instance.address().address, instance.address().port);
});
