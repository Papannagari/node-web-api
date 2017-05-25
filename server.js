var express = require("express");

var app = express();

var router = express.Router();

var mongoose = require("mongoose");
var Customer = require("./models/customer");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/techminds",function(){
	console.log("successfully connected  to dabase")
})

router.get("/",function(request,response){
	response.send({name : "Papa Srinivas swan"})
})

router.get("/customers",function(request,response){
Customer.getCustomers(function(err,customerData){
		 if(err){
              throw err;
		  }
		  response.json(customerData);
})
})

router.post("/insertcustomer",function(request,response){
	var customerObj = request.body;
	Customer.createCustomers(customerObj,function(err,data){
		 if(err){
		              throw err;
				  }
				  response.json(data);
	})
})

app.use("/api",router);

var PORT = process.env.PORT || 4001;
app.listen(PORT,function(){
	console.log("server listening at port  "+PORT)
})