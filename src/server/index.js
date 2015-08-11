let express = require("express");
let server = express();
let database = require("knex")(require("./db.config.js"));
let bookshelf = require("bookshelf")(database);
let bodyParser = require("body-parser");

let Note = bookshelf.Model.extend({
	tableName: "notes",
	idAttribute: "id"
});
server.use(bodyParser.urlencoded());
server.route("/notes/:id")
	.get((req, res) => {
		new Note({id: req.params.id})
		.fetch({require: true})
		.then(m => res.json(m), e => res.status(404).json({error: "no model found"}))
	})
	.post((req, res) => {
		new Note({id: req.params.id,
			value: req.body.value,
			date: new Date(),
			title: req.body.title,
			owner: req.body.owner
		})
		.save()
		.then(m => res.json(m), e => res.status(500).json(e))

	});
server.route("/note")
	.post((req, res) => {
		new Note()
		.save({value: req.body.value,
			date: new Date(),
			title: req.body.title,
			owner: req.body.owner
		})
		.then(m => res.json(m), e => res.status(500).json(e))
	})

let instance = server
	.listen(8080, _ => console.log('Example app listening at http://%s:%s', instance.address().address, instance.address().port))