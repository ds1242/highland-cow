-- name: AddProduct :one
INSERT INTO products (id, product_name, description, brand, product_code, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: GetProductByProductCode :one
SELECT *
FROM products
WHERE product_code = $1;

-- name: GetAllProducts :many
SELECT *
FROM products;

-- name: DeleteProductByID :exec
DELETE FROM products
WHERE id = $1;