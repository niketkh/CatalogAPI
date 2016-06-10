# CatalogAPI
A very basic Catalog API built using MongoDB, NodeJs, Express, MongoJs

Database: catalog
Collection: products

# Import products.json to mongodb to work with sample data

# URL Requests
GET     localhost/products            Lists all products
GET     localhost/products/:id        List details of specific product
POST    localhost/products            Add product to catalog 
PUT     localhost/products/:id        Update product 
DELETE  localhost/products/:id        Delete product
