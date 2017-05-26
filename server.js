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

router.put("/editcustomer/:id",function(request,response){

	var userId = request.params.id;
	var dataFromPostMan = request.body;
	//var newObj = {};
	console.log(userId)
		Customer.getCustomersById(userId,function(err,dataFromDB){
				 if(err){
		              throw err;
				  }
				  
				var bodyObj = {
					name : dataFromPostMan.name || dataFromDB.name,
					email : dataFromPostMan.email || dataFromDB.email,
					mobile : dataFromPostMan.mobile || dataFromDB.mobile
				}
				Customer.editCustomer(userId,bodyObj,function(err,data){
                  if(err){
		              throw err;
				  }
				  response.json(data);
	})
		});


	

})

router.delete("/deletecustomer/:id",function(request,response){
	var userId = request.params.id;

	Customer.deleteCustomer(userId,function(err,data){
         if(err){
		              throw err;
				  }
				  response.json(data);
	})
})


router.get("/customersbyid/:id",function(request,response){
var userId = request.params.id;
Customer.getCustomersById(userId,function(err,customerData){
		 if(err){
              throw err;
		  }
		  response.json(customerData);
})
})
app.use("/api",router);

var PORT = process.env.PORT || 4001;
app.listen(PORT,function(){
	console.log("server listening at port  "+PORT)
})