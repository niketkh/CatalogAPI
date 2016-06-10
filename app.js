var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('catalog', ['products']);

app.use(bodyParser.json());

app.get('/', function(request, response){
	response.send('Wow It Works!!!');
});

app.get('/products', function(request, response){
	console.log("Fetching Products...");
	db.products.find(function(error, docs){
		if(error){
			response.send(error);
		}
		else{
			console.log("Sending Products...");
			response.json(docs);
		}
	})
});

app.get('/products/:id', function(request, response){
	console.log("Fetching Product...");
	db.products.findOne({_id: mongojs.ObjectId(request.params.id)}, function(error, doc){
		if(error){
			response.send(error);
		}
		else{
			console.log("Sending Product...");
			response.json(doc);
		}
	})
});

app.post('/products', function(request, response){
	db.products.insert(request.body, function(error, doc){
		if(error){
			response.send(error);
		}
		else{
			console.log('Adding Product...');
			response.json(doc);
		}
	});
});

app.put('/products/:id', function(request, response){
	db.products.findAndModify({query: {_id: mongojs.ObjectId(request.params.id)},
		update: {
			$set: {
				name: request.body.name,
				category: request.body.category,
				description: request.body.description
			}
		},
		new: true
	}, function(error, doc){
		if(error){
			response.send(error);
		}
		else{
			console.log('Updating Product...');
			response.json(doc);
		}
	});
});

app.delete('/products/:id', function(request, response){
	console.log("Fetching Product...");
	db.products.remove({_id: mongojs.ObjectId(request.params.id)}, function(error, doc){
		if(error){
			response.send(error);
		}
		else{
			console.log("Removing Product...");
			response.json(doc);
		}
	})
});

app.listen(3000);

console.log('Server is running on port 3000...');