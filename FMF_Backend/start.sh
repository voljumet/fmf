curl -k --location --request POST 'https://localhost:5001/api/groceryList' \
--header 'Content-Type: application/json' \
--data-raw '{"ProductName": "Juice","Price": 29,"Supplier": "Tine"}'

curl -k --location --request POST 'https://localhost:5001/api/customer' \
--header 'Content-Type: application/json' \
--data-raw '{"FirstName": "Alex","LastName": "Laursen","Address": "Jon Lilletuns Vei 21"}'

curl -k --location --request POST 'https://localhost:5001/api/product' \
--header 'Content-Type: application/json' \
--data-raw '{"ProductName": "Juice","Supplier": "Tine","PriceStore1": 29,"PriceStore2": 35,"PriceFMF": 0}'

curl -k --location --request POST 'https://localhost:5001/api/driver' \
--header 'Content-Type: application/json' \
--data-raw '{"FirstName": "Rune","LastName": "Aamodt","Address": "Urdsvei 8", "Vehicle": "Moped"}'

curl -k --location --request POST 'https://localhost:5001/api/store2' \
--header 'Content-Type: application/json' \
--data-raw '{"ProductName": "Juice","Price": 35,"Supplier": "Tine"}'

curl -k --location --request POST 'https://localhost:5001/api/store1' \
--header 'Content-Type: application/json' \
--data-raw '{"ProductName": "Juice","Price": 29,"Supplier": "Tine"}'
