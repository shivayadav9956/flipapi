let express = require('express');
let app = express();

let dotenv = require('dotenv')
dotenv.config()

let port = process.env.PORT || 7800;

let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.LiveMongo;
let db;

let cors = require('cors');
app.use(cors())

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// default ROUTE
app.get('/', (req,res) => {
	res.send("Welcome to Flipkart");
})

// category ROUTE
app.get('/category', (req,res) => {
	db.collection('category').find().toArray((err,result) => {
		if(err) throw err;
		res.send(result);
	})
})

// products ROUTE
app.get('/products', (req,res) => {
	let categoryId = Number(req.query.categoryId);
	let brand = req.query.brand;
	let name = req.query.name;
	let query = {};
	// products wrt categoryId ROUTE 
	if(categoryId){
		query = {
			"Category_id":categoryId
		}
	}
	// products wrt brand ROUTE 
	else if(brand){
		query = {
			"Brand":brand
		}
	}
	// products wrt name ROUTE 
	else if(name){
		query = {
			"Product_name":name
		}
	}
	else {
		query = {}
	}
	db.collection('products').find(query).toArray((err,result) => {
		if(err) throw err;
		res.send(result);
	})
})

// filter ROUTE
app.get('/filter/:categoryId', (req,res) => {
	let categoryId = Number(req.params.categoryId);
	let brand = req.query.brand;
	let lcost = Number(req.query.lcost);
	let hcost = Number(req.query.hcost);
	let rating = Number(req.query.rating);
	let discount = Number(req.query.discount);
	let query = {};

	// sort by cost
	let sort = {"Selling_price":1};
	if(req.query.sort){
		sort = {"Selling_price": Number(req.query.sort)}
	} 

	// filter wrt brand, cost & customer rating & discount
	if(brand && lcost && hcost && rating && discount){
		query = {
			"Category_id":categoryId,
			$and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				{"Customer_rating":{$gte:rating}}
			],
			"Brand":brand,
			"Discount":{$gte:discount}
		}
	}
	// filter wrt brand, cost & discount
	else if(brand && lcost && hcost && discount){
		query = {
			"Category_id":categoryId,
			$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}],
			"Brand":brand,
			"Discount":{$gte:discount}
		}
	}
	// filter wrt brand, cost & customer rating
	else if(brand && lcost && hcost && rating){
		query = {
			"Category_id":categoryId,
			$and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				{"Customer_rating":{$gte:rating}}
			],
			"Brand":brand
		}
	}
	// filter wrt discount, cost & customer rating
	else if(discount && lcost && hcost && rating){
		query = {
			"Category_id":categoryId,
			$and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				{"Customer_rating":{$gte:rating}}
			],
			"Discount":{$gte:discount}
		}
	}
	// filter wrt discount, brand & customer rating
	else if(discount && brand && rating){
		query = {
			"Category_id":categoryId,
			"Customer_rating":{$gte:rating},
			"Brand":brand,
			"Discount":{$gte:discount}
		}
	}
	// filter wrt cost & brand
	else if(lcost && hcost && brand){
		query = {
			"Category_id":categoryId,
			$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}],
			"Brand":brand
		}
	}
	// filter wrt cost & discount
	else if(lcost && hcost && discount){
		query = {
			"Category_id":categoryId,
			$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}],
			"Discount":{$gte:discount}
		}
	}
	// filter wrt cost & customer rating
	else if(lcost && hcost && rating){
		query = {
			"Category_id":categoryId,
			$and:[
				{$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]},
				{"Customer_rating":{$gte:rating}}
			]
		}
	}
	// filter wrt customer rating & brand
	else if (rating && brand){
		query = {
			"Category_id":categoryId,
			"Customer_rating":{$gte:rating},
			"Brand":brand
		}
	}
	// filter wrt customer rating & discount
	else if (rating && discount){
		query = {
			"Category_id":categoryId,
			"Customer_rating":{$gte:rating},
			"Discount":{$gte:discount}
		}
	}
	// filter wrt brand & discount
	else if (brand && discount){
		query = {
			"Category_id":categoryId,
			"Brand":brand,
			"Discount":{$gte:discount}
		}
	}
	// filter wrt cost
	else if(lcost && hcost){
		query = {
			"Category_id":categoryId,
			$and:[{"Selling_price":{$gt:lcost,$lt:hcost}}]
		}
	}
	// filter wrt customer rating
	else if (rating){
		query = {
			"Category_id":categoryId,
			"Customer_rating":{$gte:rating},
		}
	}
	// filter wrt brand
	else if(brand){
		query = {
			"Category_id":categoryId,
			"Brand":brand
		}
	}
	// filter wrt discount
	else if(discount){
		query = {
			"Category_id":categoryId,
			"Discount":{$gte:discount}
		}
	}
	else {
		query = {
			"Category_id":categoryId
		}
	}
	db.collection('products').find(query).sort(sort).toArray((err,result) => {
		if(err) throw err;
		res.send(result);
	})
})

// details of product ROUTE
app.get('/details/:productId', (req,res) => {
	let productId = Number(req.params.productId);
	db.collection('products').find({"Product_id":productId}).toArray((err,result) => {
		if(err) throw err;
		res.send(result);
	})
})

// orders ROUTE
app.get('/orders', (req,res) => {
	let email = req.query.email;
	let query = {};
	// orders wrt email ROUTE
	if(email){
		query = {"Email":email}
	}
	db.collection('orders').find(query).toArray((err,result) => {
		if(err) throw err;
		res.send(result);
	})
})

// OrderedItems ROUTE
app.post('/orderedItems', (req,res) => {
	if(Array.isArray(req.body.id)){
		db.collection('products').find({"Product_id":{$in:req.body.id}}).toArray((err,result) => {
			if(err) throw err;
			res.send(result);
		})
	} else {
		res.send('Invalid input');
	}
})

// placeOrder ROUTE
app.post('/placeOrder', (req,res) => {
	db.collection('orders').insertOne(req.body, (err,result) => {
		if(err) throw err;
		res.send('Order placed');
	})
})

// updateOrder ROUTE
app.put('/updateOrder/:id', (req,res) => {
	let id = Number(req.params.id);
	db.collection('orders').updateOne(
		{"Order_id":id},
		{
			$set:{
				"status":req.body.status,
				"bank_name":req.body.bank_name,
				"date":req.body.date
			}
		}, (err,result) => {
			if(err) throw err;
			res.send('Order Updated');
		}
	)
})

// deleteOrder ROUTE
app.delete('/deleteOrder/:id', (req,res) => {
	let id = mongo.ObjectId(req.params.id);
	db.collection('orders').deleteOne({"_id":id}, (err,result) => {
		if(err) throw err;
		res.send('Order Deleted');
	})
})

// Connect to MongoDB using a url
MongoClient.connect(mongoUrl, (err,client) => {
	if(err) console.log("Error while connecting");
	db = client.db('flipkart');

	app.listen(port, () => {
		console.log(`Server is running on ${port}`)
	})
})