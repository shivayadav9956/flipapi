Page1
> List of products
http://localhost:9800/products
https://flip-b4in.onrender.com/products

> List of products wrt name
http://localhost:9800/products?name=iPhone%2011
https://flip-b4in.onrender.com/products?name=iPhone%2011

> List of products wrt brand
http://localhost:9800/products?brand=LG
https://flip-b4in.onrender.com/products?brand=LG
> List of product categories
http://localhost:9800/category
https://flip-b4in.onrender.com/category


page2
> List of products wrt category
http://localhost:9800/products?categoryId=4
https://flip-b4in.onrender.com/products?categoryId=4


> List of products wrt category & brand
http://localhost:9800/filter/6?brand=Mi
https://flip-b4in.onrender.com/filter/6?brand=Mi

> List of products wrt category & cost
http://localhost:9800/filter/2?lcost=5000&hcost=10000
https://flip-b4in.onrender.com/filter/2?lcost=5000&hcost=10000

> List of products wrt category & customerRating
http://localhost:9800/filter/4?lrating=3&hrating=4
https://flip-b4in.onrender.com/filter/4?lrating=3&hrating=4

> List of products wrt category & discount
http://localhost:9800/filter/4?discount=70
https://flip-b4in.onrender.com/filter/4?discount=70

> Sort on basis of cost
http://localhost:9800/filter/4?sort=-1
https://flip-b4in.onrender.com/filter/4?sort=-1


page3
> details of product
http://localhost:9800/details/75
https://flip-b4in.onrender.com/details/75

page4
> Order Details(POST)
http://localhost:9800/orderedItems
https://flip-b4in.onrender.com/orderedItems
body -->
{
	"id":[94,13]
}

> Place Order(POST)
http://localhost:9800/placeOrder
body -->
{
	"Order_id": 6,
	"Name": "Ben",
	"Email": "benny@gmail.com",
	"Address": "Hno 3,Sector 4",
	"Phone": 8977673453,
	"Cost": 96662,
	"Order_items": [
		94,
		13,
		111,
		38,
		87
	]
}

Page5
> List of orders
http://localhost:9800/orders
https://flip-b4in.onrender.com/orders

> List of orders wrt email
http://localhost:9800/orders?email=santosh@gmail.com
https://flip-b4in.onrender.com/orders?email=santosh@gmail.com

> Update Payement Details (PUT)
body -->
{
	"status":"TXN_SUCCESS",
	"bank_name":"SBI",
	"date":"18/11/2022"
}

> Delete Order (Delete)
http://localhost:9800/deleteOrder/637b87deac65acf17542fdd1
https://flip-b4in.onrender.com/deleteOrder/637b87deac65acf17542fdd1
